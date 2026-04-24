-- DIALED-IN: machine library, style presets, techniques, cartridge technical ranges
-- Run in Supabase SQL editor or via supabase db push

-- ---------------------------------------------------------------------------
-- Reference strokes (linked from style_presets.base_stroke_id)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stroke_presets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  stroke_mm double precision NOT NULL CHECK (stroke_mm > 0)
);

CREATE TABLE IF NOT EXISTS techniques (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS machine_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  tier smallint NOT NULL CHECK (tier IN (1, 2)),
  is_adjustable_stroke boolean NOT NULL DEFAULT false,
  stroke_options double precision[] NOT NULL DEFAULT '{}',
  default_volt_range jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT machine_stroke_options_nonempty CHECK (
    cardinality(stroke_options) > 0
  ),
  CONSTRAINT machine_default_volt_shape CHECK (
    default_volt_range ? 'baseline'
    AND default_volt_range ? 'min'
    AND default_volt_range ? 'max'
  )
);

CREATE TABLE IF NOT EXISTS style_presets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  style_name text NOT NULL,
  base_stroke_id uuid NOT NULL REFERENCES stroke_presets (id) ON DELETE RESTRICT,
  ideal_needle_range text NOT NULL,
  technique_modifiers jsonb NOT NULL DEFAULT '{}'::jsonb,
  recommended_technique_id uuid REFERENCES techniques (id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_style_presets_style_name ON style_presets (style_name);
CREATE INDEX IF NOT EXISTS idx_machine_library_brand_model ON machine_library (brand, model);

COMMENT ON COLUMN machine_library.stroke_options IS
  'Available stroke lengths in mm; long-stroke logic uses max(stroke_options).';
COMMENT ON COLUMN machine_library.default_volt_range IS
  'JSON: { "min": number, "max": number, "baseline": number }';
COMMENT ON COLUMN style_presets.ideal_needle_range IS
  'Technical cartridge range only, e.g. "#10 07-11 Curved Magnum" — no brand SKUs.';
COMMENT ON COLUMN style_presets.technique_modifiers IS
  'Per-technique hints or deltas; consumed by app layer or SQL helpers.';

-- ---------------------------------------------------------------------------
-- Helpers: effective stroke (mm) and long-stroke flag
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.machine_effective_stroke_mm(p_machine_id uuid)
RETURNS double precision
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    (SELECT max(s) FROM unnest(m.stroke_options) AS s),
    0::double precision
  )
  FROM public.machine_library m
  WHERE m.id = p_machine_id;
$$;

CREATE OR REPLACE FUNCTION public.is_long_stroke_machine(p_machine_id uuid, p_threshold_mm double precision DEFAULT 4.0)
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT public.machine_effective_stroke_mm(p_machine_id) >= p_threshold_mm;
$$;

-- ---------------------------------------------------------------------------
-- Voltage engine: long stroke (4.0mm+) + Soft Shading => -1.5V vs baseline
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.dialedin_compute_voltage(
  p_machine_id uuid,
  p_technique_name text,
  p_long_stroke_threshold_mm double precision DEFAULT 4.0,
  p_soft_shading_reduction_v double precision DEFAULT 1.5
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_range jsonb;
  v_baseline double precision;
  v_min double precision;
  v_max double precision;
  v_stroke double precision;
  v_apply_reduction boolean;
  v_adjusted double precision;
BEGIN
  SELECT m.default_volt_range, public.machine_effective_stroke_mm(p_machine_id)
  INTO v_range, v_stroke
  FROM public.machine_library m
  WHERE m.id = p_machine_id;

  IF v_range IS NULL THEN
    RETURN jsonb_build_object(
      'error', 'machine_not_found',
      'machine_id', p_machine_id
    );
  END IF;

  v_baseline := (v_range->>'baseline')::double precision;
  v_min := (v_range->>'min')::double precision;
  v_max := (v_range->>'max')::double precision;

  v_apply_reduction :=
    v_stroke >= p_long_stroke_threshold_mm
    AND lower(trim(p_technique_name)) = lower(trim('Soft Shading'));

  v_adjusted :=
    CASE
      WHEN v_apply_reduction THEN v_baseline - p_soft_shading_reduction_v
      ELSE v_baseline
    END;

  -- Clamp to machine envelope
  v_adjusted := LEAST(GREATEST(v_adjusted, v_min), v_max);

  RETURN jsonb_build_object(
    'baseline_volts', v_baseline,
    'adjusted_volts', v_adjusted,
    'volt_delta', v_adjusted - v_baseline,
    'effective_stroke_mm', v_stroke,
    'long_stroke_soft_shading_guard', v_apply_reduction,
    'envelope', jsonb_build_object('min', v_min, 'max', v_max),
    'technique', p_technique_name
  );
END;
$$;

COMMENT ON FUNCTION public.dialedin_compute_voltage IS
  'Stroke-to-voltage guard: 4.0mm+ stroke + Soft Shading applies -1.5V vs baseline (clamped to default_volt_range).';

-- ---------------------------------------------------------------------------
-- Cartridge output: enforce technical range string (no brand SKUs)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.dialedin_needle_range_display(
  p_gauge_label text,
  p_grouping_low int,
  p_grouping_high int,
  p_configuration text
)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT format(
    '%s %s-%s %s',
    NULLIF(trim(p_gauge_label), ''),
    p_grouping_low::text,
    p_grouping_high::text,
    initcap(trim(p_configuration))
  );
$$;

-- Optional seed (idempotent-ish): uncomment or run separately if desired
-- INSERT INTO techniques (name) VALUES ('Soft Shading'), ('Whip Shading'), ('Fine Line Passes')
-- ON CONFLICT (name) DO NOTHING;

-- Style-level ideal stroke + voltage band for adaptive range (Setup Engine).
-- idempotent: table + optional seed for local dev; production may differ.

CREATE TABLE IF NOT EXISTS public.tattoo_taxonomy (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  style_name text NOT NULL UNIQUE,
  ideal_stroke double precision NOT NULL,
  volt_min double precision NOT NULL,
  volt_max double precision NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tattoo_taxonomy_style_name ON public.tattoo_taxonomy (style_name);

COMMENT ON TABLE public.tattoo_taxonomy IS
  'Per-style ideal stroke and recommended V band; app applies stroke-vs-3.5mm adaptive modifier.';

ALTER TABLE public.tattoo_taxonomy ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read tattoo_taxonomy" ON public.tattoo_taxonomy;
CREATE POLICY "public read tattoo_taxonomy" ON public.tattoo_taxonomy FOR SELECT
  USING (true);

INSERT INTO public.tattoo_taxonomy (style_name, ideal_stroke, volt_min, volt_max)
VALUES
  ('Fine Line', 3.2, 4.5, 7.8),
  ('Black & Grey Realism', 4.2, 5.5, 9.5),
  ('Soft Portrait', 3.5, 5.0, 8.5),
  ('American Traditional', 3.5, 5.2, 9.0)
ON CONFLICT (style_name) DO UPDATE SET
  ideal_stroke = EXCLUDED.ideal_stroke,
  volt_min = EXCLUDED.volt_min,
  volt_max = EXCLUDED.volt_max;

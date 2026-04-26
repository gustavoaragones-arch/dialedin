-- Tier 2 entry-level additions for broader machine onboarding coverage.

INSERT INTO public.machine_library (
  brand,
  model,
  tier,
  is_adjustable_stroke,
  stroke_options,
  default_volt_range
)
SELECT
  'Dragonhawk',
  'Mast Archer',
  2,
  false,
  ARRAY[3.5]::double precision[],
  '{"min": 5.0, "max": 12.0, "baseline": 8.0}'::jsonb
WHERE NOT EXISTS (
  SELECT 1
  FROM public.machine_library m
  WHERE lower(trim(m.brand)) = 'dragonhawk'
    AND lower(trim(m.model)) = 'mast archer'
);

INSERT INTO public.machine_library (
  brand,
  model,
  tier,
  is_adjustable_stroke,
  stroke_options,
  default_volt_range
)
SELECT
  'EZ Tattoo',
  'P3 Pro',
  2,
  true,
  ARRAY[2.0, 3.5, 4.2]::double precision[],
  '{"min": 5.0, "max": 12.0, "baseline": 8.5}'::jsonb
WHERE NOT EXISTS (
  SELECT 1
  FROM public.machine_library m
  WHERE lower(trim(m.brand)) = 'ez tattoo'
    AND lower(trim(m.model)) = 'p3 pro'
);

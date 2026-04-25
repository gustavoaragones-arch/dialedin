-- ACUS M1 / M2: 5.0mm stroke (frequency-first machines in app UI)
INSERT INTO public.machine_library (
  brand,
  model,
  tier,
  is_adjustable_stroke,
  stroke_options,
  default_volt_range
)
SELECT
  'ACUS',
  'M1',
  2,
  false,
  ARRAY[5.0]::double precision[],
  '{"min": 4.5, "max": 11.5, "baseline": 7.0}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.machine_library m
  WHERE lower(trim(m.brand)) = 'acus' AND trim(m.model) = 'M1'
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
  'ACUS',
  'M2',
  2,
  false,
  ARRAY[5.0]::double precision[],
  '{"min": 4.5, "max": 11.5, "baseline": 7.2}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.machine_library m
  WHERE lower(trim(m.brand)) = 'acus' AND trim(m.model) = 'M2'
);

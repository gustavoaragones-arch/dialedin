-- Canonical lining/shading copy + technical note + optional cartridge hint for UI.

ALTER TABLE public.tattoo_taxonomy
  ADD COLUMN IF NOT EXISTS lining_technique text,
  ADD COLUMN IF NOT EXISTS shading_technique text,
  ADD COLUMN IF NOT EXISTS technical_focus text,
  ADD COLUMN IF NOT EXISTS ideal_needle_range text;

UPDATE public.tattoo_taxonomy
SET
  lining_technique = 'Single-pass linework; tight round liner',
  shading_technique = 'Stipple or light soft pack',
  technical_focus = 'Line integrity and SLT-appropriate tapers; keep voltage within adapted band on long strokes.',
  ideal_needle_range = COALESCE(ideal_needle_range, '#10 05-07 Round Liner; open liner optional for bold hollows')
WHERE style_name = 'Fine Line';

UPDATE public.tattoo_taxonomy
SET
  lining_technique = 'Hover / Minimal Lining',
  shading_technique = 'Pendulum / Grey Wash / Stipple',
  technical_focus = 'Layered values and soft magnum passes; SLT tapers and even saturation fields.',
  ideal_needle_range = COALESCE(ideal_needle_range, '#10 09-15 Curved Magnum')
WHERE style_name = 'Black & Grey Realism';

UPDATE public.tattoo_taxonomy
SET
  lining_technique = 'Light structure; soft hair and contour lines',
  shading_technique = 'Curved-mag portraiture; smooth mid-tone transitions',
  technical_focus = 'Long taper to SLT range; float needle with controlled hanging.',
  ideal_needle_range = COALESCE(ideal_needle_range, '#10 07-11 Curved Magnum')
WHERE style_name = 'Soft Portrait';

UPDATE public.tattoo_taxonomy
SET
  ideal_stroke = 4.0,
  lining_technique = 'Bold outline passes; single-whip and tight circles',
  shading_technique = 'Packing, whip-stroke saturates, limited smooth blends',
  technical_focus = 'Punchy, readable saturation: favor adapted band floor while respecting machine envelope; bold linework first.',
  ideal_needle_range = COALESCE(ideal_needle_range, '#10 05-09 Round Liner; magnums for limited fill')
WHERE style_name = 'American Traditional';

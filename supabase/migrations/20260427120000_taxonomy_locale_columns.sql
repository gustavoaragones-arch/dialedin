-- Optional localized display columns for tattoo_taxonomy (fallback: English base columns).
-- App reads style_name_es / style_name_pt, technical_focus_es / technical_focus_pt, etc.

ALTER TABLE IF EXISTS public.tattoo_taxonomy
  ADD COLUMN IF NOT EXISTS style_name_es text,
  ADD COLUMN IF NOT EXISTS style_name_pt text,
  ADD COLUMN IF NOT EXISTS technical_focus_es text,
  ADD COLUMN IF NOT EXISTS technical_focus_pt text,
  ADD COLUMN IF NOT EXISTS lining_technique_es text,
  ADD COLUMN IF NOT EXISTS lining_technique_pt text,
  ADD COLUMN IF NOT EXISTS shading_technique_es text,
  ADD COLUMN IF NOT EXISTS shading_technique_pt text,
  ADD COLUMN IF NOT EXISTS ideal_needle_range_es text,
  ADD COLUMN IF NOT EXISTS ideal_needle_range_pt text;

COMMENT ON COLUMN public.tattoo_taxonomy.style_name_es IS
  'Localized style label for ES UI; when null, app uses style_name.';
COMMENT ON COLUMN public.tattoo_taxonomy.technical_focus_pt IS
  'Localized technical note for PT UI; when null, app uses technical_focus.';

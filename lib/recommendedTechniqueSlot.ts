/**
 * Suggests which taxonomy technique slot to highlight with machine+style
 * (lining vs shading) — UI hint only, not a safety rule.
 */
export function recommendedTechniqueSlot(
  styleName: string | null,
): "lining" | "shading" {
  if (!styleName) return "lining";
  const n = styleName.toLowerCase();
  if (
    /(portrait|realism|grey|gray|b&g|bng|pendulum|wash|stipple|magnum)/.test(
      n,
    )
  ) {
    return "shading";
  }
  if (/(traditional|neo|japanese|irezumi|tribal|line)/.test(n)) {
    return "lining";
  }
  return "lining";
}

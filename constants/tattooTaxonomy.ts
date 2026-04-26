/**
 * Relational tattoo-style taxonomy: primary lining vs shading emphasis and
 * technical focus. Keys are **Tattoo Style** display names (as in the source
 * taxonomy table). Replace the string literals with the PDF’s exact cell text
 * if this file was scaffolded before the table was available in-repo.
 */
export type TattooTaxonomyEntry = {
  primaryLining: string;
  primaryShading: string;
  technicalFocus: string;
};

export const TAXONOMY_MAP: Record<string, TattooTaxonomyEntry> = {
  "Fine Line": {
    primaryLining: "Tight, single-pass linework; small round liner configurations",
    primaryShading: "Stipple or none; shading secondary to line integrity",
    technicalFocus: "Consistent depth, long-taper geometry, low-trauma passes",
  },
  "Black & Grey Realism": {
    primaryLining: "Selective structure and contour; variable line weight",
    primaryShading: "Layered black & grey saturation; soft magnum packing",
    technicalFocus: "Smooth value transitions, SLT / wide mag geometry, even fields",
  },
  "Soft Portrait": {
    primaryLining: "Soft structure and fine hair; minimal harsh outlines",
    primaryShading: "Portrait soft shading; smooth mid-tone transitions",
    technicalFocus: "Curved mag mid-count range, LT–SLT tapers, even saturation",
  },
};

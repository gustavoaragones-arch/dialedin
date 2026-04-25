/** ACUS machines use frequency-first UI (Hz as primary readout, voltage as supply reference). */
export function isAcusFrequencyFirstBrand(brand: string | null | undefined): boolean {
  if (!brand) return false;
  return brand.trim().toLowerCase() === "acus";
}

/** Stable slug order for blog hub cards; copy lives in messages under `blogIndex.posts.<key>`. */
export const BLOG_INDEX_POSTS = [
  { slug: "hertz-vs-volts", key: "hertzVsVolts", categoryKey: "motorPhysics" },
  { slug: "needle-geometry", key: "needleGeometry", categoryKey: "needleGeometry" },
  { slug: "needle-taper", key: "needleTaper", categoryKey: "needleGeometry" },
  { slug: "stroke-physics", key: "strokePhysics", categoryKey: "motorPhysics" },
  { slug: "hardware-tiers", key: "hardwareTiers", categoryKey: "hardwareSystems" },
  { slug: "needle-hang-depth", key: "needleHangDepth", categoryKey: "applicationMechanics" },
  { slug: "cartridge-drag", key: "cartridgeDrag", categoryKey: "applicationMechanics" },
  { slug: "hand-speed-sync", key: "handSpeedSync", categoryKey: "motorPhysics" },
  {
    slug: "physics-of-rule-breaking",
    key: "physicsRuleBreaking",
    categoryKey: "motorPhysics",
  },
  { slug: "the-membrane-tax", key: "membraneTax", categoryKey: "needleGeometry" },
] as const;

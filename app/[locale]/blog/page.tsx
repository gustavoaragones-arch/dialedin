import { Link } from "@/i18n/navigation";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

const POSTS = [
  {
    slug: "hertz-vs-volts",
    title: "Hertz vs. Volts: The Frequency Truth",
    summary:
      "Understand the display dilemma between volts and Hz, and how derived CPS gives a true picture of needle reciprocation across ACUS, Cheyenne, and standard rotary setups.",
    category: "Motor Physics",
  },
  {
    slug: "needle-geometry",
    title: "Needle Geometry: #10 vs #12 & Taper",
    summary:
      "Gauge (#08–#12) and taper (long vs short) control footprint, resistance, and ink flow—why one 3RL is not like another, and how to choose a disciplined default.",
    category: "Needle Geometry",
  },
  {
    slug: "stroke-physics",
    title: "Stroke Physics: The 3.5mm Pivot Guide",
    summary:
      "Force versus frequency: why 3.5mm is a versatile baseline, how 4.0–4.2mm behaves as a hammer, when 2.5–3.0mm fits soft work, and how DialedIn offsets voltage for long throw.",
    category: "Motor Physics",
  },
  {
    slug: "hardware-tiers",
    title: "Tattoo Hardware: Tier 1 vs Tier 2 Gear",
    summary:
      "A disciplined tiering guide for predictability, from training-grade workhorses to benchmark pro rigs and cartridge reliability.",
    category: "Hardware Systems",
  },
  {
    slug: "needle-hang-depth",
    title: "Mastering Needle Hang & Depth Control",
    summary:
      "Learn when to ride the tube versus hang the needle, and how protrusion affects visibility, depth control, and ink flow.",
    category: "Application Mechanics",
  },
  {
    slug: "cartridge-drag",
    title: "Mastering Cartridge Drag & Skin Tension",
    summary:
      "How cartridge membrane tension and skin stretch quality change torque delivery, saturation consistency, and skin trauma risk.",
    category: "Application Mechanics",
  },
  {
    slug: "hand-speed-sync",
    title: "Syncing Hand Speed to Machine Hertz",
    summary:
      "Master CPS-to-hand velocity sync for cleaner stitch density in lining and controlled texture in whip shading.",
    category: "Motor Physics",
  },
  {
    slug: "the-membrane-tax",
    title: "The Membrane Tax: Why Your Machine Stalls on Budget Cartridges",
    summary:
      "Learn why stiffer cartridge membranes can absorb effective drive and how to compensate voltage without overdriving skin, especially on tier-2 machines.",
    category: "Needle Geometry",
  },
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "blogHub", "/blog");
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <main className="blog-page">
      <header className="blog-page__header">
        <nav className="science-page__eyebrow" aria-label="Site sections">
          <Link className="dialed__link" href="/">
            {tNav("setupTool")}
          </Link>
          <span className="blog-page__crumb-sep" aria-hidden>
            {" · "}
          </span>
          <Link className="dialed__link" href="/how-it-works">
            {tNav("howItWorks")}
          </Link>
          <span className="blog-page__crumb-sep" aria-hidden>
            {" · "}
          </span>
          <span aria-current="page">{tNav("blog")}</span>
        </nav>
        <h1 className="blog-page__title">Technical Blog</h1>
        <p className="blog-page__subhead">
          Technical insights and machine physics from the DialedIn Team.
        </p>
      </header>

      <section className="blog-list" aria-label="Blog posts">
        {POSTS.map((post) => (
          <article key={post.slug} className="blog-card">
            <span className="blog-card__tag">{post.category}</span>
            <h2 className="blog-card__title">
              <Link className="blog-card__link" href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="blog-card__summary">{post.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

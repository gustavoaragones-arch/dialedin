import { Link } from "@/i18n/navigation";
import { buildHowItWorksJsonLd } from "@/lib/howItWorksStructuredData";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const HOW_IT_WORKS_KEYWORDS = [
  "tattoo machine setup logic",
  "rotary machine stroke physics",
  "voltage to CPS conversion",
  "tattoo needle grouping guide",
  "fine line tattoo voltage",
  "skin trauma prevention",
  "tattoo machine sweet spot",
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

function BulletListItem({ text }: { text: string }) {
  const i = text.indexOf(":");
  if (i === -1) {
    return <li>{text}</li>;
  }
  return (
    <li>
      <strong>{text.slice(0, i + 1)}</strong>
      {text.slice(i + 1)}
    </li>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "howItWorks", "/how-it-works", {
    keywords: [...HOW_IT_WORKS_KEYWORDS],
    ogType: "article",
  });
}

export default async function HowItWorksPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("howItWorks.title");
  const description = tMeta("howItWorks.description");
  const pageUrl = `${SITE_URL}/${locale}/how-it-works`;
  const howItWorksJsonLd = buildHowItWorksJsonLd(pageUrl, headline, description);
  const tNav = await getTranslations({ locale, namespace: "blogNav" });
  const t = await getTranslations({ locale, namespace: "howItWorksPage" });
  const htmlLang =
    locale === "pt" ? "pt-BR" : locale === "es" ? "es" : "en";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howItWorksJsonLd),
        }}
      />
      <article className="blueprint-page blueprint-page--craft" lang={htmlLang}>
        <header className="blueprint-page__header">
          <p className="blueprint-page__crumb">
            <Link href="/">{tNav("backSetup")}</Link>
            <span className="blueprint-page__crumb-sep" aria-hidden>
              /
            </span>
            <span className="blueprint-page__crumb-muted">{t("crumbMethod")}</span>
          </p>
          <h1 className="blueprint-page__title">{headline}</h1>
          <p className="blueprint-page__lede blueprint-page__lede--hero">
            {t("heroLede")}
          </p>
        </header>

        <section className="blueprint-page__flow" aria-labelledby="flow-heading">
          <h2 id="flow-heading" className="blueprint-page__flow-heading">
            {t("flowHeading")}
          </h2>
          <ol className="blueprint-page__flow-steps">
            <li className="blueprint-page__flow-step">
              <span className="blueprint-page__flow-num" aria-hidden>
                1
              </span>
              <div className="blueprint-page__flow-body">
                <h3 className="blueprint-page__flow-title">{t("flow.step1.title")}</h3>
                <p>{t("flow.step1.body")}</p>
              </div>
            </li>
            <li className="blueprint-page__flow-step">
              <span className="blueprint-page__flow-num" aria-hidden>
                2
              </span>
              <div className="blueprint-page__flow-body">
                <h3 className="blueprint-page__flow-title">{t("flow.step2.title")}</h3>
                <p>{t("flow.step2.body")}</p>
              </div>
            </li>
            <li className="blueprint-page__flow-step">
              <span className="blueprint-page__flow-num" aria-hidden>
                3
              </span>
              <div className="blueprint-page__flow-body">
                <h3 className="blueprint-page__flow-title">{t("flow.step3.title")}</h3>
                <p>{t("flow.step3.body")}</p>
              </div>
            </li>
          </ol>
        </section>

        <aside className="blueprint-page__spec-strip" aria-label={t("specAria")}>
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">{t("spec.styleFirst.label")}</span>
            <p>{t("spec.styleFirst.body")}</p>
          </div>
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">{t("spec.adaptiveStroke.label")}</span>
            <p>
              {t("spec.adaptiveStroke.beforePivot")}
              <strong>{t("spec.adaptiveStroke.pivotBold")}</strong>
              {t("spec.adaptiveStroke.afterPivot")}
            </p>
          </div>
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">{t("spec.hardwareTier.label")}</span>
            <p>{t("spec.hardwareTier.body")}</p>
          </div>
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">{t("spec.safety.label")}</span>
            <p>
              {t("spec.safety.beforeLink")}
              <Link className="blueprint-page__inline-link" href="/science">
                {t("spec.safety.linkScience")}
              </Link>
              {t("spec.safety.afterLink")}
            </p>
          </div>
        </aside>

        <section className="blueprint-page__pillars" aria-labelledby="pillars-heading">
          <h2 id="pillars-heading" className="blueprint-page__visually-hidden">
            {t("pillarsHidden")}
          </h2>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">{t("pillars.p1.id")}</span>
            <h3 className="blueprint-page__pillar-title">{t("pillars.p1.title")}</h3>
            <p>{t("pillars.p1.body")}</p>
          </div>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">{t("pillars.p2.id")}</span>
            <h3 className="blueprint-page__pillar-title">{t("pillars.p2.title")}</h3>
            <p>{t("pillars.p2.body")}</p>
          </div>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">{t("pillars.p3.id")}</span>
            <h3 className="blueprint-page__pillar-title">{t("pillars.p3.title")}</h3>
            <p>{t("pillars.p3.body")}</p>
          </div>
        </section>

        <section className="blueprint-page__section" aria-labelledby="baseline-heading">
          <h2 id="baseline-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">01</span> {t("sec01.title")}
          </h2>
          <p>{t("sec01.body")}</p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="stroke-mod-heading">
          <h2 id="stroke-mod-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">02</span> {t("sec02.title")}
          </h2>
          <p>{t("sec02.body")}</p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="live-heading">
          <h2 id="live-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">03</span> {t("sec03.title")}
          </h2>
          <p>{t("sec03.body")}</p>
          <p className="blueprint-page__note">
            {t("sec03.noteBefore")}
            <strong>{t("sec03.noteStrong")}</strong>
            {t("sec03.noteMid")}
            <Link className="blueprint-page__inline-link" href="/blog/hertz-vs-volts">
              {t("sec03.noteBlogLink")}
            </Link>
            {t("sec03.noteAfter")}
          </p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="membrane-heading">
          <h2 id="membrane-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">04</span> {t("sec04.title")}
          </h2>
          <p>
            {t("sec04.beforeLink")}
            <Link className="blueprint-page__inline-link" href="/blog/the-membrane-tax">
              {t("sec04.linkMembrane")}
            </Link>
            {t("sec04.afterLink")}
          </p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="why-heading">
          <h2 id="why-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">05</span> {t("sec05.title")}
          </h2>
          <ul className="blueprint-page__list">
            <BulletListItem text={t("sec05.li1")} />
            <BulletListItem text={t("sec05.li2")} />
            <BulletListItem text={t("sec05.li3")} />
          </ul>
        </section>

        <section className="blueprint-page__section" aria-labelledby="methodology-heading">
          <h2 id="methodology-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">06</span> {t("sec06.title")}
          </h2>
          <p>{t("sec06.p1")}</p>
          <p>
            {t("sec06.beforeStrokeLink")}
            <strong>{t("sec06.pivotBold")}</strong>
            {t("sec06.betweenLinks")}
            <Link className="blueprint-page__inline-link" href="/blog/stroke-physics">
              {t("sec06.linkStroke")}
            </Link>
            {t("sec06.midLinks")}
            <Link className="blueprint-page__inline-link" href="/science">
              {t("sec06.linkScience")}
            </Link>
            {t("sec06.afterLinks")}
          </p>
        </section>

        <footer className="blueprint-page__footer">
          <p className="blueprint-page__footer-meta">{t("footerMeta")}</p>
        </footer>

        <Link href="/" className="blueprint-page__fab">
          {t("fab")}
        </Link>
      </article>
    </>
  );
}

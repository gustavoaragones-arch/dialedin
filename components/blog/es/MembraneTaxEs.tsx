import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooterEs } from "@/components/blog/es/FooterEs";

type Props = { headline: string; backBlog: string };

export function MembraneTaxEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          Configuraciones “perfectas” fallan cuando la membrana absorbe par antes del viaje útil
          de la aguja—especialmente en rigs Tier&nbsp;2 donde el margen de torque es más estrecho.
        </p>
      </header>

      <section className="science-section">
        <h2>Impuesto de membrana</h2>
        <p>
          Una membrana más rígida exige más trabajo para iniciar el movimiento: tu fuente puede
          mostrar un voltage “sano” y aun así percibirse como ahogada. Antes de compensar a ciegas,
          revisá el contexto de resistencia en{" "}
          <Link className="dialed__link" href="/blog/cartridge-drag">
            arrastre de cartucho y tensión de piel
          </Link>{" "}
          y la honestidad de equipos en{" "}
          <Link className="dialed__link" href="/blog/hardware-tiers">
            Tier&nbsp;1 vs Tier&nbsp;2
          </Link>
          .
        </p>
      </section>

      <section className="science-section">
        <h2>Voltage como herramienta, no como insulto a la piel</h2>
        <p>
          Una compensación pequeña y medida suele ser más disciplinada que “subir hasta que
          arranque”: el techo sigue siendo la biología del cliente y la coherencia con stroke (
          <Link className="dialed__link" href="/blog/stroke-physics">
            recorrido 3,5&nbsp;mm pivote
          </Link>
          ).
        </p>
      </section>

      <BlogTechnicalContext
        title={BLOG_CTA_ES.title}
        description={BLOG_CTA_ES.description}
        primaryLabel={BLOG_CTA_ES.primary}
        secondaryLabel={BLOG_CTA_ES.secondary}
      />

      <BlogArticleFooterEs />
    </article>
  );
}

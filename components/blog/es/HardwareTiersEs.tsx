import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";

type Props = { headline: string; backBlog: string };

export function HardwareTiersEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          La pregunta no es orgullo de marca: es predictibilidad. Tier&nbsp;1 describe rigs de
          referencia con tolerancias y torque más estables; Tier&nbsp;2 describe equipos
          honestos de trabajo que exigen lectura más fina de membrana y mantenimiento.
        </p>
      </header>

      <section className="science-section">
        <h2>Honestidad técnica</h2>
        <p>
          Podés aprender con Mast o Dragonhawk (Tier&nbsp;2), pero conviene saber que el motor
          puede ser menos lineal que una Bishop o Cheyenne (Tier&nbsp;1) ante la misma lectura
          de voltage: eso interactúa con{" "}
          <Link className="dialed__link" href="/blog/the-membrane-tax">
            membrana y pérdida de torque
          </Link>{" "}
          y con la geometría que elegís en{" "}
          <Link className="dialed__link" href="/blog/needle-geometry">
            calibre y taper
          </Link>
          .
        </p>
      </section>

      <section className="science-section">
        <h2>Consistencia profesional</h2>
        <p>
          Subir de tier no “te hace mejor artista”: reduce variables ocultas entre sesión y
          sesión cuando tu técnica ya es disciplinada.
        </p>
      </section>

      <BlogTechnicalContext
        title={BLOG_CTA_ES.title}
        description={BLOG_CTA_ES.description}
        primaryLabel={BLOG_CTA_ES.primary}
        secondaryLabel={BLOG_CTA_ES.secondary}
      />

      <BlogArticleFooter />
    </article>
  );
}

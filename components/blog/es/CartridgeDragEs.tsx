import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";

type Props = { headline: string; backBlog: string };

export function CartridgeDragEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          Configuraciones limpias no garantizan trabajo limpio: si la membrana del cartucho
          impone resistencia o si el estirado falla, parte del voltage se consume antes de que
          la aguja trabaje con disciplina.
        </p>
      </header>

      <section className="blog-tech-summary" aria-labelledby="resumen-cartridge-es">
        <h2 id="resumen-cartridge-es" className="blog-tech-summary__title">
          Resumen técnico
        </h2>
        <ul className="blog-tech-summary__list">
          <li>La tensión de membrana puede robar par y bajar el golpe efectivo.</li>
          <li>La tensión de piel decide si la fuerza se convierte en penetración o vibración.</li>
          <li>Primero estirado estable (tres puntos); después compensaciones medidas de voltage.</li>
        </ul>
      </section>

      <section className="science-section">
        <h2>Impuesto de membrana (bio-mecánica)</h2>
        <p>
          Cuando la membrana es rígida, el motor debe vencer más resistencia antes del
          movimiento útil: fenómeno relacionado con el{" "}
          <Link className="dialed__link" href="/blog/the-membrane-tax">
            impuesto de membrana en cartuchos económicos
          </Link>
          . La corrección no es siempre “subir medio mundo de volts”: es matching honesto de
          torque, stroke (
          <Link className="dialed__link" href="/blog/stroke-physics">
            física del stroke
          </Link>
          ) y técnica de estirado.
        </p>
      </section>

      <section className="science-section">
        <h2>Profundidad visible y control</h2>
        <p>
          El hang de aguja interactúa con drag y estirado: ver{" "}
          <Link className="dialed__link" href="/blog/needle-hang-depth">
            profundidad y protrusión (needle hang)
          </Link>
          .
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

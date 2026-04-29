import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";

type Props = { headline: string; backBlog: string };

export function NeedleHangEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          La variable final no está solo en la fuente: la protrusión (needle hang) define qué ves,
          qué controlás en profundidad y cómo circula la tinta—especialmente en fine line y
          realismo donde la precisión es contractual.
        </p>
      </header>

      <section className="science-section">
        <h2>Riding the tube versus hanging the needle</h2>
        <p>
          Apoyar el tip del cartucho (“riding the tube”) da referencia mecánica; trabajar con más
          aguja afuera (“hanging the needle”) devuelve visibilidad y micro-control—pagando con
          menos tolerancia al error. La elección interactúa con{" "}
          <Link className="dialed__link" href="/blog/cartridge-drag">
            resistencia del cartucho y estirado de piel
          </Link>{" "}
          y con el{" "}
          <Link className="dialed__link" href="/blog/stroke-physics">
            stroke (recorrido)
          </Link>{" "}
          que define cuánta fuerza lleva cada ciclo.
        </p>
      </section>

      <section className="science-section">
        <h2>Dermis y saturación</h2>
        <p>
          Sin lectura honesta de hang, el voltage correcto en papel puede seguir produciendo
          trabajo inconsistente: geometría correcta + stroke incorrecto + hang inconsistente =
          resultado frágil.
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

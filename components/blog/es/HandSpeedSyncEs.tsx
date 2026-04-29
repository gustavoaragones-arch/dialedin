import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooterEs } from "@/components/blog/es/FooterEs";

type Props = { headline: string; backBlog: string };

export function HandSpeedSyncEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          La frecuencia de la máquina (Hertz / CPS) es una constante; la velocidad de tu mano es
          la variable que decide densidad de puntos en la línea y textura en la sombra.
        </p>
      </header>

      <section className="science-section">
        <h2>La matemática de una línea sólida</h2>
        <p>
          Si tu mano se mueve muy rápido para el voltage y el CPS elegidos, los impactos se
          separan: aparece una línea fragmentada o “punteada”. DialedIn modela la lectura en el
          mismo idioma que tu máquina: ver primero{" "}
          <Link className="dialed__link" href="/blog/hertz-vs-volts">
            Hertz versus voltios
          </Link>{" "}
          y luego alinear recorrido mecánico en{" "}
          <Link className="dialed__link" href="/blog/stroke-physics">
            física del stroke (recorrido)
          </Link>
          .
        </p>
      </section>

      <section className="science-section">
        <h2>Saturación y ritmo</h2>
        <p>
          En sombras por barrido, variar solo el voltage sin coherencia de mano cambia la textura
          aunque el número en pantalla sea “correcto”. La disciplina consiste en coordinar CPS,
          stroke y estilo técnico base—sin humo de marca.
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

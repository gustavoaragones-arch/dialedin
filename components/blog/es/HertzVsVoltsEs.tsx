import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooterEs } from "@/components/blog/es/FooterEs";

type Props = { headline: string; backBlog: string };

export function HertzVsVoltsEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          Voltage es tensión eléctrica (el “cuánto pedís” al motor). Hertz/CPS es frecuencia
          real de ciclo: son socios, no duplicados. La pantalla no reemplaza la física del stroke (
          <Link className="dialed__link" href="/blog/stroke-physics">
            recorrido
          </Link>
          ) ni la sincronía de mano (
          <Link className="dialed__link" href="/blog/hand-speed-sync">
            mano vs CPS
          </Link>
          ).
        </p>
      </header>

      <section className="science-section">
        <h2>Intención artística y lectura común</h2>
        <p>
          Tribal grueso y retrato fino no comparten la misma firma técnica base: por eso la
          taxonomía de estilo en DialedIn ancla CPS/voltage a una disciplina—no a un número
          universal. Si tu máquina muestra Hz (ACUS, Cheyenne) y otra solo Volts, igual necesitás
          traducir ambos al mismo marco: frecuencia visible + margen mecánico coherente.
        </p>
      </section>

      <section className="science-section">
        <h2>De la fuente a la piel</h2>
        <p>
          Dos máquinas en el mismo voltage pueden producir CPS distinto; dos agujas con la misma
          etiqueta pueden cargar distinta resistencia. Por eso enlazamos geometría (
          <Link className="dialed__link" href="/blog/needle-geometry">
            #10 vs #12 y taper
          </Link>
          ) con membrana (
          <Link className="dialed__link" href="/blog/the-membrane-tax">
            impuesto de membrana
          </Link>
          ) antes de “corregir” solo el dial.
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

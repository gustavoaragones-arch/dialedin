import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooterEs } from "@/components/blog/es/FooterEs";

type Props = { headline: string; backBlog: string };

export function NeedleGeometryEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          El calibre (#08–#12) y el taper (largo vs corto) gobiernan huella, resistencia al
          paso y flujo de tinta. No existe “una aguja universal”: existe compatibilidad entre
          geometría, stroke (
          <Link className="dialed__link" href="/blog/stroke-physics">
            física del recorrido
          </Link>
          ) y la intención del estilo.
        </p>
      </header>

      <section className="science-section">
        <h2>#10 vs #12: diámetro y disciplina</h2>
        <p>
          El <strong>#10 (~0,30&nbsp;mm)</strong> suele preferirse cuando querés sombras
          suaves y saturación controlada en realismo: menor masa frontal, menor trauma puntual
          si la técnica no fuerza el paso.
        </p>
        <p>
          El <strong>#12 (~0,35&nbsp;mm)</strong> entrega más masa para líneas sólidas y empaque
          donde la tinta debe entrar con autoridad—siempre que el stroke y el voltage estén
          alineados con la resistencia real del cartucho (
          <Link className="dialed__link" href="/blog/cartridge-drag">
            resistencia del cartucho y tensión de piel
          </Link>
          ).
        </p>
      </section>

      <section className="science-section">
        <h2>Bugpin versus estándar</h2>
        <p>
          Las líneas “bugpin” reducen diámetro efectivo: pueden mejorar detalle, pero también
          aumentan resistencia y exigen lectura honesta de voltaje y membrana. Compará siempre
          con el mismo stroke y el mismo estirado antes de juzgar “falta de saturación”.
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

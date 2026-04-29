import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";

type Props = {
  headline: string;
  backBlog: string;
};

export function StrokePhysicsEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          El número del voltage (tensión/potencia en la fuente) no cuenta la historia
          completa: el <strong>stroke</strong> (recorrido del pistón en mm) define cuánta
          fuerza mecánica lleva cada ciclo a la piel. La frecuencia (Hertz / CPS) describe
          ritmo; el recorrido describe impacto.
        </p>
      </header>

      <section className="science-section">
        <h2>Fuerza versus frecuencia</h2>
        <p>
          Preguntar solo &quot;¿qué voltage uso?&quot; es incompleto. La pregunta disciplinada
          es:{" "}
          <strong>
            ¿cuánta fuerza efectiva estoy aplicando a esta frecuencia, con esta aguja y este
            estirado?
          </strong>{" "}
          El recorrido modifica el golpe seco versus suave tanto como el dial.
        </p>
      </section>

      <section className="science-section">
        <h2>El pivote de 3,5&nbsp;mm</h2>
        <p>
          En rotativos modernos, ~<strong>3,5&nbsp;mm</strong> suele ser el punto medio
          versátil: suficiente recorrido para línea con autoridad y control para sombras sin
          tratar la piel como saco de arena. Cuando te alejás de ese vecindario, cambia la
          clase de impacto: comparar{" "}
          <strong>4,2&nbsp;mm frente a 3,5&nbsp;mm</strong> no es preferencia menor; es otro
          régimen de fuerza.
        </p>
        <p>
          Antes de subir voltage para “despertar” una máquina larga, revisá geometría de aguja
          y consumo de tinta: la{" "}
          <Link className="dialed__link" href="/blog/needle-geometry">
            geometría de agujas (#10 vs #12 y taper)
          </Link>{" "}
          condiciona flujo y resistencia real en la punta.
        </p>
      </section>

      <section className="science-section">
        <h2>Efecto martillo (≈4,0–4,2&nbsp;mm)</h2>
        <p>
          Un recorrido largo acumula más momento: la aguja permanece más tiempo en el tiro
          profundo y el pico de fuerza sube. Eso puede ser ventaja para empaque y líneas
          exigentes; es un riesgo cuando la técnica pide capas suaves.
        </p>
        <p>
          Si tu máquina “se ahoga”, antes de machacar el dial revisá{" "}
          <Link className="dialed__link" href="/blog/the-membrane-tax">
            el impuesto de membrana en cartuchos económicos
          </Link>
          : la membrana rígida roba par efectivo antes de que la aguja acelere de verdad.
        </p>
      </section>

      <section className="science-section">
        <h2>Sincronía mano–máquina</h2>
        <p>
          Recorrido largo + voltage alto + mano rápida puede producir línea punteada o trauma
          disperso. La matemática disciplinada aparece cuando alineás CPS (
          <Link className="dialed__link" href="/blog/hertz-vs-volts">
            Hertz versus voltios
          </Link>
          ) con velocidad de mano: ver{" "}
          <Link className="dialed__link" href="/blog/hand-speed-sync">
            sincronización mano vs CPS
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

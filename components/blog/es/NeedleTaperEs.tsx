import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";

type Props = { headline: string; backBlog: string };

export function NeedleTaperEsArticle({ headline, backBlog }: Props) {
  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          En el mundo del tatuaje técnico, el taper (cono o afilado de la aguja) es a menudo el
          factor más incomprendido. Mientras que el calibre nos habla del grosor y la configuración
          nos dice cómo se agrupan las agujas, el taper define cómo la aguja entra en la piel y
          cuánta tinta deposita en cada impacto. Comprender el taper es la diferencia entre una
          saturación impecable y un trauma excesivo en la piel.
        </p>
      </header>

      <section className="science-section">
        <h2>Geometría técnica: ¿qué es realmente el taper?</h2>
        <p>
          El taper es la longitud de la punta afilada de la aguja antes de alcanzar su diámetro
          total (calibre). Se mide desde el punto donde comienza el afilado hasta la punta.
        </p>
        <ul>
          <li>
            <strong>Short taper (ST), ~1,5&nbsp;mm:</strong> punta corta y relativamente obtusa.
            Abre un canal más grande con rapidez. Suele preferirse para color packing y líneas
            tradicionales gruesas: deposita mucha tinta de golpe.
          </li>
          <li>
            <strong>Long taper (LT), ~2,0–2,5&nbsp;mm:</strong> estándar industrial habitual.
            Equilibrio entre flujo de tinta y suavidad de impacto frente a la piel.
          </li>
          <li>
            <strong>Super long taper (SLT), ~3,5–7,0&nbsp;mm:</strong> punta muy fina y larga.
            Entra con resistencia mínima en la superficie: aliado típico de realismo, sombras
            suaves y microdetalle, con pasadas múltiples y trauma reducido cuando la técnica lo
            respalda.
          </li>
        </ul>
        <p>
          Para ubicar el taper junto al calibre y la agrupación, revisá{" "}
          <Link className="dialed__link" href="/blog/needle-geometry">
            geometría de aguja (#10 vs #12 y taper)
          </Link>
          .
        </p>
      </section>

      <section className="science-section">
        <h2>El mito de la penetración exacta: 1&nbsp;mm vs el feeling</h2>
        <p>
          Es común escuchar en seminarios o leer en manuales frases como: “La aguja debe penetrar
          exactamente 1,5&nbsp;mm”. Desde una perspectiva anatómica media, tiene sentido como
          referencia: la dermis objetivo suele vivir en ese orden de magnitud.
        </p>
        <p>
          La verdad del oficio es otra:{" "}
          <strong>ningún artista sabe cuántos milímetros está penetrando en tiempo real</strong>.
          El tatuaje no es fresado CNC; es un proceso orgánico. La piel cambia en elasticidad,
          grosor y resistencia entre personas y entre zonas (no es lo mismo el codo que el
          antebrazo interno).
        </p>
        <h3>La realidad del artista</h3>
        <p>
          El ajuste no suele ser “pienso en 1,2&nbsp;mm”: es subconsciente y se apoya en tres señales
          críticas:
        </p>
        <ul>
          <li>
            <strong>Resistencia mecánica:</strong> la vibración que viaja por el grip indica cuánto
            se está empujando la piel.
          </li>
          <li>
            <strong>Saturación visual:</strong> cómo asienta la tinta y si aparece brillo excesivo o
            trauma superficial.
          </li>
          <li>
            <strong>Sonido:</strong> el cambio de tono de la máquina cuando encuentra más
            resistencia.
          </li>
        </ul>
        <blockquote>
          <p>
            <strong>Disciplina:</strong> el número (1&nbsp;mm, 2&nbsp;mm) es referencia mental para
            saber que estamos en la capa correcta; la ejecución real es un feeling que se construye
            con horas de práctica honesta.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>¿Cuánto de la aguja debería entrar?</h2>
        <p>
          Con un super long taper, a menudo solo una fracción del afilado negocia la superficie
          antes de que intervenga el diámetro completo del calibre. Si entrás “hasta el cuerpo” del
          grupo, el canal se ensancha y sube el sangrado mecánico.
        </p>
        <ul>
          <li>
            <strong>Sombras:</strong> muchas veces buscamos que solo la punta del cono roce la piel,
            para gradaciones suaves y pasadas controladas.
          </li>
          <li>
            <strong>Líneas sólidas:</strong> necesitás suficiente entrada para que el canal retenga
            pigmento sin pedirte violencia extra de voltage.
          </li>
        </ul>
        <p>
          La protrusión visible (hang) interactúa directamente con eso: leé{" "}
          <Link className="dialed__link" href="/blog/needle-hang-depth">
            salida de aguja y control de profundidad
          </Link>{" "}
          antes de “corregir” solo el dial.
        </p>
      </section>

      <section className="science-section">
        <h2>Conclusión: técnica sobre números</h2>
        <p>
          En tattoomachinesetup.com damos base técnica: por ejemplo, para realismo suave, un long taper o SLT suele
          ser mejor aliado para reducir trauma relativo si el resto del setup es coherente. El
          control fino de profundidad sigue siendo tu firma personal.
        </p>
        <p>
          No te obsesiones con medir milímetros en la aguja como si fuera un calibre industrial.
          Obsesionate con leer la respuesta de la piel. La máquina es herramienta, el taper es el
          puente y tu mano es el sensor que decide cuándo el depósito de tinta es el correcto.
        </p>
        <p>
          Cuando el taper ya tiene sentido, cerrá el circuito con{" "}
          <Link className="dialed__link" href="/blog/hand-speed-sync">
            sincronía de mano con CPS/hercios
          </Link>{" "}
          y el motor de setup: la velocidad relativa de mano cambia cómo se lee cada pasada con la
          misma geometría.
        </p>
        <p className="legal-page__note">
          Esta guía es educativa; el juicio clínico y las normativas locales siguen siendo
          responsabilidad del artista.
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

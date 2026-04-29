import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { BLOG_CTA_ES } from "@/components/blog/es/ctaEs";
import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { getTranslations } from "next-intl/server";

type Props = {
  headline: string;
  lede: string;
  backBlog: string;
};

export async function PhysicsRuleBreakingEsArticle({
  headline,
  lede,
  backBlog,
}: Props) {
  const t = await getTranslations({ locale: "es", namespace: "contentLinks" });

  return (
    <article className="science-page" lang="es">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">{lede}</p>
      </header>

      <section className="science-section">
        <h2>Introducción: el mapa no es el territorio</h2>
        <p>
          Todo aprendiz aprende una partición limpia: <strong>round liners</strong> para bordes,{" "}
          <strong>magnums</strong> para campos, <strong>stroke corto</strong> para suavidad,{" "}
          <strong>stroke largo</strong> para autoridad. Esas reglas existen porque reducen trauma y
          varianza a escala: no son errores de física, son gestión de riesgo.
        </p>
        <p>
          El trabajo avanzado suele violar el mapa a propósito. La pregunta no es si la regla era
          “falsa”, sino si el artista reconstruyó las variables que faltan: ventana de voltaje,{" "}
          <strong>física de la máquina de tatuar</strong> (longitud de stroke, arco, tasa de ciclo),
          geometría de aguja y—sobre todo—<strong>velocidad de mano</strong> frente a ciclos por
          segundo.
        </p>
        <p>
          DialedIn es deliberadamente conservador: codifica valores cercanos al estándar de marca
          para que partas de una base defendible. Desde ahí, romper reglas debe ser{" "}
          <em>instrumentado</em>, no improvisado. Si puedes explicar por qué tu desviación mantiene
          coherente la energía de impacto, la resistencia de la piel y la película de tinta, estás
          haciendo ingeniería, no apuesta.
        </p>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-intro-es"
        >
          <h3 id="tech-summary-intro-es" className="blog-tech-summary__title">
            Resumen técnico
          </h3>
          <ul className="blog-tech-summary__list">
            <li>Los estándares reducen varianza; no agotan el espacio de configuraciones válidas.</li>
            <li>Cualquier emparejamiento “incorrecto” debe reequilibrar stroke, voltaje y velocidad de mano.</li>
            <li>Usa DialedIn como origen seguro; documenta el delta que vas a ejecutar.</li>
          </ul>
        </section>
      </section>

      <section
        className="science-section"
        id="shading-high-stroke"
      >
        <h2>Caso de estudio A: sombreado con stroke largo (4,0 mm+)</h2>
        <h3>La regla</h3>
        <p>
          El recorrido largo se vende para líneas sólidas y color packing: más arco almacenado por
          ciclo, más trabajo hacia delante por impacto. El stroke corto se asocia a pasadas más
          suaves y de menor amplitud.
        </p>
        <h3>La ruptura</h3>
        <p>
          Artistas de blackwork y dotwork disciplinado a veces sombrean con 4,0–4,2 mm—no porque la
          máquina “prefiera” sombrear ahí, sino porque buscan micro-eventos discretos en la piel en
          lugar de un plano de lavado fusionado.
        </p>
        <h3>La lógica técnica</h3>
        <p>
          Con stroke largo, cada ciclo arrastra más momento de aguja. Si mantienes la misma intuición
          de voltaje que en packing, invitas a sobresaturación y a un martilleo mecánico. La
          desviación controlada es <strong>bajar voltaje</strong> y <strong>subir la velocidad de
          mano</strong> efectiva frente al CPS para que los impactos caigan como puntos separados—
          <strong>pepper shading</strong>—en vez de charcos unidos (<strong>smooth shading</strong>
          ).
        </p>
        <ul>
          <li>
            <strong>Stroke ↑</strong> aumenta la energía por ciclo a igual excitación.
          </li>
          <li>
            <strong>Voltaje ↓</strong> reduce la potencia del ciclo si necesitas eventos más suaves.
          </li>
          <li>
            <strong>Velocidad de mano ↑</strong> abre el espaciado lateral entre depósitos.
          </li>
        </ul>
        <p>
          Léelo como trío:{" "}
          <Link className="dialed__link" href="/blog/stroke-physics">
            física del stroke
          </Link>
          , y valida tu banda operativa con{" "}
          <Link className="dialed__link" href="/blog/hand-speed-sync">
            sincronía mano–CPS
          </Link>
          . El sombreado con stroke largo es lícito cuando el espaciado—not el eslógan—hace el
          trabajo de seguridad.
        </p>
        <p className="blog-contextual-cta">
          {t("blogRuleBreaking.sweetSpotLead")}{" "}
          <Link href="/" className="dialed__link">
            {t("blogRuleBreaking.sweetSpotLink")}
          </Link>
        </p>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-a-es"
        >
          <h3 id="tech-summary-a-es" className="blog-tech-summary__title">
            Resumen técnico
          </h3>
          <ul className="blog-tech-summary__list">
            <li>El sombreado con stroke largo cambia lavados fusionados por micro-impactos separados.</li>
            <li>Voltaje más bajo + mano más rápida suele preservar textura sin martillar la piel.</li>
            <li>Palabras clave: high stroke shading, pepper shading vs smooth shading.</li>
          </ul>
        </section>
      </section>

      <section
        className="science-section"
        id="magnum-lines-realism"
      >
        <h2>Caso de estudio B: “líneas” de realismo con magnum</h2>
        <h3>La regla</h3>
        <p>
          Las líneas son territorio RL: agrupación cerrada, borde predecible, poca dispersión
          lateral. La regla protege el filo cuando el artista aún calibra profundidad.
        </p>
        <h3>La ruptura</h3>
        <p>
          Especialistas en retrato a veces estructuran con el <strong>canteado de un magnum</strong>
          —especialmente <strong>CM (curved magnum)</strong>—para evitar el mordisco “de alambre”
          que un RL pequeño puede dejar en planos delicados.
        </p>
        <h3>La lógica técnica</h3>
        <p>
          Un magnum presenta un parche de contacto más ancho. En plano se comporta como sombreador;
          en canto, como un pincel blando con compliance lateral. La “línea” suele ser una ilusión
          por acumulación: varias pasadas de baja amplitud que leen como arista en cámara pero no
          concentran trauma en un solo canal RL. Esa es la lectura disciplinada de la{" "}
          <strong>técnica de línea con magnum</strong>: compras suavidad de transición con geometría,
          no niegas la física del borde.
        </p>
        <ul>
          <li>
            <strong>Contacto en canto</strong> reduce presión efectiva por unidad de longitud frente a RL compacto.
          </li>
          <li>
            <strong>Curvatura (CM)</strong> cambia cómo libera pigmento alrededor de poros y piel fina.
          </li>
          <li>
            <strong>Ángulo + velocidad</strong> deben seguir la misma disciplina de espaciado CPS que en línea.
          </li>
        </ul>
        <p className="blog-contextual-cta">
          {t("blogRuleBreaking.magnumLead")}{" "}
          <Link href="/" className="dialed__link">
            {t("blogRuleBreaking.magnumLink")}
          </Link>
        </p>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-b-es"
        >
          <h3 id="tech-summary-b-es" className="blog-tech-summary__title">
            Resumen técnico
          </h3>
          <ul className="blog-tech-summary__list">
            <li>Los cantos de magnum cambian mordida agresiva por compliance lateral controlada.</li>
            <li>En retrato, muchas “líneas” son pasadas construidas, no un solo corte de canal.</li>
            <li>Palabras clave: magnum lining technique, control de aristas en realismo.</li>
          </ul>
        </section>
      </section>

      <section className="science-section">
        <h2>Caso de estudio C: el mito de la aguja única (1RL / 3RL)</h2>
        <h3>La regla</h3>
        <p>
          Las agrupaciones grandes existen para mover área con eficiencia. Los defaults pedagógicos
          alejan al principiante del heroísmo con una sola aguja porque el tiempo bajo aguja y el
          control de trauma se vuelven más exigentes—no imposibles.
        </p>
        <h3>La ruptura</h3>
        <p>
          Piezas de micro-realismo ejecutadas principalmente con <strong>#08–#10 3RL</strong> no
          “niegan la física”; aceptan un modelo de acumulación más lento. Cada pasada deposita una
          película delgada y precisa; la varianza de profundidad se amplifica, así que voltaje y
          velocidad de mano deben ser aburridamente consistentes.
        </p>
        <h3>La lógica técnica</h3>
        <p>
          El capas (layering) sustituye el ancho de agrupación por repetibilidad. La máquina sigue
          obedeciendo las mismas relaciones stroke–voltaje–CPS; el artista se niega a comprar área
          con número de agujas y paga con tiempo de reloj y planificación de sesión.
        </p>
        <ul>
          <li>
            <strong>Calibre menor</strong> ↑ sensibilidad a error de ángulo y grosor de película.
          </li>
          <li>
            <strong>Más pasadas</strong> ↑ calor acumulado; descanso y estiramiento importan.
          </li>
          <li>
            <strong>Bandas de voltaje conservadoras</strong> vencen al “voltaje héroe” para detalle fotográfico.
          </li>
        </ul>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-c-es"
        >
          <h3 id="tech-summary-c-es" className="blog-tech-summary__title">
            Resumen técnico
          </h3>
          <ul className="blog-tech-summary__list">
            <li>El micro-realismo con 3RL es estrategia de capas, no atajo físico.</li>
            <li>La precisión escala con repetibilidad más que con pico de potencia.</li>
            <li>Palabras clave: micro-realismo 3RL, capas controladas.</li>
          </ul>
        </section>
      </section>

      <section className="science-section">
        <h2>Conclusión: la variable de cierre es la velocidad de la mano</h2>
        <p>
          Puedes usar configuraciones que en papel parecen “erróneas” si entiendes cómo se acoplan{" "}
          <strong>voltaje + stroke + velocidad de mano</strong> al espaciado de depósitos y a la
          energía de impacto. El oficio no es la violación; el oficio es saber qué variable estás
          gastando para comprar el look.
        </p>
        <blockquote>
          <p>
            <strong>Llamada a la acción:</strong> usa DialedIn para encontrar tu zona segura—y
            luego, rómperla con intención, medición y responsabilidad frente a la piel.
          </p>
        </blockquote>
        <p className="blog-contextual-cta blog-contextual-cta--exit">
          <strong>{t("blogRuleBreakingExit.toolPrompt")}</strong>{" "}
          <Link href="/" className="dialed__link">
            {t("blogRuleBreakingExit.toolLinkLabel")}
          </Link>
        </p>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-outro-es"
        >
          <h3 id="tech-summary-outro-es" className="blog-tech-summary__title">
            Resumen técnico
          </h3>
          <ul className="blog-tech-summary__list">
            <li>Las desviaciones son válidas cuando stroke, voltios y CPS siguen coherentes.</li>
            <li>La velocidad de mano cierra la ecuación de textura tras la elección de hardware.</li>
            <li>Disciplina = nombrar tus trade-offs en lugar de misticarlos.</li>
          </ul>
        </section>
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

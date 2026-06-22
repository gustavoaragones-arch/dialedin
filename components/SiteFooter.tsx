import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__company">
          <strong>Albor Digital LLC</strong>
        </p>
        <p className="site-footer__line">
          <span className="site-footer__label">{t("contactLabel")}</span>{" "}
          <a className="site-footer__link" href="mailto:contact@tattoomachinesetup.com">
            contact@tattoomachinesetup.com
          </a>
        </p>
        <nav className="site-footer__site" aria-label="Product">
          <Link className="site-footer__link site-footer__link--emphasis" href="/">
            {t("setupEngine")}
          </Link>
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link
            className="site-footer__link site-footer__link--emphasis"
            href="/how-it-works"
          >
            {t("howItWorks")}
          </Link>
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link className="site-footer__link site-footer__link--emphasis" href="/blog">
            {t("technicalBlog")}
          </Link>
        </nav>
        <nav className="site-footer__legal" aria-label="Legal">
          <Link className="site-footer__link" href="/disclaimer">
            {t("disclaimer")}
          </Link>
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link className="site-footer__link" href="/privacy">
            {t("privacy")}
          </Link>
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link className="site-footer__link" href="/terms">
            {t("terms")}
          </Link>
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link className="site-footer__link" href="/responsible-ai">
            {t("responsibleAi")}
          </Link>
        </nav>
        <p className="site-footer__trust" role="status">
          {t("lastUpdate")}
        </p>
      </div>
    </footer>
  );
}

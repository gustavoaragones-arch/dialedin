import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__company">
          <strong>Albor Digital LLC</strong>
        </p>
        <p className="site-footer__line">
          <span className="site-footer__label">Contact</span>{" "}
          <a className="site-footer__link" href="mailto:contact@dialedin.ink">
            contact@dialedin.ink
          </a>
        </p>
        <nav className="site-footer__legal" aria-label="Legal">
          <Link className="site-footer__link" href="/blog">
            Blog
          </Link>
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link className="site-footer__link" href="/terms">
            Terms of Service
          </Link>
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link className="site-footer__link" href="/privacy">
            Privacy Policy
          </Link>
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link className="site-footer__link" href="/responsible-ai">
            Responsible AI Policy
          </Link>
        </nav>
        <p className="site-footer__trust" role="status">
          Last engine update: April 2026
        </p>
      </div>
    </footer>
  );
}

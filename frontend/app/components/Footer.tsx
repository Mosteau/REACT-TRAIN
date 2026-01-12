import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__links">
            <Link href="/">Accueil</Link>
            <Link href="/simulator">Simulateur</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer__copyright">
            © 2026 Fenêtres Pro. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}

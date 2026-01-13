import Link from 'next/link';

// Composant Footer - Pied de page de l'application
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          {/* Section des liens de navigation */}
          <div className="footer__links">
            <Link href="/">Accueil</Link>
            <Link href="/simulator">Simulateur</Link>
            <Link href="/contact">Contact</Link>
          </div>
          {/* Section copyright */}
          <div className="footer__copyright">
            © 2026 Fenêtres Pro. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}

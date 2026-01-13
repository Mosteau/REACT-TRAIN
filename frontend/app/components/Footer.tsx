import Link from 'next/link';
import '../assets/scss/footer.scss';

// Composant Footer - Pied de page de l'application
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo et marque */}
        <div className="footer__brand">
          <span className="brand-text">Fenêtres Pro</span>
        </div>
        
        {/* Copyright */}
        <div className="footer__copyright">
          © 2026 Fenêtres Pro. Tous droits réservés.
        </div>
        
        {/* Liens */}
        <div className="footer__links">
          <Link href="/">Catalogue</Link>
          <Link href="/simulator">Simulateur</Link>
        </div>
      </div>
    </footer>
  );
}
import Link from 'next/link';

// Composant Header - En-tête fixe de l'application
export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        {/* Titre principal de l'application */}
        <h1 className="header__title">Fenêtres Pro</h1>
        {/* Lien de navigation vers le simulateur */}
        <Link href="/simulator" className="header__simulator-link">
          Simulateur
        </Link>
      </div>
    </header>
  );
}

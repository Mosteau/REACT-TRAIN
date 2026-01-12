import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Fenêtres Pro</h1>
        <Link href="/simulator" className="header__simulator-link">
          Simulateur
        </Link>
      </div>
    </header>
  );
}

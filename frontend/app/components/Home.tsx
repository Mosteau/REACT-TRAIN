import Link from 'next/link'
import '../assets/styles/index.scss'

function Home() {
    return (
        <div className="home">
            <h1>Bienvenue sur le site qui simule la meilleure menuiserie</h1>
            <h2>Vous pourrez ici trouver tous les produits de la marque et les tester sur notre simulateur de menuiserie</h2>
            <Link href="/simulator">Aller au simulateur</Link>
        </div>
    )
}

export default Home
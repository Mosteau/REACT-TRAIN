import Link from 'next/link'
import '../assets/styles/index.scss'

// Composant Simulator - Page de simulation des produits de menuiserie
function Simulator() {
    return (
        <div className="simulator">
            {/* Titre principal du simulateur */}
            <h1>Simulateur de menuiserie</h1>
            {/* Description de la fonctionnalité */}
            <p>Ici vous pouvez tester nos produits</p>
            {/* Lien de retour vers la page d'accueil */}
            <Link href="/">Retour à l'accueil</Link>
        </div>
    )
}

export default Simulator
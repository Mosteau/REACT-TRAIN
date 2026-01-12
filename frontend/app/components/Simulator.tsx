import Link from 'next/link'
import '../assets/styles/index.scss'

function Simulator() {
    return (
        <div className="simulator">
            <h1>Simulateur de menuiserie</h1>
            <p>Ici vous pouvez tester nos produits</p>
            <Link href="/">Retour à l'accueil</Link>
        </div>
    )
}

export default Simulator
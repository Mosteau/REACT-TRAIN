import { Suspense } from 'react'
import FenetresList from './components/FenetresList'
import { FenetresLoading } from './components/Loading'

export default function Page() {
  return (
    <Suspense fallback={<FenetresLoading />}>
      <FenetresList />
    </Suspense>
  )
}
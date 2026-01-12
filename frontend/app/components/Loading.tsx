import { Suspense } from 'react'

function FenetresLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <h1 className="col-span-full text-3xl font-bold mb-6">Nos Fenêtres</h1>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 shadow-md animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  )
}

export { FenetresLoading }

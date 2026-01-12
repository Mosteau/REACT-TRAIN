'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Erreur de chargement
      </h2>
      <p className="text-gray-600 mb-4 text-center">
        {error.message || 'Une erreur est survenue lors du chargement des fenêtres'}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Réessayer
      </button>
    </div>
  )
}

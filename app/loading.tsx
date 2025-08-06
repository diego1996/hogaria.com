export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hogaria-warm">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-hogaria-wine mx-auto mb-4"></div>
        <p className="text-hogaria-wine font-medium">Cargando Hogaría...</p>
      </div>
    </div>
  )
} 
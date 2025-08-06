'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-hogaria-warm">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-6">😔</div>
          <h1 className="text-3xl font-handwriting text-hogaria-wine mb-4">
            ¡Ups! Algo salió mal
          </h1>
          <p className="text-gray-600 mb-8">
            Ha ocurrido un error inesperado. No te preocupes, nuestro equipo ya está trabajando para solucionarlo.
          </p>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="btn-primary w-full"
            >
              Intentar de nuevo
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="btn-secondary w-full"
            >
              Volver al inicio
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
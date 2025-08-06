'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hogaria-warm">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-3xl font-handwriting text-hogaria-wine mb-4">
            Página no encontrada
          </h1>
          <p className="text-gray-600 mb-8">
            La página que buscas no existe. Pero no te preocupes, puedes volver al hogar de Hogaría.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="btn-primary inline-block">
              Volver al inicio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 
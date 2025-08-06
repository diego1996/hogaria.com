'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, AlertCircle, Home, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface TransactionStatus {
  id: string
  status: 'pending' | 'approved' | 'declined' | 'error'
  amount: number
  currency: string
  reference: string
  customer_email: string
  created_at: string
}

const PaymentConfirmation = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [transaction, setTransaction] = useState<TransactionStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const transactionId = searchParams.get('id')
  const status = searchParams.get('status')

  useEffect(() => {
    if (transactionId) {
      verifyTransaction(transactionId)
    } else {
      setIsLoading(false)
      setError('No se encontró información de la transacción')
    }
  }, [transactionId])

  const verifyTransaction = async (id: string) => {
    try {
      const response = await fetch(`/api/wompi?id=${id}`)
      const data = await response.json()

      if (response.ok && data.success) {
        setTransaction(data.transaction.data)
      } else {
        setError(data.error || 'Error al verificar la transacción')
      }
    } catch (err) {
      console.error('Error verificando transacción:', err)
      setError('Error al verificar el estado de la transacción')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusInfo = () => {
    if (!transaction && !status) return null

    const txStatus = transaction?.status || status

    switch (txStatus) {
      case 'APPROVED':
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          title: '¡Pago Exitoso!',
          message: 'Tu orden ha sido procesada correctamente. Recibirás una confirmación por email pronto.',
          status: 'success'
        }
      
      case 'PENDING':
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          title: 'Pago en Proceso',
          message: 'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
          status: 'pending'
        }
      
      case 'DECLINED':
      case 'declined':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          title: 'Pago Rechazado',
          message: 'Tu pago fue rechazado. Por favor intenta con otro método de pago.',
          status: 'error'
        }
      
      case 'ERROR':
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          title: 'Error en el Pago',
          message: 'Ocurrió un error al procesar tu pago. Por favor intenta nuevamente.',
          status: 'error'
        }
      
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          title: 'Estado Desconocido',
          message: 'No se pudo determinar el estado de tu pago. Contacta soporte.',
          status: 'unknown'
        }
    }
  }

  const statusInfo = getStatusInfo()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-hogaria-warm to-hogaria-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-hogaria-wine mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Verificando Pago...</h2>
          <p className="text-gray-600">Por favor espera un momento</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hogaria-warm to-hogaria-beige">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`w-20 h-20 ${statusInfo?.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              {statusInfo?.icon && <statusInfo.icon className={`${statusInfo.color}`} size={40} />}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              {statusInfo?.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600"
            >
              {statusInfo?.message}
            </motion.p>
          </div>

          {/* Transaction Details */}
          {transaction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Detalles de la Transacción</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">ID de Transacción:</span>
                  <span className="font-mono text-sm text-gray-800">{transaction.id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Referencia:</span>
                  <span className="font-mono text-sm text-gray-800">{transaction.reference}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monto:</span>
                  <span className="font-semibold text-hogaria-wine">
                    ${(transaction.amount / 100).toLocaleString('es-CO')} {transaction.currency}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-800">{transaction.customer_email}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="text-gray-800">
                    {new Date(transaction.created_at).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-red-500" size={24} />
                <div>
                  <h3 className="font-semibold text-red-800">Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <Home size={20} />
                <span>Volver al Inicio</span>
              </motion.button>
            </Link>
            
            <Link href="/#productos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>Ver Más Productos</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Necesitas Ayuda?</h3>
              <p className="text-gray-600 mb-4">
                Si tienes alguna pregunta sobre tu orden o el proceso de pago, no dudes en contactarnos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/573000000000?text=Hola,%20necesito%20ayuda%20con%20mi%20orden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <span>Contactar por WhatsApp</span>
                </a>
                <a
                  href="mailto:soporte@hogaria.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-hogaria-wine text-white rounded-lg hover:bg-hogaria-olive transition-colors"
                >
                  <span>Enviar Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentConfirmation 
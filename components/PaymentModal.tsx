'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, User, Mail, Phone, MapPin, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { useCountry } from '@/app/contexts/CountryContext'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

interface CustomerData {
  name: string
  email: string
  phone: string
  document: string
  documentType: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
}

const PaymentModal = ({ isOpen, onClose, product }: PaymentModalProps) => {
  const { formatPrice, selectedCountry } = useCountry()
  const [step, setStep] = useState<'form' | 'processing' | 'success' | 'error'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    document: '',
    documentType: 'CC',
    address: '',
    city: '',
    state: '',
    country: selectedCountry.name,
    postalCode: ''
  })

  const documentTypes = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'TI', label: 'Tarjeta de Identidad' },
    { value: 'PP', label: 'Pasaporte' },
    { value: 'NIT', label: 'NIT' }
  ]

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'document', 'address', 'city', 'state', 'postalCode']
    for (const field of required) {
      if (!customerData[field as keyof CustomerData]) {
        setError(`El campo ${field} es requerido`)
        return false
      }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerData.email)) {
      setError('Email inválido')
      return false
    }

    // Validar teléfono
    const phoneRegex = /^[0-9+\-\s()]+$/
    if (!phoneRegex.test(customerData.phone)) {
      setError('Teléfono inválido')
      return false
    }

    setError('')
    return true
  }

  const handlePayment = async () => {
    if (!product || !validateForm()) return

    setIsLoading(true)
    setStep('processing')
    setError('')

    try {
      const response = await fetch('/api/wompi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          amount: product.price,
          currency: 'COP',
          customerEmail: customerData.email,
          customerName: customerData.name,
          customerPhone: customerData.phone,
          customerDocument: customerData.document,
          customerDocumentType: customerData.documentType,
          shippingAddress: {
            address: customerData.address,
            city: customerData.city,
            state: customerData.state,
            country: customerData.country,
            postalCode: customerData.postalCode
          }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el pago')
      }

      if (data.redirect_url) {
        // Redirigir a Wompi para completar el pago
        window.location.href = data.redirect_url
      } else {
        setStep('success')
      }

    } catch (err) {
      console.error('Error en el pago:', err)
      setError(err instanceof Error ? err.message : 'Error al procesar el pago')
      setStep('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setStep('form')
      setError('')
      onClose()
    }
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-hogaria-wine rounded-lg">
                  <CreditCard className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Procesar Pago</h2>
                  <p className="text-sm text-gray-600">Completa tus datos para continuar</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'form' && (
                <div className="space-y-6">
                  {/* Product Summary */}
                  <div className="bg-hogaria-warm rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                        <p className="text-xl font-bold text-hogaria-wine mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <User size={20} />
                      <span>Información Personal</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          value={customerData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={customerData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                          placeholder="tu@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          value={customerData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                          placeholder="+57 300 000 0000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de Documento
                        </label>
                        <select
                          value={customerData.documentType}
                          onChange={(e) => handleInputChange('documentType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                        >
                          {documentTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Número de Documento *
                        </label>
                        <input
                          type="text"
                          value={customerData.document}
                          onChange={(e) => handleInputChange('document', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                          placeholder="12345678"
                        />
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                        <MapPin size={20} />
                        <span>Dirección de Envío</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección *
                          </label>
                          <input
                            type="text"
                            value={customerData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                            placeholder="Calle 123 # 45-67"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad *
                          </label>
                          <input
                            type="text"
                            value={customerData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                            placeholder="Bogotá"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Departamento/Estado *
                          </label>
                          <input
                            type="text"
                            value={customerData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                            placeholder="Cundinamarca"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            País
                          </label>
                          <input
                            type="text"
                            value={customerData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                            placeholder="Colombia"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Código Postal *
                          </label>
                          <input
                            type="text"
                            value={customerData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all"
                            placeholder="110111"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                        <AlertCircle className="text-red-500" size={20} />
                        <span className="text-red-700">{error}</span>
                      </div>
                    )}

                    {/* Security Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-2">
                      <Lock className="text-blue-500 mt-0.5" size={16} />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium">Pago Seguro</p>
                        <p>Tus datos están protegidos con encriptación SSL. El pago se procesa de forma segura a través de Wompi.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 'processing' && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-hogaria-wine mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Procesando Pago</h3>
                  <p className="text-gray-600">Por favor espera mientras procesamos tu pago...</p>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Pago Exitoso!</h3>
                  <p className="text-gray-600 mb-6">Tu orden ha sido procesada correctamente. Recibirás una confirmación por email.</p>
                  <button
                    onClick={handleClose}
                    className="btn-primary"
                  >
                    Continuar
                  </button>
                </div>
              )}

              {step === 'error' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Error en el Pago</h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <div className="flex space-x-3 justify-center">
                    <button
                      onClick={() => setStep('form')}
                      className="btn-secondary"
                    >
                      Intentar de Nuevo
                    </button>
                    <button
                      onClick={handleClose}
                      className="btn-primary"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {step === 'form' && (
              <div className="flex items-center justify-between p-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Total a pagar: <span className="font-semibold text-hogaria-wine">{formatPrice(product.price)}</span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                  >
                    <CreditCard size={18} />
                    <span>Pagar Ahora</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PaymentModal 
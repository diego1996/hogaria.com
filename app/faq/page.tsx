'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, MessageCircle, Truck, CreditCard, RefreshCw, Package, Shield, Clock, Phone } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'productos' | 'envios' | 'pagos' | 'devoluciones' | 'general'
}

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('todos')

  const faqData: FAQItem[] = [
    // Productos
    {
      id: 'productos-1',
      question: '¿Qué materiales utilizan en sus productos?',
      answer: 'Utilizamos materiales de la más alta calidad como algodón 100% natural, lino premium, y fibras naturales. Todos nuestros productos están hechos con materiales hipoalergénicos y respetuosos con el medio ambiente.',
      category: 'productos'
    },
    {
      id: 'productos-2',
      question: '¿Los productos son hechos a mano?',
      answer: 'Sí, todos nuestros productos son artesanales y hechos a mano por expertos artesanos. Cada pieza es única y lleva consigo el amor y la dedicación de nuestros maestros artesanos.',
      category: 'productos'
    },
    {
      id: 'productos-3',
      question: '¿Tienen diferentes tamaños disponibles?',
      answer: 'Sí, ofrecemos una amplia variedad de tamaños para adaptarnos a las necesidades de cada hogar. Desde tamaños individuales hasta king size, y medidas personalizadas según tus requerimientos.',
      category: 'productos'
    },
    {
      id: 'productos-4',
      question: '¿Cómo cuido mis productos de Hogaría?',
      answer: 'Recomendamos lavar en agua fría con detergente suave, no usar blanqueador, y planchar a temperatura media. Para productos específicos, consulta las etiquetas de cuidado incluidas con cada producto.',
      category: 'productos'
    },
    {
      id: 'productos-5',
      question: '¿Los productos tienen garantía?',
      answer: 'Sí, todos nuestros productos tienen garantía de calidad. Si encuentras algún defecto de fabricación, te ofrecemos reemplazo o devolución completa del dinero.',
      category: 'productos'
    },

    // Envíos
    {
      id: 'envios-1',
      question: '¿Cuánto tiempo tarda el envío?',
      answer: 'Los tiempos de envío varían según tu ubicación. En Bogotá: 1-2 días hábiles. Otras ciudades principales: 2-4 días hábiles. Ciudades intermedias: 3-5 días hábiles. Zonas rurales: 5-7 días hábiles.',
      category: 'envios'
    },
    {
      id: 'envios-2',
      question: '¿Cuál es el costo de envío?',
      answer: 'El envío es gratuito para compras superiores a $150,000. Para compras menores, el costo varía entre $8,000 y $15,000 según tu ubicación. Calculamos el envío exacto al momento de la compra.',
      category: 'envios'
    },
    {
      id: 'envios-3',
      question: '¿Envían a todo Colombia?',
      answer: 'Sí, realizamos envíos a todo el territorio colombiano, incluyendo islas y zonas rurales. Trabajamos con las mejores empresas de mensajería para garantizar la entrega segura.',
      category: 'envios'
    },
    {
      id: 'envios-4',
      question: '¿Puedo hacer seguimiento a mi pedido?',
      answer: 'Sí, una vez procesado tu pedido recibirás un número de seguimiento por email y WhatsApp. Podrás rastrear tu envío en tiempo real a través de nuestro sistema.',
      category: 'envios'
    },
    {
      id: 'envios-5',
      question: '¿Qué pasa si no estoy en casa cuando llega el envío?',
      answer: 'El mensajero intentará entregar en 3 oportunidades. Si no te encuentra, dejará un aviso para que coordines una nueva entrega o retires en la oficina más cercana.',
      category: 'envios'
    },

    // Pagos
    {
      id: 'pagos-1',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos pagos con tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, y pagos a través de Wompi. También puedes pagar contra entrega en algunas zonas.',
      category: 'pagos'
    },
    {
      id: 'pagos-2',
      question: '¿Es seguro pagar en línea?',
      answer: 'Absolutamente. Utilizamos la plataforma Wompi, que cuenta con los más altos estándares de seguridad SSL y está certificada por las principales entidades financieras de Colombia.',
      category: 'pagos'
    },
    {
      id: 'pagos-3',
      question: '¿Puedo pagar en cuotas?',
      answer: 'Sí, ofrecemos la opción de pagar en cuotas sin intereses con tarjetas de crédito. Las opciones disponibles son 3, 6, 12, 18 y 24 cuotas, dependiendo de tu banco.',
      category: 'pagos'
    },
    {
      id: 'pagos-4',
      question: '¿Cuándo se procesa mi pago?',
      answer: 'Los pagos con tarjeta se procesan inmediatamente. Las transferencias bancarias pueden tomar 1-2 días hábiles. Los pagos contra entrega se realizan al momento de recibir el producto.',
      category: 'pagos'
    },
    {
      id: 'pagos-5',
      question: '¿Qué pasa si mi pago es rechazado?',
      answer: 'Si tu pago es rechazado, te notificaremos inmediatamente por email. Puedes intentar con otro método de pago o contactarnos para resolver cualquier problema.',
      category: 'pagos'
    },

    // Devoluciones
    {
      id: 'devoluciones-1',
      question: '¿Puedo devolver un producto?',
      answer: 'Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su empaque original y sin usar. Algunos productos personalizados pueden tener restricciones.',
      category: 'devoluciones'
    },
    {
      id: 'devoluciones-2',
      question: '¿Cómo proceso una devolución?',
      answer: 'Contacta nuestro servicio al cliente por WhatsApp o email explicando el motivo de la devolución. Te enviaremos una etiqueta de envío prepagada y coordinaremos la recolección.',
      category: 'devoluciones'
    },
    {
      id: 'devoluciones-3',
      question: '¿Cuánto tiempo tarda el reembolso?',
      answer: 'Una vez recibido el producto devuelto, procesamos el reembolso en 3-5 días hábiles. El tiempo de acreditación dependerá de tu banco o método de pago original.',
      category: 'devoluciones'
    },
    {
      id: 'devoluciones-4',
      question: '¿Quién paga el envío de la devolución?',
      answer: 'Si la devolución es por defecto de fabricación, nosotros cubrimos todos los costos. Si es por cambio de opinión, el cliente cubre el costo de envío de retorno.',
      category: 'devoluciones'
    },
    {
      id: 'devoluciones-5',
      question: '¿Puedo cambiar un producto por otro?',
      answer: 'Sí, puedes cambiar un producto por otro del mismo valor o mayor (pagando la diferencia). Los cambios están sujetos a disponibilidad de inventario.',
      category: 'devoluciones'
    },

    // General
    {
      id: 'general-1',
      question: '¿Dónde están ubicados?',
      answer: 'Nuestro taller principal está ubicado en Bogotá, Colombia. Sin embargo, realizamos envíos a todo el país y contamos con puntos de distribución en las principales ciudades.',
      category: 'general'
    },
    {
      id: 'general-2',
      question: '¿Puedo visitar su taller?',
      answer: '¡Por supuesto! Nos encanta recibir visitas. Puedes agendar una cita previa por WhatsApp o email. Te mostraremos nuestro proceso artesanal y podrás ver nuestros productos en persona.',
      category: 'general'
    },
    {
      id: 'general-3',
      question: '¿Hacen productos personalizados?',
      answer: 'Sí, ofrecemos servicios de personalización. Puedes elegir colores, tamaños, y diseños específicos. Los productos personalizados pueden tomar 2-3 semanas adicionales.',
      category: 'general'
    },
    {
      id: 'general-4',
      question: '¿Tienen descuentos para compras al por mayor?',
      answer: 'Sí, ofrecemos descuentos especiales para compras al por mayor (más de 10 unidades). Contacta nuestro equipo comercial para obtener una cotización personalizada.',
      category: 'general'
    },
    {
      id: 'general-5',
      question: '¿Cómo puedo contactarlos?',
      answer: 'Puedes contactarnos por WhatsApp al +57 300 000 0000, por email a info@hogaria.com, o a través de nuestro formulario de contacto en la web. Atendemos de lunes a viernes de 8:00 AM a 6:00 PM.',
      category: 'general'
    }
  ]

  const categories = [
    { id: 'todos', name: 'Todas las preguntas', icon: Package },
    { id: 'productos', name: 'Productos', icon: Package },
    { id: 'envios', name: 'Envíos', icon: Truck },
    { id: 'pagos', name: 'Pagos', icon: CreditCard },
    { id: 'devoluciones', name: 'Devoluciones', icon: RefreshCw },
    { id: 'general', name: 'General', icon: Shield }
  ]

  const filteredFAQs = activeCategory === 'todos' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory)

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const isItemOpen = (id: string) => openItems.includes(id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-hogaria-warm to-hogaria-beige">
      <div className="container-custom py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos, 
            envíos, pagos y más. Si no encuentras lo que buscas, no dudes en contactarnos.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-hogaria-wine text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-hogaria-olive hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {isItemOpen(faq.id) ? (
                      <ChevronUp className="text-hogaria-wine" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={24} />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isItemOpen(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MessageCircle className="text-hogaria-wine" size={32} />
              <h2 className="text-2xl font-bold text-gray-800">
                ¿No encontraste tu respuesta?
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Nuestro equipo está aquí para ayudarte. Contáctanos y te responderemos 
              lo antes posible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contacto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>Contactar Soporte</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const message = encodeURIComponent('¡Hola! Necesito ayuda con una pregunta sobre Hogaría.')
                  window.open(`https://wa.me/34600000000?text=${message}`, '_blank')
                }}
                className="btn-secondary flex items-center space-x-2"
              >
                <Phone size={20} />
                <span>WhatsApp</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Enlaces Útiles
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terminos-servicio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-hogaria-olive hover:text-white transition-colors duration-300"
              >
                Términos de Servicio
              </motion.button>
            </Link>
            <Link href="/politica-privacidad">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-hogaria-olive hover:text-white transition-colors duration-300"
              >
                Política de Privacidad
              </motion.button>
            </Link>
            <Link href="/cookies">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-hogaria-olive hover:text-white transition-colors duration-300"
              >
                Política de Cookies
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQPage 
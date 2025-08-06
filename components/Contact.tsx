'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { useCountry } from '@/app/contexts/CountryContext'

const Contact = () => {
  const { selectedCountry } = useCountry()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Enviar a la API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        // También enviar por WhatsApp como respaldo
        const message = encodeURIComponent(
          `Nuevo mensaje de contacto:\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\nMensaje: ${formData.message}`
        )
        const phone = selectedCountry.id === 'co' ? '573000000000' : '34600000000'
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
        
        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.')
      } else {
        alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.')
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'WhatsApp Colombia',
      value: '+57 300 000 0000',
      action: () => {
        const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre Hogaría.')
        window.open(`https://wa.me/573000000000?text=${message}`, '_blank')
      }
    },
    {
      icon: Phone,
      title: 'WhatsApp España',
      value: '+34 600 000 000',
      action: () => {
        const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre Hogaría.')
        window.open(`https://wa.me/34600000000?text=${message}`, '_blank')
      }
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hola@hogaria.com',
      action: () => window.open('mailto:hola@hogaria.com', '_blank')
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Bogotá, Colombia / Madrid, España',
      action: () => {}
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun-Vie: 9:00-18:00 (COT/CET)',
      action: () => {}
    }
  ]

  return (
    <section id="contacto" className="section-padding bg-gradient-to-br from-hogaria-warm to-hogaria-beige">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -left-8 text-3xl text-red-400 opacity-60"
            >
              💕
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-handwriting text-hogaria-wine mb-4 relative z-10">
              Contáctanos
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-8 text-2xl text-pink-400 opacity-60"
            >
              ✨
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o quieres hacer un pedido personalizado? 
            Estamos aquí para ayudarte con mucho amor 💕
          </p>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-4 text-2xl"
          >
            🌸
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-handwriting text-hogaria-wine mb-6">
              Envíanos un Mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all duration-300"
                  placeholder="+57 300 000 0000 (Colombia) / +34 600 000 000 (España)"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Cuéntanos qué necesitas..."
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2 text-lg py-4"
              >
                <Send size={20} />
                <span>Enviar Mensaje</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-handwriting text-hogaria-wine mb-6">
                Información de Contacto
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Estamos aquí para ayudarte a encontrar los productos perfectos para tu hogar. 
                No dudes en contactarnos de la forma que prefieras.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300 cursor-pointer"
                  onClick={info.action}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-hogaria-olive/10 rounded-lg flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-hogaria-olive" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {info.title}
                    </h4>
                    <p className="text-gray-600">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-hogaria-wine rounded-2xl p-8 text-white text-center"
            >
              <div className="text-4xl mb-4">💬</div>
              <h4 className="text-xl font-semibold mb-2">
                ¿Prefieres WhatsApp?
              </h4>
              <p className="text-hogaria-beige mb-6">
                Responde en minutos y recibe atención personalizada
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre Hogaría.')
                  const phone = selectedCountry.id === 'co' ? '573000000000' : '34600000000'
                  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
                }}
                className="bg-white text-hogaria-wine px-6 py-3 rounded-lg font-semibold hover:bg-hogaria-beige transition-colors duration-300 flex items-center justify-center space-x-2 mx-auto"
              >
                <MessageCircle size={20} />
                <span>Chatear por WhatsApp</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 bg-white rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-handwriting text-hogaria-wine mb-8 text-center">
            Preguntas Frecuentes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: '¿Hacen envíos en Colombia y España?',
                answer: 'Sí, realizamos envíos a toda Colombia y España con entrega en 24-48 horas.'
              },
              {
                question: '¿Los productos son 100% artesanales?',
                answer: 'Absolutamente. Cada pieza está hecha a mano en Colombia con materiales de la mejor calidad.'
              },
              {
                question: '¿Aceptan pedidos personalizados?',
                answer: '¡Por supuesto! Nos encanta crear productos únicos para nuestros clientes en ambos países.'
              },
              {
                question: '¿Cuál es el tiempo de entrega?',
                answer: 'Los productos en stock se envían en 24-48 horas. Los personalizados tardan 1-2 semanas.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="p-6 bg-hogaria-warm rounded-xl"
              >
                <h4 className="font-semibold text-hogaria-wine mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 
'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Heart, Instagram, Facebook, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useNavigation } from '@/app/hooks/useNavigation'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { navigateTo } = useNavigation()

  const footerLinks = {
    productos: [
      { name: 'Sábanas', href: '/', anchor: '#productos' },
      { name: 'Almohadas', href: '/', anchor: '#productos' },
      { name: 'Decoración Navideña', href: '/', anchor: '#colecciones' },
      { name: 'Manteles', href: '/', anchor: '#productos' },
      { name: 'Cojines', href: '/', anchor: '#productos' }
    ],
    empresa: [
      { name: 'Sobre Nosotros', href: '/', anchor: '#sobre-nosotros' },
      { name: 'Nuestra Historia', href: '/', anchor: '#sobre-nosotros' },
      { name: 'Valores', href: '/', anchor: '#sobre-nosotros' },
      { name: 'Artesanía', href: '/', anchor: '#sobre-nosotros' }
    ],
    ayuda: [
      { name: 'Contacto', href: '/', anchor: '#contacto' },
      { name: 'Envíos', href: '/', anchor: '#contacto' },
      { name: 'Devoluciones', href: '/', anchor: '#contacto' },
      { name: 'FAQ', href: '/faq', anchor: null }
    ]
  }

  const handleNavigation = (href: string, anchor: string | null) => {
    navigateTo(href, anchor)
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ]

  return (
    <footer className="bg-hogaria-wine text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-hogaria-wine font-bold text-lg">H</span>
                  </div>
                  <span className="font-handwriting text-3xl font-semibold">
                    Hogaría
                  </span>
                </div>
                <p className="text-hogaria-beige text-lg mb-6 leading-relaxed">
                  Detalles que abrazan tu hogar. Productos artesanales hechos con amor 
                  para transformar tu espacio en un lugar cálido y acogedor.
                </p>
                
                {/* WhatsApp CTA */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre Hogaría.')
                    window.open(`https://wa.me/34600000000?text=${message}`, '_blank')
                  }}
                  className="bg-white text-hogaria-wine px-6 py-3 rounded-lg font-semibold hover:bg-hogaria-beige transition-colors duration-300 flex items-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>Chatear por WhatsApp</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Productos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Productos</h3>
              <ul className="space-y-2">
                {footerLinks.productos.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavigation(link.href, link.anchor)}
                      className="text-hogaria-beige hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Empresa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavigation(link.href, link.anchor)}
                      className="text-hogaria-beige hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Ayuda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
              <ul className="space-y-2">
                {footerLinks.ayuda.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavigation(link.href, link.anchor)}
                      className="text-hogaria-beige hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-hogaria-olive/30 py-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-handwriting mb-4">
              Únete a nuestra comunidad
            </h3>
            <p className="text-hogaria-beige mb-6">
              Recibe ofertas exclusivas y novedades sobre nuevos productos
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-hogaria-olive focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-hogaria-olive text-white px-6 py-3 rounded-lg font-semibold hover:bg-hogaria-accent transition-colors duration-300"
              >
                Suscribirse
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-hogaria-olive/30 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-hogaria-beige">
              <Heart size={16} className="text-red-400" />
              <span>
                © {currentYear} Hogaría. Todos los derechos reservados.
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-hogaria-olive/20 rounded-full flex items-center justify-center hover:bg-hogaria-olive/40 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-hogaria-beige">
              <a href="/politica-privacidad" className="hover:text-white transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="/terminos-servicio" className="hover:text-white transition-colors duration-300">
                Términos de Servicio
              </a>
              <a href="/cookies" className="hover:text-white transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Made with Love */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-hogaria-olive py-4 text-center"
      >
        <p className="text-sm text-white">
          Hecho con <Heart size={14} className="inline text-red-400" /> en Colombia
        </p>
      </motion.div>
    </footer>
  )
}

export default Footer 
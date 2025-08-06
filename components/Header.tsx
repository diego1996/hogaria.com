'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ShoppingBag, Heart, User } from 'lucide-react'
import CountrySelector from './CountrySelector'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Productos', href: '#productos' },
    { name: 'Colecciones', href: '#colecciones' },
    { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contacto', href: '#contacto' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-hogaria-beige">
      <div className="container-custom px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-hogaria-wine to-hogaria-olive rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-handwriting text-2xl text-hogaria-wine font-semibold">
              Hogaría
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-700 hover:text-hogaria-wine transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Icons and Country Selector */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-hogaria-wine transition-colors"
            >
              <Heart size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-hogaria-wine transition-colors"
            >
              <ShoppingBag size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-hogaria-wine transition-colors"
            >
              <User size={20} />
            </motion.button>

            {/* Country Selector */}
            <div className="hidden sm:block">
              <CountrySelector />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-hogaria-wine transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-hogaria-beige"
          >
            <nav className="py-4 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-hogaria-wine transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              ))}
              {/* Mobile Country Selector */}
              <div className="pt-4 border-t border-hogaria-beige">
                <CountrySelector />
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header 
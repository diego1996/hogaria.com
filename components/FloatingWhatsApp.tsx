'use client'

import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useCountry } from '@/app/contexts/CountryContext'
import { useState } from 'react'

export default function FloatingWhatsApp() {
  const { selectedCountry } = useCountry()
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre Hogaría. 💕')
    const phone = selectedCountry.id === 'co' ? '573000000000' : '34600000000'
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-24 right-6 z-50"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          x: isHovered ? 0 : 20 
        }}
        transition={{ duration: 0.3 }}
        className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2"
      >
        <div className="bg-hogaria-wine text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <div className="text-sm font-medium">
            ¡Chatea con nosotros! 💬
          </div>
          <div className="text-xs opacity-90">
            {selectedCountry.name}
          </div>
          {/* Arrow */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-hogaria-wine border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleWhatsAppClick}
        className="relative group"
      >
        {/* Main Button */}
        <motion.div
          animate={{ 
            rotate: isHovered ? [0, -10, 10, 0] : 0 
          }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-80"></div>
          
          {/* WhatsApp Icon */}
          <MessageCircle size={28} className="relative z-10" />
          
          {/* Pulse Animation */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-green-400 rounded-full"
          />
        </motion.div>

        {/* Country Flag Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-green-500"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
        </motion.div>

        {/* Notification Dot */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
        />
      </motion.button>
    </motion.div>
  )
} 
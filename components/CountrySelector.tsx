'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe } from 'lucide-react'
import { useCountry, countries } from '@/app/contexts/CountryContext'

export default function CountrySelector() {
  const { selectedCountry, setSelectedCountry } = useCountry()
  const [isOpen, setIsOpen] = useState(false)

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-hogaria-beige hover:bg-white transition-all duration-300 shadow-sm"
      >
        <Globe className="w-4 h-4 text-hogaria-wine" />
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {selectedCountry.name}
        </span>
        <span className="text-sm font-medium text-hogaria-wine">
          {selectedCountry.currency}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-hogaria-wine transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-hogaria-beige overflow-hidden z-50"
          >
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => handleCountrySelect(country)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-hogaria-warm transition-colors duration-200 ${
                  selectedCountry.id === country.id ? 'bg-hogaria-warm' : ''
                }`}
              >
                <span className="text-xl">{country.flag}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{country.name}</div>
                  <div className="text-sm text-gray-500">{country.currency}</div>
                </div>
                {selectedCountry.id === country.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-hogaria-wine rounded-full"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Accessibility, 
  Type, 
  Eye, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Plus,
  Minus,
  Play,
  Pause,
  X
} from 'lucide-react'

interface AccessibilitySettings {
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  screenReader: boolean
}

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100, // porcentaje
    highContrast: false,
    reducedMotion: false,
    screenReader: false
  })
  const [isReading, setIsReading] = useState(false)
  const [currentText, setCurrentText] = useState('')

  // Aplicar configuraciones de accesibilidad
  useEffect(() => {
    const root = document.documentElement
    
    // Tamaño de fuente
    root.style.fontSize = `${settings.fontSize}%`
    
    // Alto contraste
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Reducir movimiento
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }
  }, [settings])

  // Funciones de control de tamaño de fuente
  const increaseFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 10, 200)
    }))
  }

  const decreaseFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 10, 70)
    }))
  }

  const resetFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontSize: 100
    }))
  }

  // Función de lectura de pantalla
  const toggleScreenReader = () => {
    setSettings(prev => ({
      ...prev,
      screenReader: !prev.screenReader
    }))
  }

  // Función para leer texto seleccionado
  const readSelectedText = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const text = selection.toString()
      setCurrentText(text)
      setIsReading(true)
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'es-ES'
        utterance.rate = 0.9
        utterance.pitch = 1
        utterance.volume = 1
        
        utterance.onend = () => {
          setIsReading(false)
          setCurrentText('')
        }
        
        speechSynthesis.speak(utterance)
      }
    }
  }

  // Función para leer toda la página
  const readPage = () => {
    const pageText = document.body.innerText
    setCurrentText('Leyendo página completa...')
    setIsReading(true)
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(pageText)
      utterance.lang = 'es-ES'
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      
      utterance.onend = () => {
        setIsReading(false)
        setCurrentText('')
      }
      
      speechSynthesis.speak(utterance)
    }
  }

  // Detener lectura
  const stopReading = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsReading(false)
      setCurrentText('')
    }
  }

  // Resetear todas las configuraciones
  const resetAll = () => {
    setSettings({
      fontSize: 100,
      highContrast: false,
      reducedMotion: false,
      screenReader: false
    })
    stopReading()
  }

  return (
    <>
      {/* Botón flotante de accesibilidad */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-hogaria-wine hover:bg-hogaria-olive rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300"
        aria-label="Panel de accesibilidad"
      >
        <Accessibility size={24} />
      </motion.button>

      {/* Panel de accesibilidad */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed left-6 bottom-20 z-40 w-80 bg-white rounded-2xl shadow-2xl border border-hogaria-beige overflow-hidden"
          >
            {/* Header */}
            <div className="bg-hogaria-wine text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Accessibility size={20} />
                <h3 className="font-semibold">Accesibilidad</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-4 space-y-6">
              {/* Control de tamaño de fuente */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Type size={18} className="text-hogaria-wine" />
                  <h4 className="font-semibold text-gray-800">Tamaño de texto</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={decreaseFontSize}
                    className="w-8 h-8 bg-hogaria-beige hover:bg-hogaria-olive hover:text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Reducir tamaño de texto"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="flex-1 text-center text-sm font-medium">
                    {settings.fontSize}%
                  </span>
                  <button
                    onClick={increaseFontSize}
                    className="w-8 h-8 bg-hogaria-beige hover:bg-hogaria-olive hover:text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Aumentar tamaño de texto"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={resetFontSize}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Restablecer tamaño de texto"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              {/* Alto contraste */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Eye size={18} className="text-hogaria-wine" />
                  <h4 className="font-semibold text-gray-800">Alto contraste</h4>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }))}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    settings.highContrast
                      ? 'bg-hogaria-wine text-white'
                      : 'bg-hogaria-beige text-gray-700 hover:bg-hogaria-olive hover:text-white'
                  }`}
                >
                  {settings.highContrast ? 'Desactivar' : 'Activar'} alto contraste
                </button>
              </div>

              {/* Reducir movimiento */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Accessibility size={18} className="text-hogaria-wine" />
                  <h4 className="font-semibold text-gray-800">Reducir movimiento</h4>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    settings.reducedMotion
                      ? 'bg-hogaria-wine text-white'
                      : 'bg-hogaria-beige text-gray-700 hover:bg-hogaria-olive hover:text-white'
                  }`}
                >
                  {settings.reducedMotion ? 'Desactivar' : 'Activar'} reducción de movimiento
                </button>
              </div>

              {/* Lector de pantalla */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Volume2 size={18} className="text-hogaria-wine" />
                  <h4 className="font-semibold text-gray-800">Lector de pantalla</h4>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={readSelectedText}
                    className="w-full py-2 px-4 bg-hogaria-beige hover:bg-hogaria-olive hover:text-white rounded-lg transition-colors text-sm"
                  >
                    Leer texto seleccionado
                  </button>
                  <button
                    onClick={isReading ? stopReading : readPage}
                    className="w-full py-2 px-4 bg-hogaria-beige hover:bg-hogaria-olive hover:text-white rounded-lg transition-colors text-sm flex items-center justify-center space-x-2"
                  >
                    {isReading ? (
                      <>
                        <Pause size={14} />
                        <span>Detener lectura</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        <span>Leer página completa</span>
                      </>
                    )}
                  </button>
                </div>
                {currentText && (
                  <div className="mt-2 p-2 bg-hogaria-warm rounded text-xs text-gray-600">
                    {currentText}
                  </div>
                )}
              </div>

              {/* Resetear todo */}
              <div className="pt-4 border-t border-hogaria-beige">
                <button
                  onClick={resetAll}
                  className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={14} />
                  <span>Restablecer todo</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 
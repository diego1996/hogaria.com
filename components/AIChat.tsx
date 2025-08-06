'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Heart, Sparkles, X, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual de Hogaría 💕 ¿En qué puedo ayudarte hoy? Puedo recomendarte productos, ayudarte con tu pedido o responder cualquier pregunta sobre nuestros productos artesanales.',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Enviar mensaje al webhook de n8n
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          conversationId: 'hogaria-chat',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const data = await response.json()
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || 'Gracias por tu mensaje. Te responderé pronto con amor 💕',
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        // Respuesta de fallback amorosa
        const fallbackMessages = [
          '¡Qué lindo mensaje! 💕 Déjame pensar en la mejor respuesta para ti...',
          'Me encanta tu pregunta! 🌸 Te ayudo con mucho gusto.',
          '¡Gracias por contactarnos! 💖 Nuestro equipo te responderá pronto con amor.',
          'Qué dulce pregunta! ✨ Déjame buscar la información perfecta para ti.',
          '¡Me hace muy feliz ayudarte! 🌺 Te respondo con todo mi cariño.'
        ]
        const randomMessage = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)]
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomMessage,
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '¡Ups! Algo salió mal, pero no te preocupes 💕. Puedes contactarnos directamente por WhatsApp y te ayudaremos con mucho amor.',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const quickReplies = [
    '¿Qué productos tienen?',
    '¿Hacen envíos?',
    '¿Tienen productos navideños?',
    '¿Puedo personalizar mi pedido?'
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-hogaria-wine to-hogaria-olive text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={24} />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-hogaria-crema overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-hogaria-wine to-hogaria-olive text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot size={20} />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles size={12} className="text-yellow-300" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-semibold">Asistente Hogaría</h3>
                  <p className="text-xs opacity-90">Te ayudo con amor 💕</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-hogaria-crema/10 to-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-hogaria-wine to-hogaria-olive text-white'
                        : 'bg-white border border-hogaria-crema text-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {!message.isUser && (
                        <div className="flex-shrink-0 mt-1">
                          <Heart size={14} className="text-red-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.isUser && (
                        <div className="flex-shrink-0 mt-1">
                          <User size={14} className="text-white/80" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-hogaria-crema text-gray-700 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Heart size={14} className="text-red-400" />
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-hogaria-wine rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-hogaria-wine rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-hogaria-wine rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="p-4 bg-hogaria-crema/20">
                <p className="text-xs text-gray-600 mb-2">💡 Preguntas rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={reply}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage(reply)}
                      className="text-xs bg-white border border-hogaria-crema text-gray-700 px-3 py-1 rounded-full hover:bg-hogaria-crema hover:text-white transition-colors"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-hogaria-crema bg-white">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje con amor... 💕"
                  className="flex-1 px-4 py-2 border border-hogaria-crema rounded-full focus:outline-none focus:ring-2 focus:ring-hogaria-wine focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-hogaria-wine to-hogaria-olive text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChat 
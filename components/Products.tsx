'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, MessageCircle, Search, Filter } from 'lucide-react'
import { useCountry } from '@/app/contexts/CountryContext'

interface Product {
  id: number
  name: string
  category: string
  price: number // Precio en COP
  originalPrice?: number // Precio original para descuentos
  image: string
  description: string
  rating: number
  reviews: number
  isNew?: boolean
  isPopular?: boolean
  isOnSale?: boolean
  stock: number
  colors?: string[]
  sizes?: string[]
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const { formatPrice, selectedCountry } = useCountry()

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🏠' },
    { id: 'sabanas', name: 'Sábanas', icon: '🛏️' },
    { id: 'almohadas', name: 'Almohadas', icon: '🛌' },
    { id: 'navidad', name: 'Navidad', icon: '🎄' },
    { id: 'manteles', name: 'Manteles', icon: '🍽️' },
    { id: 'decoracion', name: 'Decoración', icon: '✨' },
    { id: 'cojines', name: 'Cojines', icon: '🛋️' },
    { id: 'toallas', name: 'Toallas', icon: '🛁' },
  ]

  const products: Product[] = [
    // SÁBANAS
    {
      id: 1,
      name: 'Sábanas de Algodón Orgánico',
      category: 'sabanas',
      price: 89990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Sábanas suaves y transpirables de algodón 100% orgánico',
      rating: 4.8,
      reviews: 127,
      isPopular: true,
      stock: 15,
      colors: ['Blanco', 'Beige', 'Gris'],
      sizes: ['Individual', 'Doble', 'Queen', 'King']
    },
    {
      id: 2,
      name: 'Sábanas de Seda Natural',
      category: 'sabanas',
      price: 129990,
      originalPrice: 159990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Sábanas de seda natural para noches de lujo',
      rating: 4.9,
      reviews: 45,
      isPopular: true,
      isOnSale: true,
      stock: 8,
      colors: ['Blanco', 'Champagne'],
      sizes: ['Doble', 'Queen', 'King']
    },
    {
      id: 3,
      name: 'Sábanas Bordadas Artesanales',
      category: 'sabanas',
      price: 75990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Sábanas con bordados tradicionales colombianos',
      rating: 4.7,
      reviews: 89,
      stock: 12,
      colors: ['Blanco', 'Cremoso'],
      sizes: ['Individual', 'Doble', 'Queen']
    },

    // ALMOHADAS
    {
      id: 4,
      name: 'Almohadas Decorativas',
      category: 'almohadas',
      price: 45990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Almohadas artesanales con diseños únicos',
      rating: 4.9,
      reviews: 89,
      isNew: true,
      stock: 20,
      colors: ['Multicolor', 'Beige', 'Verde oliva'],
      sizes: ['40x40cm', '50x50cm']
    },
    {
      id: 5,
      name: 'Almohadas de Plumas',
      category: 'almohadas',
      price: 65990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Almohadas premium con relleno de plumas naturales',
      rating: 4.8,
      reviews: 67,
      stock: 10,
      colors: ['Blanco'],
      sizes: ['Estándar', 'Firme', 'Suave']
    },

    // NAVIDAD
    {
      id: 6,
      name: 'Muñecos Navideños',
      category: 'navidad',
      price: 29990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Muñecos tejidos a mano para decorar tu árbol',
      rating: 4.7,
      reviews: 156,
      stock: 25,
      colors: ['Rojo', 'Verde', 'Dorado', 'Plateado']
    },
    {
      id: 7,
      name: 'Guirnaldas Artesanales',
      category: 'navidad',
      price: 35990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Guirnaldas tejidas con motivos navideños',
      rating: 4.6,
      reviews: 78,
      stock: 18,
      colors: ['Rojo y Verde', 'Dorado', 'Plateado']
    },
    {
      id: 8,
      name: 'Estrellas de Navidad',
      category: 'navidad',
      price: 19990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Estrellas artesanales para decorar tu hogar',
      rating: 4.5,
      reviews: 92,
      stock: 30,
      colors: ['Dorado', 'Plateado', 'Rojo']
    },

    // MANTELES
    {
      id: 9,
      name: 'Mantel Bordado',
      category: 'manteles',
      price: 65990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Mantel artesanal con bordados tradicionales',
      rating: 4.6,
      reviews: 73,
      stock: 14,
      colors: ['Blanco', 'Beige', 'Cremoso'],
      sizes: ['Redondo 120cm', 'Redondo 150cm', 'Rectangular 180x90cm']
    },
    {
      id: 10,
      name: 'Mantel de Lino',
      category: 'manteles',
      price: 55990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Mantel de lino natural con acabado rústico',
      rating: 4.7,
      reviews: 45,
      stock: 12,
      colors: ['Natural', 'Beige', 'Gris'],
      sizes: ['Rectangular 200x100cm', 'Rectangular 240x120cm']
    },

    // DECORACIÓN
    {
      id: 11,
      name: 'Cojines Decorativos',
      category: 'decoracion',
      price: 38990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Cojines con diseños únicos para tu sofá',
      rating: 4.8,
      reviews: 94,
      stock: 22,
      colors: ['Multicolor', 'Beige', 'Verde oliva', 'Rosa'],
      sizes: ['40x40cm', '50x50cm', '60x40cm']
    },
    {
      id: 12,
      name: 'Centros de Mesa',
      category: 'decoracion',
      price: 25990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Centros de mesa artesanales para tu hogar',
      rating: 4.5,
      reviews: 56,
      stock: 16,
      colors: ['Natural', 'Beige', 'Blanco']
    },

    // COJINES
    {
      id: 13,
      name: 'Cojines de Seda',
      category: 'cojines',
      price: 49990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Cojines de seda natural con relleno premium',
      rating: 4.9,
      reviews: 34,
      isNew: true,
      stock: 8,
      colors: ['Champagne', 'Rosa', 'Azul'],
      sizes: ['45x45cm', '50x50cm']
    },
    {
      id: 14,
      name: 'Cojines Bordados',
      category: 'cojines',
      price: 42990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Cojines con bordados tradicionales colombianos',
      rating: 4.7,
      reviews: 67,
      stock: 15,
      colors: ['Blanco', 'Cremoso', 'Beige'],
      sizes: ['40x40cm', '50x50cm']
    },

    // TOALLAS
    {
      id: 15,
      name: 'Toallas de Algodón',
      category: 'toallas',
      price: 35990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Toallas suaves de algodón 100% orgánico',
      rating: 4.6,
      reviews: 89,
      stock: 20,
      colors: ['Blanco', 'Beige', 'Gris', 'Azul'],
      sizes: ['Baño', 'Mano', 'Rostro']
    },
    {
      id: 16,
      name: 'Toallas Bordadas',
      category: 'toallas',
      price: 42990,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Toallas con bordados artesanales',
      rating: 4.8,
      reviews: 45,
      stock: 12,
      colors: ['Blanco', 'Cremoso'],
      sizes: ['Baño', 'Mano']
    }
  ]

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case 'popular':
      default:
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
    }
  })

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleWhatsAppPurchase = (product: Product) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa comprar: ${product.name} - ${formatPrice(product.price)}\n\n` +
      `Descripción: ${product.description}\n` +
      `¿Podrías darme más información sobre disponibilidad y envío?`
    )
    const phone = selectedCountry.id === 'co' ? '573000000000' : '34600000000'
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  const handleQuickView = (product: Product) => {
    // Aquí se podría abrir un modal con detalles del producto
    console.log('Ver detalles de:', product.name)
  }

  return (
    <section id="productos" className="section-padding bg-white">
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
              Nuestros Productos
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
            Descubre nuestra colección de productos artesanales, cada uno hecho con amor y dedicación para hacer tu hogar más cálido y acogedor 💕
          </p>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-4 text-2xl"
          >
            🌸
          </motion.div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-hogaria-warm rounded-2xl p-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-hogaria-beige rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <Filter className="text-hogaria-wine" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-hogaria-beige rounded-lg focus:ring-2 focus:ring-hogaria-olive focus:border-transparent transition-all duration-300 bg-white"
              >
                <option value="popular">Más Populares</option>
                <option value="newest">Más Nuevos</option>
                <option value="rating">Mejor Valorados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              {sortedProducts.length} productos encontrados
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-hogaria-wine text-white'
                  : 'bg-hogaria-beige text-gray-700 hover:bg-hogaria-olive hover:text-white'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Nuevo
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="bg-hogaria-wine text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Oferta
                    </span>
                  )}
                </div>

                {/* Stock Indicator */}
                <div className="absolute top-4 right-12">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 10 ? 'En Stock' : product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                  </span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                    favorites.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart size={20} className={favorites.includes(product.id) ? 'fill-current' : ''} />
                </button>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickView(product)}
                    className="bg-white text-hogaria-wine px-4 py-2 rounded-lg font-medium"
                  >
                    Ver Detalles
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-hogaria-olive font-medium uppercase tracking-wide">
                    {categories.find(c => c.id === product.category)?.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="mb-4">
                  {product.originalPrice && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg line-through text-gray-400">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                  <span className="text-2xl font-bold text-hogaria-wine">
                    {formatPrice(product.price)}
                  </span>
                </div>

                {/* Product Options */}
                {product.colors && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Colores disponibles:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.colors.slice(0, 3).map((color, idx) => (
                        <span key={idx} className="text-xs bg-hogaria-beige text-gray-700 px-2 py-1 rounded">
                          {color}
                        </span>
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          +{product.colors.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWhatsAppPurchase(product)}
                    className="btn-primary flex items-center space-x-2 flex-1 mr-2"
                    disabled={product.stock === 0}
                  >
                    <MessageCircle size={18} />
                    <span>{product.stock === 0 ? 'Agotado' : 'Comprar'}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickView(product)}
                    className="p-3 bg-hogaria-beige hover:bg-hogaria-olive hover:text-white rounded-lg transition-colors duration-300"
                  >
                    <ShoppingBag size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '16', label: 'Productos Únicos', icon: '🛍️' },
              { number: '500+', label: 'Clientes Satisfechos', icon: '😊' },
              { number: '100%', label: 'Artesanal', icon: '🧵' },
              { number: '24h', label: 'Respuesta Rápida', icon: '⚡' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-hogaria-wine mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-hogaria-warm to-hogaria-beige rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-hogaria-wine mb-4">
              ¿No encuentras lo que buscas? 💕
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contáctanos y te ayudaremos a encontrar el producto perfecto para tu hogar. 
              También aceptamos pedidos personalizados para hacer tu espacio único y especial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const message = encodeURIComponent('¡Hola! Me gustaría ver más productos de Hogaría.')
                  const phone = selectedCountry.id === 'co' ? '573000000000' : '34600000000'
                  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Ver Más Productos</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const message = encodeURIComponent('¡Hola! Me gustaría hacer un pedido personalizado.')
                  const phone = selectedCountry.id === 'co' ? '573000000000' : '34600000000'
                  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
                }}
                className="btn-secondary flex items-center space-x-2"
              >
                <span>Pedido Personalizado</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Products 

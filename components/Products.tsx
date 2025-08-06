'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, MessageCircle } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
  isNew?: boolean
  isPopular?: boolean
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🏠' },
    { id: 'sabanas', name: 'Sábanas', icon: '🛏️' },
    { id: 'almohadas', name: 'Almohadas', icon: '🛌' },
    { id: 'navidad', name: 'Navidad', icon: '🎄' },
    { id: 'manteles', name: 'Manteles', icon: '🍽️' },
    { id: 'decoracion', name: 'Decoración', icon: '✨' },
  ]

  const products: Product[] = [
    {
      id: 1,
      name: 'Sábanas de Algodón Orgánico',
      category: 'sabanas',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Sábanas suaves y transpirables de algodón 100% orgánico',
      rating: 4.8,
      reviews: 127,
      isPopular: true
    },
    {
      id: 2,
      name: 'Almohadas Decorativas',
      category: 'almohadas',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Almohadas artesanales con diseños únicos',
      rating: 4.9,
      reviews: 89,
      isNew: true
    },
    {
      id: 3,
      name: 'Muñecos Navideños',
      category: 'navidad',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Muñecos tejidos a mano para decorar tu árbol',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: 'Mantel Bordado',
      category: 'manteles',
      price: 65.99,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Mantel artesanal con bordados tradicionales',
      rating: 4.6,
      reviews: 73
    },
    {
      id: 5,
      name: 'Cojines Decorativos',
      category: 'decoracion',
      price: 38.99,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Cojines con diseños únicos para tu sofá',
      rating: 4.8,
      reviews: 94
    },
    {
      id: 6,
      name: 'Sábanas de Seda',
      category: 'sabanas',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      description: 'Sábanas de seda natural para noches de lujo',
      rating: 4.9,
      reviews: 45,
      isPopular: true
    }
  ]

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleWhatsAppPurchase = (product: Product) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa comprar: ${product.name} - €${product.price}\n\n¿Podrías darme más información?`
    )
    const phone = '+34600000000' // Cambiar por el número real
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
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
          <h2 className="text-4xl md:text-5xl font-handwriting text-hogaria-wine mb-4">
            Nuestros Productos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra colección de productos artesanales, cada uno hecho con amor y dedicación
          </p>
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
          {filteredProducts.map((product, index) => (
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

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-hogaria-wine">
                    €{product.price}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWhatsAppPurchase(product)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <MessageCircle size={18} />
                    <span>Comprar</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿No encuentras lo que buscas? ¡Contáctanos!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const message = encodeURIComponent('¡Hola! Me gustaría ver más productos de Hogaría.')
              const phone = '+34600000000'
              window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
            }}
            className="btn-secondary text-lg px-8 py-4"
          >
            Ver Más Productos
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Products 
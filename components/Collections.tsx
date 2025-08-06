'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, MessageCircle } from 'lucide-react'
import { useCountry } from '@/app/contexts/CountryContext'

interface Collection {
  id: number
  name: string
  description: string
  image: string
  products: number
  discount: number
  isFeatured?: boolean
}

const Collections = () => {
  const { selectedCountry } = useCountry()
  const collections: Collection[] = [
    {
      id: 1,
      name: 'Colección Navideña',
      description: 'Decoraciones mágicas para hacer de tu hogar el lugar más especial de estas fiestas',
      image: 'https://images.unsplash.com/photo-1543589923-d58f523daee0?w=600&h=400&fit=crop',
      products: 25,
      discount: 20,
      isFeatured: true
    },
    {
      id: 2,
      name: 'Dormitorio Cálido',
      description: 'Sábanas y almohadas que transformarán tu dormitorio en un oasis de confort',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop',
      products: 18,
      discount: 15
    },
    {
      id: 3,
      name: 'Mesa Elegante',
      description: 'Manteles y servilletas artesanales para crear momentos inolvidables',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop',
      products: 12,
      discount: 10
    }
  ]

  const handleWhatsAppCollection = (collection: Collection) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa la ${collection.name} con ${collection.discount}% de descuento.\n\n¿Podrías mostrarme los productos disponibles?`
    )
    const phone = '+34600000000' // Cambiar por el número real
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <section id="colecciones" className="section-padding bg-gradient-to-br from-hogaria-warm to-hogaria-beige">
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
            Colecciones Especiales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestras colecciones curadas con los mejores productos para cada ocasión
          </p>
        </motion.div>

        {/* Featured Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          {collections.filter(c => c.isFeatured).map((collection) => (
            <div key={collection.id} className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-80 lg:h-full">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-hogaria-wine/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      -{collection.discount}% DESCUENTO
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl">🎄</span>
                    <span className="text-hogaria-olive font-medium uppercase tracking-wide">
                      Colección Destacada
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-handwriting text-hogaria-wine mb-4">
                    {collection.name}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {collection.description}
                  </p>

                  <div className="flex items-center space-x-6 mb-8">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-hogaria-wine">
                        {collection.products}
                      </span>
                      <span className="text-gray-600">productos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.9</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWhatsAppCollection(collection)}
                    className="btn-primary flex items-center justify-center space-x-2 text-lg py-4"
                  >
                    <MessageCircle size={20} />
                    <span>Ver Colección</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Other Collections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {collections.filter(c => !c.isFeatured).map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="card group overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-hogaria-wine text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{collection.discount}%
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-handwriting text-hogaria-wine mb-3">
                  {collection.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {collection.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-hogaria-wine">
                      {collection.products} productos
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWhatsAppCollection(collection)}
                  className="btn-secondary w-full flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={18} />
                  <span>Explorar</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿Te gustaría una colección personalizada para tu hogar?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const message = encodeURIComponent('¡Hola! Me gustaría una colección personalizada para mi hogar.')
              const phone = '+34600000000'
              window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
            }}
            className="btn-primary text-lg px-8 py-4"
          >
            Solicitar Colección Personalizada
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Collections 
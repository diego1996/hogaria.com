'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ShoppingBag, 
  MessageCircle, 
  CreditCard, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
import { useCountry } from '@/app/contexts/CountryContext'
import PaymentModal from '@/components/PaymentModal'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIChat from '@/components/AIChat'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import AccessibilityPanel from '@/components/AccessibilityPanel'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  description: string
  longDescription?: string
  category: string
  stock: number
  rating?: number
  reviews?: number
  specifications?: {
    material: string
    size: string
    weight: string
    care: string
    origin: string
  }
  features?: string[]
  colors?: string[]
  sizes?: string[]
}

const ProductDetailsPage = () => {
  const params = useParams()
  const router = useRouter()
  const { formatPrice, selectedCountry } = useCountry()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showImageModal, setShowImageModal] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  // Mock product data - in a real app, this would come from an API
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Sábanas de Algodón Premium',
      price: 89000,
      originalPrice: 120000,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1000&h=1000&fit=crop'
      ],
      description: 'Sábanas de algodón 100% natural con acabado premium para un descanso excepcional.',
      longDescription: 'Nuestras sábanas de algodón premium están tejidas con los mejores hilos de algodón egipcio, garantizando una suavidad excepcional y durabilidad superior. El tejido de alta densidad (300 hilos) proporciona una sensación de lujo que transformará tu experiencia de sueño. Cada juego incluye sábana ajustable, sábana plana y fundas de almohada, todas confeccionadas a mano por nuestros expertos artesanos.',
      category: 'Sábanas',
      stock: 15,
      rating: 4.8,
      reviews: 127,
      specifications: {
        material: 'Algodón 100% natural',
        size: 'King Size (200x200cm)',
        weight: '300 g/m²',
        care: 'Lavar en agua fría, no usar blanqueador',
        origin: 'Hecho en Colombia'
      },
      features: [
        'Algodón 100% natural hipoalergénico',
        'Tejido de alta densidad (300 hilos)',
        'Acabado suave y duradero',
        'Confección artesanal',
        'Incluye sábana ajustable, plana y fundas',
        'Garantía de calidad'
      ],
      colors: ['Blanco', 'Beige', 'Gris claro', 'Azul cielo'],
      sizes: ['Individual', 'Doble', 'Queen', 'King']
    },
    {
      id: 2,
      name: 'Almohadas de Plumas Naturales',
      price: 65000,
      originalPrice: 85000,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop'
      ],
      description: 'Almohadas rellenas con plumas naturales de ganso para un soporte perfecto.',
      longDescription: 'Nuestras almohadas de plumas naturales están rellenas con las mejores plumas de ganso, seleccionadas cuidadosamente para garantizar la máxima suavidad y soporte. El diseño ergonómico se adapta perfectamente a la forma de tu cabeza y cuello, proporcionando un descanso reparador. La funda de algodón premium es transpirable y fácil de lavar.',
      category: 'Almohadas',
      stock: 8,
      rating: 4.9,
      reviews: 89,
      specifications: {
        material: 'Plumas naturales de ganso',
        size: '50x70cm',
        weight: '800g',
        care: 'Lavar en seco recomendado',
        origin: 'Hecho en Colombia'
      },
      features: [
        'Relleno 100% plumas naturales',
        'Soporte ergonómico',
        'Funda de algodón premium',
        'Transpirable y fresca',
        'Ajustable al gusto',
        'Durabilidad superior'
      ],
      colors: ['Blanco', 'Beige'],
      sizes: ['Estándar', 'Grande', 'Extra Grande']
    },
    {
      id: 3,
      name: 'Mantel Bordado Artesanal',
      price: 45000,
      originalPrice: 60000,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop'
      ],
      description: 'Mantel bordado a mano con diseños tradicionales colombianos.',
      longDescription: 'Nuestro mantel bordado artesanal es una pieza única que combina la tradición colombiana con el diseño moderno. Cada bordado es hecho a mano por nuestras artesanas expertas, utilizando técnicas ancestrales que han sido transmitidas de generación en generación. El lino premium proporciona durabilidad y elegancia, mientras que los bordados añaden un toque de color y personalidad a tu mesa.',
      category: 'Manteles',
      stock: 12,
      rating: 4.7,
      reviews: 56,
      specifications: {
        material: 'Lino premium con bordados',
        size: '150x150cm',
        weight: '250 g/m²',
        care: 'Lavar a mano, planchar a temperatura media',
        origin: 'Hecho en Colombia'
      },
      features: [
        'Bordado artesanal a mano',
        'Lino premium natural',
        'Diseños tradicionales',
        'Resistente y duradero',
        'Fácil de mantener',
        'Pieza única'
      ],
      colors: ['Blanco', 'Cremoso', 'Beige'],
      sizes: ['Redondo 120cm', 'Redondo 150cm', 'Cuadrado 150cm']
    },
    {
      id: 4,
      name: 'Cojines Decorativos',
      price: 35000,
      originalPrice: 45000,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop'
      ],
      description: 'Cojines decorativos con diseños únicos para dar vida a tu espacio.',
      longDescription: 'Nuestros cojines decorativos son más que simples accesorios; son piezas de arte que transforman cualquier espacio. Cada cojín está confeccionado con telas de alta calidad y relleno premium, garantizando comodidad y durabilidad. Los diseños únicos, inspirados en la cultura colombiana, añaden color y personalidad a tu hogar.',
      category: 'Cojines',
      stock: 20,
      rating: 4.6,
      reviews: 78,
      specifications: {
        material: 'Algodón y poliéster premium',
        size: '45x45cm',
        weight: '500g',
        care: 'Lavar en agua fría',
        origin: 'Hecho en Colombia'
      },
      features: [
        'Diseños únicos artesanales',
        'Relleno premium',
        'Fácil de lavar',
        'Múltiples usos',
        'Colores vibrantes',
        'Durabilidad superior'
      ],
      colors: ['Multicolor', 'Azul', 'Verde', 'Rosa'],
      sizes: ['Pequeño 30x30cm', 'Mediano 45x45cm', 'Grande 60x60cm']
    },
    {
      id: 5,
      name: 'Decoración Navideña Artesanal',
      price: 55000,
      originalPrice: 75000,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop'
      ],
      description: 'Conjunto de decoración navideña hecho a mano con materiales naturales.',
      longDescription: 'Nuestra decoración navideña artesanal trae la magia de la Navidad a tu hogar con piezas únicas hechas a mano. Cada elemento está confeccionado con materiales naturales como madera, tela y elementos reciclados, creando una decoración sostenible y hermosa. El conjunto incluye múltiples piezas que se pueden combinar de diferentes maneras.',
      category: 'Decoración',
      stock: 5,
      rating: 4.9,
      reviews: 34,
      specifications: {
        material: 'Madera, tela y elementos naturales',
        size: 'Conjunto completo',
        weight: '2kg',
        care: 'Limpiar con paño húmedo',
        origin: 'Hecho en Colombia'
      },
      features: [
        'Hecho completamente a mano',
        'Materiales naturales',
        'Diseño sostenible',
        'Múltiples piezas',
        'Fácil de instalar',
        'Duradero y reutilizable'
      ],
      colors: ['Natural', 'Rojo y verde', 'Dorado'],
      sizes: ['Conjunto pequeño', 'Conjunto mediano', 'Conjunto grande']
    }
  ]

  useEffect(() => {
    const productId = parseInt(params.id as string)
    const foundProduct = mockProducts.find(p => p.id === productId)
    
    if (foundProduct) {
      setProduct(foundProduct)
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0])
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0])
      }
    }
    setIsLoading(false)
  }, [params.id])

  const handleWhatsAppPurchase = (product: Product) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto: ${product.name}\n` +
      `Precio: ${formatPrice(product.price)}\n` +
      `Color: ${selectedColor}\n` +
      `Tamaño: ${selectedSize}\n` +
      `Cantidad: ${quantity}\n\n` +
      `¿Podrían ayudarme con más información?`
    )
    window.open(`https://wa.me/34600000000?text=${message}`, '_blank')
  }

  const handleOnlinePurchase = () => {
    if (product) {
      setPaymentModalOpen(true)
    }
  }

  const nextImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev + 1) % product.images!.length)
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev - 1 + product.images!.length) % product.images!.length)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-hogaria-warm to-hogaria-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-hogaria-wine mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Cargando producto...</h2>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-hogaria-warm to-hogaria-beige">
        <Header />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
            <p className="text-gray-600 mb-6">El producto que buscas no existe o ha sido removido.</p>
            <button
              onClick={() => router.push('/#productos')}
              className="btn-primary"
            >
              Ver Productos
            </button>
          </div>
        </div>
        <Footer />
        <AIChat />
        <FloatingWhatsApp />
        <AccessibilityPanel />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hogaria-warm to-hogaria-beige">
      <Header />
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-hogaria-wine transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg cursor-pointer"
                onClick={() => setShowImageModal(true)}
              />
              
              {/* Navigation Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-hogaria-wine' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Product Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-hogaria-wine">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? 'border-hogaria-wine bg-hogaria-wine text-white'
                          : 'border-gray-300 hover:border-hogaria-olive'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Tamaño</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? 'border-hogaria-wine bg-hogaria-wine text-white'
                          : 'border-gray-300 hover:border-hogaria-olive'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cantidad</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleWhatsAppPurchase(product)}
                disabled={product.stock === 0}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <MessageCircle size={20} />
                <span>{product.stock === 0 ? 'Agotado' : 'Comprar por WhatsApp'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOnlinePurchase}
                disabled={product.stock === 0}
                className="w-full btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <CreditCard size={20} />
                <span>{product.stock === 0 ? 'Agotado' : 'Pagar Online'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Heart size={20} />
                <span>Agregar a Favoritos</span>
              </motion.button>
            </div>

            {/* Features */}
            {product.features && (
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Características</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-hogaria-wine rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Truck className="w-8 h-8 text-hogaria-wine mx-auto mb-2" />
                <p className="text-sm font-medium">Envío Gratis</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Shield className="w-8 h-8 text-hogaria-wine mx-auto mb-2" />
                <p className="text-sm font-medium">Garantía</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <RefreshCw className="w-8 h-8 text-hogaria-wine mx-auto mb-2" />
                <p className="text-sm font-medium">Devolución</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        {product.specifications && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Especificaciones</h2>
            <div className="bg-white rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Related Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/producto/${relatedProduct.id}`)}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{relatedProduct.name}</h3>
                    <p className="text-hogaria-wine font-bold">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && product.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
              
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        product={product}
      />
      <Footer />
    </div>
  )
}

export default ProductDetailsPage 
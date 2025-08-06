'use client'

import { motion } from 'framer-motion'
import { Heart, Award, Users, Sparkles } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Hecho con Amor',
      description: 'Cada producto está creado con dedicación y cariño, pensando en tu bienestar'
    },
    {
      icon: Award,
      title: 'Calidad Artesanal',
      description: 'Utilizamos los mejores materiales y técnicas tradicionales'
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Construimos relaciones duraderas con nuestros clientes'
    },
    {
      icon: Sparkles,
      title: 'Magia en los Detalles',
      description: 'Cada pequeño detalle cuenta para crear momentos especiales'
    }
  ]

  const stats = [
    { number: '500+', label: 'Clientes Satisfechos' },
    { number: '3', label: 'Años de Experiencia' },
    { number: '100%', label: 'Artesanal' },
    { number: '24/7', label: 'Atención Personalizada' }
  ]

  return (
    <section id="sobre-nosotros" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-handwriting text-hogaria-wine mb-6">
              Nuestra Historia
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hogaría nació de la pasión por crear espacios cálidos y acogedores. 
              Todo comenzó en un pequeño taller donde cada puntada, cada detalle, 
              se hacía pensando en las familias que disfrutarían de nuestros productos.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Hoy, seguimos manteniendo esa esencia artesanal, pero hemos crecido 
              para llegar a más hogares, llevando la magia de lo hecho a mano a 
              cada rincón de tu casa.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-hogaria-olive/10 rounded-lg flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-hogaria-olive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=800&fit=crop"
                alt="Taller artesanal de Hogaría"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hogaria-wine/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-hogaria-olive/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-hogaria-olive" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Artesanía</h4>
                  <p className="text-sm text-gray-600">Hecho a mano</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                "Cada producto cuenta una historia de dedicación y amor por el hogar"
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-hogaria-beige"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-hogaria-wine mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center bg-gradient-to-r from-hogaria-warm to-hogaria-beige rounded-2xl p-12"
        >
          <h3 className="text-3xl md:text-4xl font-handwriting text-hogaria-wine mb-6">
            Nuestra Misión
          </h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            "Transformar cada hogar en un espacio lleno de calidez, magia y amor, 
            a través de productos artesanales que cuenten historias y creen 
            momentos inolvidables para las familias."
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About 
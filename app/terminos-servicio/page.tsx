'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Clock, Truck, CreditCard } from 'lucide-react'
import Link from 'next/link'

const TerminosServicio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hogaria-warm via-hogaria-crema to-hogaria-beige">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-hogaria-wine hover:text-hogaria-olive transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Volver al inicio</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-hogaria-wine text-white rounded-full mb-6"
            >
              <FileText size={32} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-handwriting text-hogaria-wine mb-4">
              Términos de Servicio
            </h1>
            <p className="text-xl text-gray-600">
              Condiciones claras y transparentes para una experiencia confiable
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Última actualización: {new Date().toLocaleDateString('es-CO')}
            </div>
          </div>

          {/* Content Sections */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4 flex items-center">
                <Scale size={24} className="mr-3" />
                Introducción
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bienvenido a Hogaría. Estos Términos de Servicio rigen el uso de nuestro sitio web y servicios. 
                Al acceder o utilizar nuestros servicios, aceptas estar sujeto a estos términos.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Hogaría es una empresa colombiana dedicada a la venta de productos artesanales para el hogar. 
                Nuestros servicios incluyen la venta online, envíos y atención al cliente.
              </p>
            </section>

            {/* Definiciones */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Definiciones</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-hogaria-warm p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Términos Clave</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li><strong>"Servicios":</strong> Nuestro sitio web y productos</li>
                    <li><strong>"Usuario":</strong> Cualquier persona que use nuestros servicios</li>
                    <li><strong>"Productos":</strong> Artículos artesanales que vendemos</li>
                    <li><strong>"Pedido":</strong> Solicitud de compra de productos</li>
                  </ul>
                </div>
                <div className="bg-hogaria-warm p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Nuestros Valores</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Artesanía auténtica colombiana</li>
                    <li>• Calidad y durabilidad</li>
                    <li>• Atención personalizada</li>
                    <li>• Transparencia en todos los procesos</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Uso del servicio */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Uso del Servicio</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <CheckCircle size={20} className="mr-2 text-green-500" />
                    Uso Permitido
                  </h3>
                  <ul className="text-gray-700 space-y-1 ml-6">
                    <li>• Navegar y explorar nuestros productos</li>
                    <li>• Realizar compras legítimas</li>
                    <li>• Contactarnos para consultas</li>
                    <li>• Compartir experiencias positivas</li>
                  </ul>
                </div>
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <AlertTriangle size={20} className="mr-2 text-red-500" />
                    Uso Prohibido
                  </h3>
                  <ul className="text-gray-700 space-y-1 ml-6">
                    <li>• Uso fraudulento o malicioso</li>
                    <li>• Intentar acceder a sistemas sin autorización</li>
                    <li>• Interferir con el funcionamiento del sitio</li>
                    <li>• Violar derechos de propiedad intelectual</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Proceso de compra */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Proceso de Compra</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-hogaria-wine text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="font-medium text-hogaria-wine mb-2">Selección</h3>
                  <p className="text-sm text-gray-700">Elige los productos que deseas comprar</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-hogaria-wine text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="font-medium text-hogaria-wine mb-2">Confirmación</h3>
                  <p className="text-sm text-gray-700">Confirma tu pedido y datos de envío</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-hogaria-wine text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="font-medium text-hogaria-wine mb-2">Entrega</h3>
                  <p className="text-sm text-gray-700">Recibe tus productos en la puerta</p>
                </div>
              </div>
            </section>

            {/* Precios y pagos */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4 flex items-center">
                <CreditCard size={24} className="mr-3" />
                Precios y Pagos
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">Información de Precios</h3>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Todos los precios están en pesos colombianos (COP)</li>
                    <li>• Los precios incluyen IVA cuando aplique</li>
                    <li>• Los costos de envío se calculan al finalizar la compra</li>
                    <li>• Nos reservamos el derecho de cambiar precios sin previo aviso</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-green-800 mb-3">Métodos de Pago</h3>
                  <ul className="text-green-700 space-y-2">
                    <li>• Transferencia bancaria</li>
                    <li>• Pago contra entrega (solo Colombia)</li>
                    <li>• Tarjetas de crédito y débito</li>
                    <li>• Pagos digitales (PSE, Nequi, Daviplata)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Envíos */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4 flex items-center">
                <Truck size={24} className="mr-3" />
                Política de Envíos
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-hogaria-beige rounded-xl p-6">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Envíos en Colombia</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Envío gratuito en Bogotá (pedidos superiores a $100,000)</li>
                    <li>• Envío a otras ciudades: 2-5 días hábiles</li>
                    <li>• Zonas remotas: 5-10 días hábiles</li>
                    <li>• Seguimiento en tiempo real</li>
                  </ul>
                </div>
                <div className="border border-hogaria-beige rounded-xl p-6">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Envíos Internacionales</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Disponible para España y otros países</li>
                    <li>• Tiempo de entrega: 7-15 días hábiles</li>
                    <li>• Costos de envío calculados según destino</li>
                    <li>• Documentación aduanera incluida</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Devoluciones */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Política de Devoluciones</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-yellow-800 mb-3">Condiciones de Devolución</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">Productos Elegibles</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Productos en su empaque original</li>
                      <li>• Sin señales de uso</li>
                      <li>• Dentro de los 15 días de recepción</li>
                      <li>• Con factura o comprobante</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">Productos No Elegibles</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Productos personalizados</li>
                      <li>• Productos de higiene personal</li>
                      <li>• Productos dañados por el cliente</li>
                      <li>• Productos de temporada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Garantías */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Garantías</h2>
              <div className="space-y-4">
                <div className="border border-hogaria-beige rounded-xl p-6">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Garantía de Calidad</h3>
                  <p className="text-gray-700 mb-3">
                    Todos nuestros productos artesanales están garantizados contra defectos de fabricación. 
                    Si encuentras algún problema, contáctanos dentro de los 30 días de la compra.
                  </p>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Reemplazo gratuito por defectos</li>
                    <li>• Reparación cuando sea posible</li>
                    <li>• Reembolso completo si no podemos solucionar</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limitaciones */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Limitaciones de Responsabilidad</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-red-800 mb-3">Exclusiones</h3>
                <ul className="text-red-700 space-y-2">
                  <li>• No somos responsables por daños indirectos o consecuenciales</li>
                  <li>• Nuestra responsabilidad está limitada al valor del producto</li>
                  <li>• No cubrimos daños por uso inadecuado</li>
                  <li>• No garantizamos disponibilidad continua de productos</li>
                </ul>
              </div>
            </section>

            {/* Propiedad intelectual */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Propiedad Intelectual</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Todo el contenido de nuestro sitio web, incluyendo textos, imágenes, logos y diseños, 
                es propiedad exclusiva de Hogaría y está protegido por las leyes de propiedad intelectual.
              </p>
              <div className="bg-hogaria-warm p-6 rounded-xl">
                <h3 className="text-lg font-medium text-hogaria-wine mb-3">Uso Permitido</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Navegar y usar el sitio para compras personales</li>
                  <li>• Compartir enlaces a nuestros productos</li>
                  <li>• Usar imágenes para reseñas honestas</li>
                </ul>
              </div>
            </section>

            {/* Modificaciones */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4 flex items-center">
                <Clock size={24} className="mr-3" />
                Modificaciones de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán 
                en vigor inmediatamente después de su publicación en el sitio web. Te recomendamos revisar 
                periódicamente estos términos para estar al tanto de cualquier cambio.
              </p>
            </section>

            {/* Ley aplicable */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Ley Aplicable</h2>
              <div className="bg-hogaria-warm p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será 
                  resuelta en los tribunales competentes de Bogotá, Colombia, salvo que la ley establezca 
                  jurisdicción diferente.
                </p>
              </div>
            </section>

            {/* Contacto */}
            <section className="bg-hogaria-warm p-8 rounded-xl text-center">
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">¿Tienes Dudas?</h2>
              <p className="text-gray-700 mb-6">
                Si tienes alguna pregunta sobre estos términos o necesitas aclaración sobre algún punto, 
                no dudes en contactarnos.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@hogaria.com</p>
                <p><strong>WhatsApp:</strong> +57 300 000 0000</p>
                <p><strong>Dirección:</strong> Bogotá, Colombia</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TerminosServicio 
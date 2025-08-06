'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Cookie, Settings, Shield, Eye, Clock, Database, Smartphone } from 'lucide-react'
import Link from 'next/link'

const PoliticaCookies = () => {
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
              <Cookie size={32} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-handwriting text-hogaria-wine mb-4">
              Política de Cookies
            </h1>
            <p className="text-xl text-gray-600">
              Información transparente sobre cómo utilizamos las cookies para mejorar tu experiencia
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
                <Eye size={24} className="mr-3" />
                ¿Qué son las Cookies?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computadora, 
                tablet o smartphone) cuando visitas nuestro sitio web. Estas cookies nos ayudan a mejorar 
                tu experiencia de navegación y a proporcionarte un servicio más personalizado.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-blue-800 mb-3">¿Por qué usamos cookies?</h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• Mejorar la funcionalidad del sitio web</li>
                  <li>• Recordar tus preferencias</li>
                  <li>• Analizar el tráfico del sitio</li>
                  <li>• Proporcionar contenido personalizado</li>
                </ul>
              </div>
            </section>

            {/* Tipos de cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Tipos de Cookies que Utilizamos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                  <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                    <Shield size={20} className="mr-2" />
                    Cookies Esenciales
                  </h3>
                  <p className="text-green-700 text-sm mb-3">
                    Estas cookies son necesarias para el funcionamiento básico del sitio web.
                  </p>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Autenticación de usuarios</li>
                    <li>• Carrito de compras</li>
                    <li>• Preferencias de idioma</li>
                    <li>• Seguridad del sitio</li>
                  </ul>
                </div>
                <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                  <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                    <Settings size={20} className="mr-2" />
                    Cookies de Funcionalidad
                  </h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Mejoran tu experiencia recordando tus preferencias.
                  </p>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Configuración de país/región</li>
                    <li>• Preferencias de moneda</li>
                    <li>• Historial de productos vistos</li>
                    <li>• Configuración de accesibilidad</li>
                  </ul>
                </div>
                <div className="border border-yellow-200 rounded-xl p-6 bg-yellow-50">
                  <h3 className="text-lg font-medium text-yellow-800 mb-3 flex items-center">
                    <Database size={20} className="mr-2" />
                    Cookies de Rendimiento
                  </h3>
                  <p className="text-yellow-700 text-sm mb-3">
                    Nos ayudan a entender cómo utilizas nuestro sitio.
                  </p>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Análisis de tráfico</li>
                    <li>• Páginas más visitadas</li>
                    <li>• Tiempo de permanencia</li>
                    <li>• Errores del sitio</li>
                  </ul>
                </div>
                <div className="border border-purple-200 rounded-xl p-6 bg-purple-50">
                  <h3 className="text-lg font-medium text-purple-800 mb-3 flex items-center">
                    <Smartphone size={20} className="mr-2" />
                    Cookies de Marketing
                  </h3>
                  <p className="text-purple-700 text-sm mb-3">
                    Utilizadas para mostrar contenido relevante.
                  </p>
                  <ul className="text-purple-700 space-y-1 text-sm">
                    <li>• Publicidad personalizada</li>
                    <li>• Redes sociales</li>
                    <li>• Análisis de campañas</li>
                    <li>• Recomendaciones</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies específicas */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Cookies Específicas de Hogaría</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-hogaria-beige">
                  <thead>
                    <tr className="bg-hogaria-warm">
                      <th className="border border-hogaria-beige p-3 text-left text-hogaria-wine font-medium">Cookie</th>
                      <th className="border border-hogaria-beige p-3 text-left text-hogaria-wine font-medium">Propósito</th>
                      <th className="border border-hogaria-beige p-3 text-left text-hogaria-wine font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-hogaria-beige p-3 text-sm">hogaria_session</td>
                      <td className="border border-hogaria-beige p-3 text-sm">Mantener tu sesión activa</td>
                      <td className="border border-hogaria-beige p-3 text-sm">Sesión</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-hogaria-beige p-3 text-sm">hogaria_country</td>
                      <td className="border border-hogaria-beige p-3 text-sm">Recordar tu país seleccionado</td>
                      <td className="border border-hogaria-beige p-3 text-sm">1 año</td>
                    </tr>
                    <tr>
                      <td className="border border-hogaria-beige p-3 text-sm">hogaria_currency</td>
                      <td className="border border-hogaria-beige p-3 text-sm">Recordar tu moneda preferida</td>
                      <td className="border border-hogaria-beige p-3 text-sm">1 año</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-hogaria-beige p-3 text-sm">hogaria_cart</td>
                      <td className="border border-hogaria-beige p-3 text-sm">Guardar productos en carrito</td>
                      <td className="border border-hogaria-beige p-3 text-sm">30 días</td>
                    </tr>
                    <tr>
                      <td className="border border-hogaria-beige p-3 text-sm">hogaria_favorites</td>
                      <td className="border border-hogaria-beige p-3 text-sm">Guardar productos favoritos</td>
                      <td className="border border-hogaria-beige p-3 text-sm">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookies de terceros */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Cookies de Terceros</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                También utilizamos servicios de terceros que pueden establecer cookies en tu dispositivo. 
                Estos servicios nos ayudan a mejorar nuestro sitio web y proporcionar mejores servicios.
              </p>
              <div className="space-y-4">
                <div className="border border-hogaria-beige rounded-xl p-6">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Google Analytics</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Utilizamos Google Analytics para analizar el tráfico de nuestro sitio web y entender 
                    cómo los usuarios interactúan con nuestro contenido.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• _ga: 2 años - Distinguir usuarios únicos</li>
                    <li>• _gid: 24 horas - Distinguir usuarios</li>
                    <li>• _gat: 1 minuto - Limitar la tasa de solicitudes</li>
                  </ul>
                </div>
                <div className="border border-hogaria-beige rounded-xl p-6">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">WhatsApp Business</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Utilizamos cookies de WhatsApp para mejorar la funcionalidad del chat y botón de contacto.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Mejorar la experiencia del chat</li>
                    <li>• Recordar preferencias de contacto</li>
                    <li>• Analizar interacciones del chat</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Gestión de cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Cómo Gestionar las Cookies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-hogaria-warm p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Configuración del Navegador</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Puedes configurar tu navegador para rechazar todas las cookies o para que te avise 
                    cuando se envíe una cookie.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Chrome: Configuración > Privacidad y seguridad</li>
                    <li>• Firefox: Opciones > Privacidad y seguridad</li>
                    <li>• Safari: Preferencias > Privacidad</li>
                    <li>• Edge: Configuración > Cookies y permisos</li>
                  </ul>
                </div>
                <div className="bg-hogaria-warm p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Panel de Control</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Utiliza nuestro panel de control de cookies para gestionar tus preferencias 
                    de forma fácil y transparente.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Activar/desactivar por categoría</li>
                    <li>• Configuración granular</li>
                    <li>• Cambios en tiempo real</li>
                    <li>• Información detallada</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Consecuencias de desactivar */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Consecuencias de Desactivar Cookies</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-yellow-800 mb-3">¿Qué pasa si desactivas las cookies?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">Funcionalidad Limitada</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• No podrás iniciar sesión</li>
                      <li>• El carrito no funcionará</li>
                      <li>• No se recordarán tus preferencias</li>
                      <li>• Algunas funciones no estarán disponibles</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">Experiencia Reducida</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Contenido menos personalizado</li>
                      <li>• Necesitarás configurar todo cada vez</li>
                      <li>• No podremos mejorar el sitio</li>
                      <li>• Algunos enlaces pueden no funcionar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Actualizaciones */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4 flex items-center">
                <Clock size={24} className="mr-3" />
                Actualizaciones de esta Política
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esta Política de Cookies puede actualizarse ocasionalmente para reflejar cambios en nuestras 
                prácticas o por otras razones operativas, legales o regulatorias.
              </p>
              <div className="bg-hogaria-warm p-6 rounded-xl">
                <h3 className="text-lg font-medium text-hogaria-wine mb-3">Notificaciones de Cambios</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Te notificaremos sobre cambios significativos</li>
                  <li>• La fecha de última actualización se mostrará en la parte superior</li>
                  <li>• Te recomendamos revisar esta política periódicamente</li>
                  <li>• El uso continuado del sitio constituye aceptación de los cambios</li>
                </ul>
              </div>
            </section>

            {/* Información adicional */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Información Adicional</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-hogaria-beige rounded-xl p-6">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Datos Personales</h3>
                  <p className="text-gray-700 text-sm">
                    Algunas cookies pueden recopilar información personal. Para más detalles sobre cómo 
                    manejamos esta información, consulta nuestra Política de Privacidad.
                  </p>
                </div>
                <div className="border border-hogaria-beige rounded-xl p-6">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Cumplimiento Legal</h3>
                  <p className="text-gray-700 text-sm">
                    Nuestro uso de cookies cumple con las regulaciones de protección de datos aplicables, 
                    incluyendo el GDPR y las leyes colombianas de protección de datos.
                  </p>
                </div>
              </div>
            </section>

            {/* Contacto */}
            <section className="bg-hogaria-warm p-8 rounded-xl text-center">
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">¿Tienes Preguntas sobre Cookies?</h2>
              <p className="text-gray-700 mb-6">
                Si tienes alguna pregunta sobre nuestra Política de Cookies o sobre cómo gestionamos 
                las cookies en nuestro sitio web, no dudes en contactarnos.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> cookies@hogaria.com</p>
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

export default PoliticaCookies 
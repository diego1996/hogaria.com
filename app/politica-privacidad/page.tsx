'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Users, Database } from 'lucide-react'
import Link from 'next/link'

const PoliticaPrivacidad = () => {
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
              <Shield size={32} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-handwriting text-hogaria-wine mb-4">
              Política de Privacidad
            </h1>
            <p className="text-xl text-gray-600">
              Protegemos tu información personal con el mayor cuidado y transparencia
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
                Introducción
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                En Hogaría, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, 
                utilizamos, almacenamos y protegemos tu información personal cuando visitas nuestro sitio web o utilizas 
                nuestros servicios.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política. Si no estás de acuerdo 
                con alguna parte de esta política, te recomendamos que no utilices nuestros servicios.
              </p>
            </section>

            {/* Información que recopilamos */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4 flex items-center">
                <Database size={24} className="mr-3" />
                Información que Recopilamos
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Información Personal</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Nombre completo y apellidos</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Dirección de envío</li>
                    <li>Información de pago (procesada de forma segura)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Información Automática</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Dirección IP y ubicación geográfica</li>
                    <li>Tipo de navegador y dispositivo</li>
                    <li>Páginas visitadas y tiempo de permanencia</li>
                    <li>Cookies y tecnologías similares</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cómo utilizamos tu información */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4 flex items-center">
                <Users size={24} className="mr-3" />
                Cómo Utilizamos tu Información
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-hogaria-warm p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Procesamiento de Pedidos</h3>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Confirmar y procesar tus compras</li>
                    <li>• Enviar confirmaciones por email</li>
                    <li>• Gestionar envíos y entregas</li>
                    <li>• Proporcionar soporte al cliente</li>
                  </ul>
                </div>
                <div className="bg-hogaria-warm p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-hogaria-wine mb-3">Mejora de Servicios</h3>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Analizar el uso del sitio web</li>
                    <li>• Mejorar nuestros productos</li>
                    <li>• Personalizar tu experiencia</li>
                    <li>• Desarrollar nuevas funcionalidades</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Compartir información */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4 flex items-center">
                <Lock size={24} className="mr-3" />
                Compartir tu Información
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>No vendemos, alquilamos ni compartimos tu información personal</strong> con terceros, excepto en 
                las siguientes circunstancias:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Proveedores de servicios:</strong> Solo compartimos información necesaria con proveedores 
                que nos ayudan a operar nuestro negocio (envío, procesamiento de pagos, etc.)</li>
                <li><strong>Cumplimiento legal:</strong> Podemos divulgar información si es requerido por ley o para 
                proteger nuestros derechos</li>
                <li><strong>Con tu consentimiento:</strong> Solo compartimos información adicional con tu permiso explícito</li>
              </ul>
            </section>

            {/* Seguridad */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Seguridad de Datos</h2>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-green-800 mb-3">Protegemos tu Información</h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Utilizamos encriptación SSL para proteger las transmisiones de datos</li>
                  <li>• Implementamos medidas de seguridad técnicas y organizativas</li>
                  <li>• Acceso limitado a información personal solo a personal autorizado</li>
                  <li>• Monitoreo regular de nuestros sistemas de seguridad</li>
                </ul>
              </div>
            </section>

            {/* Tus derechos */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Tus Derechos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-hogaria-beige rounded-lg p-4">
                  <h3 className="font-medium text-hogaria-wine mb-2">Acceso y Corrección</h3>
                  <p className="text-sm text-gray-700">Puedes acceder, corregir o actualizar tu información personal en cualquier momento.</p>
                </div>
                <div className="border border-hogaria-beige rounded-lg p-4">
                  <h3 className="font-medium text-hogaria-wine mb-2">Eliminación</h3>
                  <p className="text-sm text-gray-700">Puedes solicitar la eliminación de tu información personal de nuestros registros.</p>
                </div>
                <div className="border border-hogaria-beige rounded-lg p-4">
                  <h3 className="font-medium text-hogaria-wine mb-2">Portabilidad</h3>
                  <p className="text-sm text-gray-700">Puedes solicitar una copia de tus datos en formato legible.</p>
                </div>
                <div className="border border-hogaria-beige rounded-lg p-4">
                  <h3 className="font-medium text-hogaria-wine mb-2">Oposición</h3>
                  <p className="text-sm text-gray-700">Puedes oponerte al procesamiento de tus datos en ciertas circunstancias.</p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Cookies y Tecnologías Similares</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. 
                Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.
              </p>
              <div className="bg-hogaria-warm p-6 rounded-xl">
                <h3 className="text-lg font-medium text-hogaria-wine mb-3">Tipos de Cookies que Utilizamos</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio</li>
                  <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo utilizas el sitio</li>
                  <li><strong>Cookies de funcionalidad:</strong> Mejoran tu experiencia recordando tus preferencias</li>
                </ul>
              </div>
            </section>

            {/* Cambios en la política */}
            <section>
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">Cambios en esta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cualquier cambio 
                significativo a través de nuestro sitio web o por correo electrónico. Te recomendamos revisar esta 
                política periódicamente.
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-hogaria-warm p-8 rounded-xl text-center">
              <h2 className="text-2xl font-semibold text-hogaria-wine mb-4">¿Tienes Preguntas?</h2>
              <p className="text-gray-700 mb-6">
                Si tienes alguna pregunta sobre esta Política de Privacidad o sobre cómo manejamos tu información, 
                no dudes en contactarnos.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacidad@hogaria.com</p>
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

export default PoliticaPrivacidad 
# 🏠 Hogaría - E-commerce Artesanal

**Detalles que abrazan tu hogar**

Un website moderno y hermoso para promocionar y vender productos artesanales para el hogar a través de WhatsApp, con integración preparada para n8n webhooks.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz elegante y acogedora con los colores de Hogaría
- 📱 **Responsive**: Optimizado para todos los dispositivos
- 💬 **Integración WhatsApp**: Ventas directas por WhatsApp Business
- 🎯 **SEO Optimizado**: Meta tags y estructura para mejor posicionamiento
- ⚡ **Performance**: Carga rápida con Next.js y optimizaciones
- 🔗 **Preparado para n8n**: Webhooks listos para automatización
- 🎭 **Animaciones**: Transiciones suaves con Framer Motion
- 🛍️ **Catálogo Interactivo**: Filtros por categorías y favoritos

## 🚀 Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **Headless UI** - Componentes accesibles

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/hogaria-website.git
   cd hogaria-website
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local`:
   ```env
   NEXT_PUBLIC_WHATSAPP_PHONE=+34600000000
   NEXT_PUBLIC_EMAIL=hola@hogaria.com
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/hogaria
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🎨 Personalización

### Colores de la Marca

Los colores están definidos en `tailwind.config.js`:

```javascript
colors: {
  'hogaria': {
    'beige': '#F5F5DC',      // Beige cálido
    'crema': '#FFFDD0',      // Crema suave
    'olive': '#6B8E23',      // Verde oliva
    'wine': '#722F37',       // Rojo vino
    'warm': '#FDF6E3',       // Fondo cálido
    'accent': '#D4A574',     // Acento dorado
  }
}
```

### Fuentes

- **Dancing Script**: Para títulos y elementos destacados
- **Inter**: Para texto general y navegación

### Configurar WhatsApp

1. Actualizar el número en todos los componentes:
   - `components/Hero.tsx`
   - `components/Products.tsx`
   - `components/Collections.tsx`
   - `components/Contact.tsx`
   - `components/Footer.tsx`

2. O usar la variable de entorno:
   ```javascript
   const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+34600000000'
   ```

## 🔗 Integración con n8n

### Webhook para Contacto

El formulario de contacto está preparado para enviar datos a n8n:

```javascript
// En components/Contact.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Enviar a n8n webhook
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact_form',
          data: formData,
          timestamp: new Date().toISOString()
        })
      })
    } catch (error) {
      console.error('Error sending to webhook:', error)
    }
  }
  
  // También enviar por WhatsApp como respaldo
  const message = encodeURIComponent(
    `Nuevo mensaje de contacto:\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\nMensaje: ${formData.message}`
  )
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
}
```

### Flujo de n8n Recomendado

1. **Webhook Trigger** - Recibir datos del formulario
2. **WhatsApp Node** - Enviar notificación al vendedor
3. **Email Node** - Enviar confirmación al cliente
4. **CRM Integration** - Guardar lead en base de datos
5. **Follow-up** - Programar seguimiento automático

## 📱 Productos y Categorías

### Categorías Actuales

- **Sábanas** - Sábanas de algodón, seda, etc.
- **Almohadas** - Almohadas decorativas y funcionales
- **Navidad** - Decoraciones navideñas artesanales
- **Manteles** - Manteles y servilletas bordadas
- **Decoración** - Cojines y elementos decorativos

### Agregar Nuevos Productos

Editar el array `products` en `components/Products.tsx`:

```javascript
const products: Product[] = [
  {
    id: 7,
    name: 'Nuevo Producto',
    category: 'sabanas',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-...',
    description: 'Descripción del producto',
    rating: 4.8,
    reviews: 50,
    isNew: true
  }
]
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Netlify

1. Conectar repositorio a Netlify
2. Configurar build command: `npm run build`
3. Configurar publish directory: `.next`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Analytics y SEO

### Google Analytics

Agregar en `app/layout.tsx`:

```javascript
// Google Analytics
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

### Meta Tags

Los meta tags están configurados en `app/layout.tsx` para SEO óptimo.

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

- **Email**: hola@hogaria.com
- **WhatsApp**: +34 600 000 000
- **Website**: https://hogaria.com

---

**Hogaría** - Detalles que abrazan tu hogar 🏠✨ 
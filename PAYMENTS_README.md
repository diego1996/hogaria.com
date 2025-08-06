# Integración de Pagos con Wompi - Hogaría

## Descripción

Este proyecto incluye una integración completa con Wompi para procesar pagos online de productos artesanales. Los clientes pueden realizar compras directamente desde el sitio web usando tarjetas de crédito/débito.

## Características Implementadas

### ✅ Funcionalidades Completadas

1. **Modal de Pago Integrado**
   - Formulario completo de datos del cliente
   - Validación de campos requeridos
   - Interfaz moderna y responsiva
   - Integración con el componente de productos

2. **API Endpoints**
   - `/api/wompi` - Crear transacciones
   - `/api/wompi/webhook` - Manejar notificaciones de Wompi
   - Verificación de estado de transacciones

3. **Página de Confirmación**
   - `/pago/confirmacion` - Mostrar resultado del pago
   - Estados: exitoso, pendiente, rechazado, error
   - Detalles completos de la transacción

4. **Integración con Productos**
   - Botón "Pagar Online" en cada producto
   - Mantiene opción de WhatsApp como alternativa
   - Modal se abre con datos del producto seleccionado

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Wompi Configuration
WOMPI_PUBLIC_KEY=pub_test_tu_clave_publica
WOMPI_PRIVATE_KEY=prv_test_tu_clave_privada
WOMPI_WEBHOOK_SECRET=tu_webhook_secret

# Base URL for redirects
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Credenciales de Wompi

1. Regístrate en [Wompi](https://wompi.co)
2. Accede al dashboard de desarrollador
3. Obtén tus claves públicas y privadas
4. Configura el webhook URL: `https://tu-dominio.com/api/wompi/webhook`

### 3. Configuración de Webhooks

En el dashboard de Wompi, configura el webhook con:
- **URL**: `https://tu-dominio.com/api/wompi/webhook`
- **Eventos**: `transaction.created`, `transaction.updated`, `transaction.paid`, `transaction.declined`, `transaction.error`

## Flujo de Pago

### 1. Cliente Selecciona Producto
- Hace clic en "Pagar Online"
- Se abre el modal de pago

### 2. Completa Formulario
- Datos personales (nombre, email, teléfono, documento)
- Dirección de envío
- Validación en tiempo real

### 3. Procesamiento
- Se crea transacción en Wompi
- Cliente es redirigido a Wompi para completar pago
- Se procesa con tarjeta de crédito/débito

### 4. Confirmación
- Cliente regresa a `/pago/confirmacion`
- Se muestra estado del pago
- Webhook actualiza estado en backend

## Estructura de Archivos

```
app/
├── api/
│   └── wompi/
│       ├── route.ts              # Endpoint principal
│       └── webhook/
│           └── route.ts          # Webhook handler
└── pago/
    └── confirmacion/
        └── page.tsx              # Página de confirmación

components/
├── Products.tsx                  # Componente de productos (modificado)
└── PaymentModal.tsx              # Modal de pago
```

## Personalización

### Modificar Campos del Formulario

En `components/PaymentModal.tsx`, puedes agregar o quitar campos:

```typescript
interface CustomerData {
  name: string
  email: string
  phone: string
  document: string
  documentType: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  // Agregar nuevos campos aquí
}
```

### Cambiar Validaciones

Modifica la función `validateForm()` en el modal:

```typescript
const validateForm = () => {
  // Agregar tus validaciones personalizadas
  const required = ['name', 'email', 'phone', 'document', 'address', 'city', 'state', 'postalCode']
  // ... resto de validaciones
}
```

### Personalizar Estados de Pago

En `app/pago/confirmacion/page.tsx`, puedes modificar los mensajes:

```typescript
const getStatusInfo = () => {
  switch (txStatus) {
    case 'APPROVED':
      return {
        title: '¡Tu mensaje personalizado!',
        message: 'Descripción personalizada del éxito'
      }
    // ... otros casos
  }
}
```

## Seguridad

### Implementado

- ✅ Validación de firma de webhooks
- ✅ Validación de campos del formulario
- ✅ Manejo seguro de errores
- ✅ Encriptación SSL para datos sensibles

### Recomendaciones Adicionales

1. **Rate Limiting**: Implementar límites de intentos de pago
2. **Fraude**: Integrar servicios de detección de fraude
3. **Logs**: Implementar logging detallado de transacciones
4. **Backup**: Crear respaldos de datos de transacciones

## Testing

### Ambiente de Pruebas

1. Usa las credenciales de sandbox de Wompi
2. Prueba con tarjetas de prueba:
   - **Aprobada**: 4242 4242 4242 4242
   - **Rechazada**: 4000 0000 0000 0002
   - **Pendiente**: 4000 0000 0000 9995

### Flujo de Prueba

1. Selecciona un producto
2. Completa el formulario con datos de prueba
3. Usa una tarjeta de prueba
4. Verifica la confirmación
5. Revisa los logs del webhook

## Producción

### Checklist de Despliegue

- [ ] Cambiar a credenciales de producción
- [ ] Configurar webhook en producción
- [ ] Verificar SSL/HTTPS
- [ ] Configurar monitoreo de transacciones
- [ ] Probar flujo completo en producción

### Monitoreo

Implementa alertas para:
- Transacciones fallidas
- Errores de webhook
- Tiempo de respuesta de API
- Volumen de transacciones

## Soporte

Para problemas con la integración:

1. Revisa los logs del servidor
2. Verifica las credenciales de Wompi
3. Confirma la configuración del webhook
4. Contacta soporte de Wompi si es necesario

## Próximas Mejoras

- [ ] Integración con carrito de compras
- [ ] Múltiples métodos de pago
- [ ] Cupones y descuentos
- [ ] Facturación automática
- [ ] Reportes de ventas
- [ ] Integración con sistemas de inventario 
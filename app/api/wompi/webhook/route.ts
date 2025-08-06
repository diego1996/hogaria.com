import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Configuración de Wompi
const WOMPI_WEBHOOK_SECRET = process.env.WOMPI_WEBHOOK_SECRET || 'webhook_secret_123'

interface WompiWebhookEvent {
  event: string
  data: {
    id: string
    status: string
    amount_in_cents: number
    currency: string
    reference: string
    customer_email: string
    created_at: string
    finalized_at?: string
    payment_method: {
      type: string
      installments: number
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-signature') || ''

    // Verificar la firma del webhook (seguridad)
    const expectedSignature = crypto
      .createHmac('sha256', WOMPI_WEBHOOK_SECRET)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      console.error('Firma de webhook inválida')
      return NextResponse.json(
        { error: 'Firma inválida' },
        { status: 401 }
      )
    }

    const event: WompiWebhookEvent = JSON.parse(body)

    // Procesar diferentes tipos de eventos
    switch (event.event) {
      case 'transaction.created':
        console.log('Transacción creada:', event.data.id)
        // Aquí podrías actualizar el estado en tu base de datos
        break

      case 'transaction.updated':
        console.log('Transacción actualizada:', event.data.id)
        // Actualizar estado de la transacción
        break

      case 'transaction.paid':
        console.log('Transacción pagada:', event.data.id)
        // Procesar pago exitoso
        await processSuccessfulPayment(event.data)
        break

      case 'transaction.declined':
        console.log('Transacción rechazada:', event.data.id)
        // Procesar pago rechazado
        await processFailedPayment(event.data)
        break

      case 'transaction.error':
        console.log('Error en transacción:', event.data.id)
        // Procesar error en transacción
        await processFailedPayment(event.data)
        break

      default:
        console.log('Evento no manejado:', event.event)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error procesando webhook:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

async function processSuccessfulPayment(transactionData: any) {
  try {
    // Aquí implementarías la lógica para:
    // 1. Actualizar el inventario
    // 2. Enviar confirmación por email
    // 3. Crear orden en tu sistema
    // 4. Notificar al cliente

    console.log('Procesando pago exitoso para transacción:', transactionData.id)
    
    // Ejemplo: Enviar email de confirmación
    // await sendOrderConfirmationEmail(transactionData.customer_email, transactionData)
    
    // Ejemplo: Actualizar inventario
    // await updateProductStock(transactionData.reference)
    
  } catch (error) {
    console.error('Error procesando pago exitoso:', error)
  }
}

async function processFailedPayment(transactionData: any) {
  try {
    // Aquí implementarías la lógica para:
    // 1. Notificar al cliente sobre el error
    // 2. Liberar el inventario reservado
    // 3. Registrar el intento fallido

    console.log('Procesando pago fallido para transacción:', transactionData.id)
    
    // Ejemplo: Enviar email de error
    // await sendPaymentErrorEmail(transactionData.customer_email, transactionData)
    
  } catch (error) {
    console.error('Error procesando pago fallido:', error)
  }
} 
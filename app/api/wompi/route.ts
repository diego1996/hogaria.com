import { NextRequest, NextResponse } from 'next/server'

// Configuración de Wompi
const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY || 'pub_test_1234567890'
const WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY || 'prv_test_1234567890'
const WOMPI_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://production.wompi.co/v1' 
  : 'https://sandbox.wompi.co/v1'

interface PaymentRequest {
  productId: number
  productName: string
  amount: number
  currency: string
  customerEmail: string
  customerName: string
  customerPhone: string
  customerDocument: string
  customerDocumentType: string
  shippingAddress?: {
    address: string
    city: string
    state: string
    country: string
    postalCode: string
  }
}

interface WompiTransaction {
  id: string
  amount_in_cents: number
  currency: string
  reference: string
  public_key: string
  redirect_url: string
  customer_email: string
  customer_data: {
    phone_number: string
    full_name: string
  }
  shipping_address?: {
    address_line_1: string
    city: string
    region: string
    country: string
    postal_code: string
  }
  payment_method: {
    type: string
    installments: number
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()
    
    // Validar datos requeridos
    if (!body.productId || !body.amount || !body.customerEmail || !body.customerName) {
      return NextResponse.json(
        { error: 'Datos requeridos faltantes' },
        { status: 400 }
      )
    }

    // Crear transacción en Wompi
    const wompiTransaction: WompiTransaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount_in_cents: body.amount * 100, // Wompi usa centavos
      currency: body.currency || 'COP',
      reference: `HOGARIA_${body.productId}_${Date.now()}`,
      public_key: WOMPI_PUBLIC_KEY,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pago/confirmacion`,
      customer_email: body.customerEmail,
      customer_data: {
        phone_number: body.customerPhone,
        full_name: body.customerName
      },
      payment_method: {
        type: 'CARD',
        installments: 1
      }
    }

    // Agregar dirección de envío si está disponible
    if (body.shippingAddress) {
      wompiTransaction.shipping_address = {
        address_line_1: body.shippingAddress.address,
        city: body.shippingAddress.city,
        region: body.shippingAddress.state,
        country: body.shippingAddress.country,
        postal_code: body.shippingAddress.postalCode
      }
    }

    // Crear la transacción en Wompi
    const response = await fetch(`${WOMPI_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WOMPI_PRIVATE_KEY}`
      },
      body: JSON.stringify(wompiTransaction)
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error en Wompi:', errorData)
      return NextResponse.json(
        { error: 'Error al procesar el pago' },
        { status: 500 }
      )
    }

    const transactionData = await response.json()

    return NextResponse.json({
      success: true,
      transaction: transactionData,
      redirect_url: transactionData.data.redirect_url
    })

  } catch (error) {
    console.error('Error en el endpoint de pago:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Endpoint para verificar el estado de una transacción
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get('id')

    if (!transactionId) {
      return NextResponse.json(
        { error: 'ID de transacción requerido' },
        { status: 400 }
      )
    }

    const response = await fetch(`${WOMPI_BASE_URL}/transactions/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${WOMPI_PRIVATE_KEY}`
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Transacción no encontrada' },
        { status: 404 }
      )
    }

    const transactionData = await response.json()

    return NextResponse.json({
      success: true,
      transaction: transactionData
    })

  } catch (error) {
    console.error('Error al verificar transacción:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 
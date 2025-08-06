import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Aquí se integraría con n8n webhook
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'contact_form',
            data: { name, email, phone, message },
            timestamp: new Date().toISOString()
          })
        })

        if (!response.ok) {
          console.error('Error sending to webhook:', response.statusText)
        }
      } catch (error) {
        console.error('Error sending to webhook:', error)
      }
    }

    // Respuesta exitosa
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 
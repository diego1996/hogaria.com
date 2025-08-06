import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationId, timestamp } = body

    // Validación básica
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    // Preparar datos para enviar a n8n
    const n8nPayload = {
      type: 'ai_chat',
      message: message.trim(),
      conversationId: conversationId || 'hogaria-chat',
      timestamp: timestamp || new Date().toISOString(),
      source: 'hogaria-website',
      userAgent: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || request.ip || 'unknown'
    }

    // Enviar a n8n webhook si está configurado
    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    let aiResponse = null

    if (n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(n8nPayload)
        })

        if (n8nResponse.ok) {
          const n8nData = await n8nResponse.json()
          aiResponse = n8nData.response || n8nData.message
        }
      } catch (error) {
        console.error('Error connecting to n8n:', error)
        // Continuar con respuesta local si n8n falla
      }
    }

    // Si no hay respuesta de n8n, usar respuestas locales amorosas
    if (!aiResponse) {
      const localResponses = {
        // Productos
        'productos': [
          '¡Con mucho amor te cuento sobre nuestros productos! 💕 Tenemos sábanas artesanales, almohadas decorativas, muñecos navideños hechos a mano, manteles bordados y mucho más. ¿Te gustaría que te muestre algo específico? 🌸',
          'Nuestros productos están hechos con amor y dedicación artesanal. Tenemos sábanas de algodón suaves, almohadas decorativas únicas, muñecos navideños que alegran cualquier hogar, y manteles que transforman tu mesa. ¿Qué te interesa más? ✨'
        ],
        'sábanas': [
          '¡Nuestras sábanas son puro amor! 💕 Están hechas de algodón 100% natural, suaves como una caricia. Tenemos varios tamaños y colores cálidos que harán que tu cama sea el lugar más acogedor de tu hogar. ¿Te gustaría ver nuestros diseños? 🌸',
          'Las sábanas de Hogaría son como un abrazo para tu cama 💖 Hechas a mano con los mejores materiales, suaves y duraderas. Tenemos desde individual hasta king size, en colores que transmiten calidez y paz. ¿Cuál es tu tamaño preferido? ✨'
        ],
        'almohadas': [
          '¡Nuestras almohadas decorativas son pura magia! ✨ Cada una está hecha a mano con amor, perfectas para darle ese toque especial a tu sofá o cama. Tenemos diseños únicos que cuentan historias y crean ambientes acogedores. ¿Te gustaría ver nuestra colección? 💕',
          'Las almohadas de Hogaría son como pequeños abrazos para tu hogar 💖 Hechas con materiales suaves y diseños únicos, cada una tiene su propia personalidad. Perfectas para decorar tu living, dormitorio o cualquier rincón que quieras hacer más cálido. ¿Qué estilo te llama más la atención? 🌸'
        ],
        'navidad': [
          '¡La magia de Navidad llega con nuestros muñecos artesanales! 🎄 Cada uno está hecho a mano con mucho amor, perfectos para decorar tu hogar en estas fechas tan especiales. Tenemos desde pequeños detalles hasta piezas centrales que harán que tu Navidad sea inolvidable. ¿Te gustaría ver nuestra colección navideña? ✨',
          'Nuestros muñecos navideños están llenos de amor y tradición 💕 Hechos a mano con materiales de calidad, cada uno tiene su propia personalidad y magia. Perfectos para crear esa atmósfera cálida y acogedora que hace especial la Navidad. ¿Qué tipo de decoración navideña te gusta más? 🌟'
        ],
        'manteles': [
          '¡Nuestros manteles son pura elegancia artesanal! 🍽️ Cada uno está bordado a mano con diseños únicos que transforman tu mesa en un lugar mágico. Perfectos para comidas especiales o para darle ese toque cálido a tu día a día. ¿Te gustaría ver nuestros diseños? 💕',
          'Los manteles de Hogaría son como abrazos para tu mesa 💖 Hechos con telas de calidad y bordados artesanales, cada uno cuenta una historia. Perfectos para crear momentos especiales en familia o con amigos. ¿Qué estilo de mantel te gusta más? ✨'
        ],
        // Envíos
        'envío': [
          '¡Con mucho amor hacemos llegar nuestros productos hasta tu hogar! 💕 Realizamos envíos a toda España con mucho cuidado y dedicación. Los tiempos de entrega varían entre 2-5 días hábiles, y siempre te mantenemos informado del estado de tu pedido. ¿Te gustaría saber más sobre nuestras opciones de envío? 🌸',
          'Nuestros envíos están llenos de amor y cuidado 💖 Trabajamos con las mejores empresas de transporte para que tus productos lleguen en perfectas condiciones. Tenemos envío estándar (2-5 días) y express (1-2 días). ¿En qué zona vives para darte información más específica? ✨'
        ],
        'envíos': [
          '¡Con mucho amor hacemos llegar nuestros productos hasta tu hogar! 💕 Realizamos envíos a toda España con mucho cuidado y dedicación. Los tiempos de entrega varían entre 2-5 días hábiles, y siempre te mantenemos informado del estado de tu pedido. ¿Te gustaría saber más sobre nuestras opciones de envío? 🌸',
          'Nuestros envíos están llenos de amor y cuidado 💖 Trabajamos con las mejores empresas de transporte para que tus productos lleguen en perfectas condiciones. Tenemos envío estándar (2-5 días) y express (1-2 días). ¿En qué zona vives para darte información más específica? ✨'
        ],
        // Personalización
        'personalizar': [
          '¡Nos encanta crear productos únicos para ti! 💕 Sí, ofrecemos personalización en muchos de nuestros productos. Puedes elegir colores, tamaños, y en algunos casos hasta agregar iniciales o diseños especiales. Cada pieza personalizada se hace con amor y dedicación extra. ¿Qué te gustaría personalizar? ✨',
          '¡La personalización es nuestra especialidad! 💖 Nos encanta crear productos que sean únicos para cada cliente. Podemos personalizar sábanas, almohadas, manteles y más. Cada pieza personalizada se hace a mano con amor y atención a los detalles. ¿Qué producto te gustaría hacer único? 🌸'
        ],
        'personalización': [
          '¡Nos encanta crear productos únicos para ti! 💕 Sí, ofrecemos personalización en muchos de nuestros productos. Puedes elegir colores, tamaños, y en algunos casos hasta agregar iniciales o diseños especiales. Cada pieza personalizada se hace con amor y dedicación extra. ¿Qué te gustaría personalizar? ✨',
          '¡La personalización es nuestra especialidad! 💖 Nos encanta crear productos que sean únicos para cada cliente. Podemos personalizar sábanas, almohadas, manteles y más. Cada pieza personalizada se hace a mano con amor y atención a los detalles. ¿Qué producto te gustaría hacer único? 🌸'
        ],
        // Precios
        'precio': [
          '¡Nuestros precios reflejan el amor y la calidad artesanal! 💕 Cada producto tiene un precio justo que incluye materiales de calidad y el trabajo manual dedicado. Los precios varían según el producto y la complejidad del trabajo. ¿Te gustaría que te cuente sobre algún producto específico? 🌸',
          'Los precios de Hogaría están llenos de transparencia y amor 💖 Incluyen materiales de primera calidad y el trabajo artesanal dedicado. Tenemos productos para todos los presupuestos, desde pequeños detalles hasta piezas especiales. ¿Qué producto te interesa para darte información más específica? ✨'
        ],
        'precios': [
          '¡Nuestros precios reflejan el amor y la calidad artesanal! 💕 Cada producto tiene un precio justo que incluye materiales de calidad y el trabajo manual dedicado. Los precios varían según el producto y la complejidad del trabajo. ¿Te gustaría que te cuente sobre algún producto específico? 🌸',
          'Los precios de Hogaría están llenos de transparencia y amor 💖 Incluyen materiales de primera calidad y el trabajo artesanal dedicado. Tenemos productos para todos los presupuestos, desde pequeños detalles hasta piezas especiales. ¿Qué producto te interesa para darte información más específica? ✨'
        ],
        // General
        'default': [
          '¡Qué linda pregunta! 💕 Me encanta ayudarte a encontrar lo que necesitas para hacer tu hogar más cálido y acogedor. ¿Te gustaría que te cuente más sobre nuestros productos artesanales? 🌸',
          '¡Gracias por tu interés en Hogaría! 💖 Somos una empresa artesanal que pone amor en cada producto que creamos. ¿En qué puedo ayudarte hoy? ¿Te interesa conocer nuestros productos, envíos o personalización? ✨',
          '¡Me hace muy feliz ayudarte! 🌺 En Hogaría creamos productos artesanales con mucho amor para hacer tu hogar más cálido y acogedor. ¿Qué te gustaría saber más? ¿Nuestros productos, envíos o servicios de personalización? 💕',
          '¡Qué dulce pregunta! ✨ En Hogaría cada producto está hecho a mano con amor y dedicación. Estamos aquí para ayudarte a encontrar lo perfecto para tu hogar. ¿Qué te gustaría conocer más? 🌸'
        ]
      }

      // Buscar respuesta apropiada basada en palabras clave
      const messageLower = message.toLowerCase()
      let responseCategory = 'default'

      if (messageLower.includes('producto') || messageLower.includes('qué tienen') || messageLower.includes('que tienen')) {
        responseCategory = 'productos'
      } else if (messageLower.includes('sábana') || messageLower.includes('sabana')) {
        responseCategory = 'sábanas'
      } else if (messageLower.includes('almohada')) {
        responseCategory = 'almohadas'
      } else if (messageLower.includes('navidad') || messageLower.includes('navideño')) {
        responseCategory = 'navidad'
      } else if (messageLower.includes('mantel')) {
        responseCategory = 'manteles'
      } else if (messageLower.includes('envío') || messageLower.includes('envio') || messageLower.includes('enviar')) {
        responseCategory = 'envío'
      } else if (messageLower.includes('personalizar') || messageLower.includes('personalización')) {
        responseCategory = 'personalizar'
      } else if (messageLower.includes('precio') || messageLower.includes('cuesta') || messageLower.includes('costo')) {
        responseCategory = 'precio'
      }

      const responses = localResponses[responseCategory as keyof typeof localResponses] || localResponses.default
      aiResponse = responses[Math.floor(Math.random() * responses.length)]
    }

    // Agregar sugerencia de WhatsApp
    const whatsappSuggestion = '\n\n💬 ¿Te gustaría hacer tu pedido o tienes más preguntas? ¡Escríbenos por WhatsApp! Estamos aquí para ayudarte con mucho amor.'

    return NextResponse.json({
      response: aiResponse + whatsappSuggestion,
      conversationId,
      timestamp: new Date().toISOString(),
      source: 'hogaria-ai-chat'
    })

  } catch (error) {
    console.error('Error in AI chat API:', error)
    return NextResponse.json(
      { 
        response: '¡Ups! Algo salió mal, pero no te preocupes 💕. Puedes contactarnos directamente por WhatsApp y te ayudaremos con mucho amor.',
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
} 
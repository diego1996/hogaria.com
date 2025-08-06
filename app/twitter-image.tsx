import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #722F37 0%, #6B8E23 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
          }}
        >
          Hogaría
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#F5F5DC',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Detalles que abrazan tu hogar
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#FFFDD0',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          Productos artesanales para el hogar
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 
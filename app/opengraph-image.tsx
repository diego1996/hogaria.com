import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FDF6E3 0%, #F5F5DC 100%)',
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
            color: '#722F37',
            marginBottom: '20px',
          }}
        >
          Hogaría
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#6B8E23',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Detalles que abrazan tu hogar
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#666',
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
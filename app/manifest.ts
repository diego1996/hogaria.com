import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hogaría - Detalles que abrazan tu hogar',
    short_name: 'Hogaría',
    description: 'Productos artesanales para el hogar: sábanas, almohadas, decoraciones navideñas, manteles y más.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF6E3',
    theme_color: '#722F37',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
} 
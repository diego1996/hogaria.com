import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CountryProvider } from './contexts/CountryContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hogaría - Detalles que abrazan tu hogar',
  description: 'Productos artesanales para el hogar: sábanas, almohadas, decoraciones navideñas, manteles y más. Cada pieza está hecha con amor y dedicación.',
  keywords: 'hogar, artesanal, sábanas, almohadas, decoración, navidad, manteles, manualidades',
  authors: [{ name: 'Hogaría' }],
  openGraph: {
    title: 'Hogaría - Detalles que abrazan tu hogar',
    description: 'Productos artesanales para el hogar hechos con amor y dedicación',
    type: 'website',
    locale: 'es_CO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CountryProvider>
          {children}
        </CountryProvider>
      </body>
    </html>
  )
} 
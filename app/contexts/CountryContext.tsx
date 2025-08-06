'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export interface Country {
  id: string
  name: string
  flag: string
  currency: string
  symbol: string
  exchangeRate: number // Tasa de cambio desde COP
}

export const countries: Country[] = [
  {
    id: 'co',
    name: 'Colombia',
    flag: '🇨🇴',
    currency: 'COP',
    symbol: '$',
    exchangeRate: 1
  },
  {
    id: 'es',
    name: 'España',
    flag: '🇪🇸',
    currency: 'EUR',
    symbol: '€',
    exchangeRate: 0.00023 // Aproximadamente 1 COP = 0.00023 EUR
  }
]

interface CountryContextType {
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
  formatPrice: (priceInCOP: number) => string
  convertPrice: (priceInCOP: number) => number
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]) // Colombia por defecto

  const convertPrice = (priceInCOP: number): number => {
    return priceInCOP * selectedCountry.exchangeRate
  }

  const formatPrice = (priceInCOP: number): string => {
    const convertedPrice = convertPrice(priceInCOP)
    
    if (selectedCountry.currency === 'COP') {
      return `${selectedCountry.symbol}${convertedPrice.toLocaleString('es-CO')}`
    } else if (selectedCountry.currency === 'EUR') {
      return `${selectedCountry.symbol}${convertedPrice.toFixed(2)}`
    }
    
    return `${selectedCountry.symbol}${convertedPrice}`
  }

  return (
    <CountryContext.Provider value={{
      selectedCountry,
      setSelectedCountry,
      formatPrice,
      convertPrice
    }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider')
  }
  return context
} 
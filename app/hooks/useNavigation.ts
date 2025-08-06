'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export const useNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  const navigateTo = useCallback((href: string, anchor: string | null) => {
    if (pathname === href) {
      // Si estamos en la misma página, solo hacer scroll al anchor
      if (anchor) {
        setTimeout(() => {
          const element = document.querySelector(anchor)
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100) // Pequeño delay para asegurar que la página esté lista
      }
    } else {
      // Si estamos en otra página, navegar y luego hacer scroll
      if (anchor) {
        router.push(`${href}${anchor}`)
      } else {
        router.push(href)
      }
    }
  }, [router, pathname])

  return { navigateTo }
} 
'use client'

import { ReactNode } from 'react'
import { useNavigation } from '@/app/hooks/useNavigation'

interface NavigationLinkProps {
  href: string
  anchor?: string | null
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const NavigationLink = ({ 
  href, 
  anchor = null, 
  children, 
  className = '',
  onClick
}: NavigationLinkProps) => {
  const { navigateTo } = useNavigation()

  const handleClick = () => {
    navigateTo(href, anchor)
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
} 
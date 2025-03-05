
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useIsMobile } from "./use-mobile"

export function useMobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  
  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }
  
  const closeMenu = () => {
    setIsOpen(false)
  }
  
  // Close the menu when navigating to a new route
  const navigateAndClose = (path: string) => {
    closeMenu()
    navigate(path)
  }
  
  // Close the menu when screen resizes from mobile to desktop
  React.useEffect(() => {
    if (!isMobile) {
      closeMenu()
    }
  }, [isMobile])
  
  // Close the menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-trigger')) {
        closeMenu()
      }
    }
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])
  
  return {
    isOpen,
    toggleMenu,
    closeMenu,
    navigateAndClose
  }
}

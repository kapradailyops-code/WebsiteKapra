import { useEffect, useState } from "react"

export function useTheme() {
  const [mounted, setMounted] = useState(false)

  // Initialize theme on client side
  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.remove('light')
    document.documentElement.style.colorScheme = 'dark'
  }, [])

  return { theme: "dark" as const, toggleTheme: () => {}, mounted }
}

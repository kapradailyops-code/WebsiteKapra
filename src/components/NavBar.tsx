"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "../lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // Match active item by pathname
  const activeTab = items.find((item) => {
    const itemPath = item.url.split("#")[0] || "/"
    return itemPath === pathname
  })?.name ?? items[0].name

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-6 sm:top-6 sm:bottom-auto z-50 flex justify-center pointer-events-none",
        className,
      )}
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-3 bg-white/[0.04] border border-white/10 backdrop-blur-2xl py-1 px-1 rounded-full shadow-glass">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative rounded-full px-4 py-2 font-body text-sm font-medium tracking-[0.02em] transition-colors sm:px-6",
                "text-white/60 hover:text-white",
                isActive && "bg-white/10 text-white",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-accent-400/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent-400 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-accent-400/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-accent-400/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-accent-400/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

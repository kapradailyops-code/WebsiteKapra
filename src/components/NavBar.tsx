"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { LucideIcon } from "lucide-react"
import { cn } from "../lib/utils"
import { useTheme } from "../hooks/useTheme"

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
  const { asPath } = useRouter()
  const { mounted } = useTheme()
  const pathname = asPath.split(/[?#]/)[0] || "/"

  // Match active item by pathname
  const activeTab = items.find((item) => {
    const itemPath = item.url.split("#")[0] || "/"
    return itemPath === pathname
  })?.name ?? items[0].name

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-6 sm:bottom-auto sm:top-8 z-50 flex justify-center pointer-events-none sm:h-24 lg:h-28 sm:items-center",
        className,
      )}
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-3 bg-foreground/[0.04] border border-foreground/10 backdrop-blur-2xl py-1 px-1 rounded-full shadow-glass"
        style={{
          backgroundColor: `var(--glass-bg)`,
          borderColor: `var(--glass-border)`,
        }}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative rounded-full px-4 py-2 font-body text-sm font-medium tracking-[0.02em] transition-colors sm:px-6",
              )}
              style={{
                color: isActive ? "var(--foreground)" : "var(--muted)",
                backgroundColor: isActive ? "var(--glass-bg)" : undefined,
              }}
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

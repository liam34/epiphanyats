'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/site'
import { cn } from '@/lib/utils'

function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-none" aria-label="Epiphany Accounting & Tax Services, home">
      <span className="text-3xl font-extrabold tracking-wide text-primary">EPIPHANY</span>
      <span className="text-xs font-semibold tracking-tight text-foreground">ACCOUNTING &amp; TAX SERVICES</span>
    </Link>
  )
}

function LanguagePill() {
  return (
    <div className="flex text-xs font-semibold" aria-label="Language: English">
      <span className="px-3 py-1 text-foreground">EN</span>
      <span className="border-l border-foreground bg-accent-soft px-3 py-1 text-foreground/70">FR</span>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between gap-6 px-6">
        <Logo />

        <div className="hidden flex-col items-end gap-1 lg:flex">
          <LanguagePill />
          <nav aria-label="Site">
            <ul className="flex items-center gap-14">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'text-lg font-light transition-colors hover:text-accent',
                      isActive(link.href) ? 'text-accent' : 'text-foreground/70',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          className="p-2 text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border/40 bg-background lg:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'block py-3 text-lg font-light',
                    isActive(link.href) ? 'text-accent' : 'text-foreground/80',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

import Link from 'next/link'
import { contactInfo, socialLinks } from '@/lib/site'

const socialIcons: Record<string, string> = {
  Facebook:
    'M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.6V1.6L14 1.5c-4 0-4.9 3-4.9 4.9v2.1H6.8v4h2.3V22.5H14V12.5h3.3l.4-4H14z',
  Twitter:
    'M23 4.6c-.8.4-1.7.6-2.6.7.9-.6 1.6-1.4 2-2.5-.9.5-1.9.9-2.9 1.1A4.5 4.5 0 0 0 11.8 7c0 .4 0 .7.1 1A12.8 12.8 0 0 1 2.6 3.4a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6v.1c0 2.2 1.5 4 3.6 4.4a4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.4 12.7 12.7 0 0 0 7.9 20.4c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.4z',
  LinkedIn:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v12H3v-12zm6.5 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6.1v6.2h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6h-4v-12z',
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-14 md:flex-row">
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <p className="text-sm text-foreground">
            {'© '}
            {new Date().getFullYear()} Epiphany Tax &amp; Accounting Services
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-foreground/80 md:justify-start">
            <a href={`mailto:${contactInfo.email}`} className="hover:text-primary hover:underline">
              {contactInfo.email}
            </a>
            <a href={contactInfo.phoneHref} className="hover:text-primary hover:underline">
              {contactInfo.phone}
            </a>
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-5 text-sm text-foreground">
          <Link href="/about" className="hover:text-primary hover:underline">
            About
          </Link>
          <Link href="/services" className="hover:text-primary hover:underline">
            Services
          </Link>
          <Link href="/contact" className="hover:text-primary hover:underline">
            Contact
          </Link>
          <Link href="/terms" className="hover:text-primary hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-primary hover:underline">
            Privacy
          </Link>
        </nav>

        <ul className="flex items-center gap-5">
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground transition-colors hover:text-primary"
              >
                <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden="true">
                  <path d={socialIcons[s.label]} />
                </svg>
                <span className="sr-only">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

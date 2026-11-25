import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { contactInfo } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Epiphany Accounting & Tax Services website and informational resources.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" image="/images/hero-about.png" alt="Glass office towers against a blue sky" />
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-14 text-base leading-relaxed text-foreground md:px-8">
        <p>
          Welcome to Epiphany Accounting &amp; Tax Services. By accessing or using this website, you agree to the
          following terms.
        </p>
        <h2 className="text-2xl font-semibold">Informational Purpose Only</h2>
        <p>
          Content on this website, including automated chat responses, is provided for general informational purposes
          only and does not constitute personalized accounting, tax, financial, or legal advice. Formal advisory or
          tax-preparation services begin only after a written engagement with our team.
        </p>
        <h2 className="text-2xl font-semibold">No Sensitive Information in Website Forms or Chat</h2>
        <p>
          Please do not submit Social Insurance Numbers, Social Security Numbers, banking or payment card numbers,
          passwords, or full tax documents through the public website chat or contact form.
        </p>
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>
          Questions about these terms may be directed to{' '}
          <a href={`mailto:${contactInfo.email}`} className="text-accent underline">
            {contactInfo.email}
          </a>{' '}
          or{' '}
          <a href={contactInfo.phoneHref} className="text-accent underline">
            {contactInfo.phone}
          </a>
          , or via our{' '}
          <Link href="/contact" className="text-accent underline">
            Contact page
          </Link>
          .
        </p>
      </section>
    </>
  )
}

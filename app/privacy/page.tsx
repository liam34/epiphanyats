import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { contactInfo } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Epiphany Accounting & Tax Services.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" image="/images/hero-about.png" alt="Glass office towers against a blue sky" />
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-14 text-base leading-relaxed text-foreground md:px-8">
        <p>
          Epiphany Accounting &amp; Tax Services respects your privacy. This policy outlines how information submitted
          through our website is handled.
        </p>
        <h2 className="text-2xl font-semibold">Contact Form Submissions</h2>
        <p>
          Details you enter in our contact form (name, email, phone number, subject, and message) are used solely to
          respond to your inquiry and coordinate accounting, tax, or consulting services.
        </p>
        <h2 className="text-2xl font-semibold">Website Assistant</h2>
        <p>
          Messages sent in the website chat widget are processed by an external AI provider to answer general questions
          about our services. Do not enter confidential tax documents, government IDs, or financial account numbers in
          chat.
        </p>
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>
          For privacy questions, contact{' '}
          <a href={`mailto:${contactInfo.email}`} className="text-accent underline">
            {contactInfo.email}
          </a>{' '}
          or{' '}
          <a href={contactInfo.phoneHref} className="text-accent underline">
            {contactInfo.phone}
          </a>
          , or visit our{' '}
          <Link href="/contact" className="text-accent underline">
            Contact page
          </Link>
          .
        </p>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import { ServicesGrid } from '@/components/home/services-grid'
import { contactInfo, serviceDetails, siteUrl, socialLinks } from '@/lib/site'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness', 'AccountingService'],
      '@id': `${siteUrl}/#organization`,
      name: 'Epiphany Accounting & Tax Services',
      url: siteUrl,
      email: contactInfo.email,
      telephone: contactInfo.phone,
      foundingDate: '2005',
      description:
        'Bookkeeping, personal and corporate tax, payroll, tax strategies, and financial advisory for individuals and small businesses in Edmonton since 2005.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '#1402, 10030 – 114 Street NW',
        addressLocality: 'Edmonton',
        addressRegion: 'AB',
        postalCode: 'T5K 1R3',
        addressCountry: 'CA',
      },
      areaServed: 'Edmonton, AB, Canada',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday'],
          opens: '10:00',
          closes: '18:00',
        },
      ],
      sameAs: socialLinks.map((s) => s.href),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Epiphany Accounting & Tax Services',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: 'Home | Epiphany Services',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
    },
    ...serviceDetails.map((service) => ({
      '@type': 'Service',
      '@id': `${siteUrl}/services#${service.id}`,
      name: service.title,
      description: service.paragraphs[0],
      provider: { '@id': `${siteUrl}/#organization` },
      url: `${siteUrl}/services#${service.id}`,
    })),
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="relative flex min-h-[448px] items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-home.png"
          alt="Accountant at work with a calculator and documents"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-accent/45" aria-hidden="true" />
        <div className="relative flex max-w-4xl flex-col items-center gap-14 px-6 py-20 text-center">
          <h1 className="text-balance text-5xl font-semibold leading-tight text-primary-foreground md:text-7xl">
            Epiphany Accounting &amp; Tax Services
          </h1>
          <p className="text-2xl font-bold text-primary-foreground md:text-3xl">Financial &amp; Tax Consulting</p>
        </div>
      </section>
      <ServicesGrid />
    </>
  )
}

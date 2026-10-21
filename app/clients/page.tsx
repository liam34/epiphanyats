import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ContactCta } from '@/components/contact-cta'
import { industries } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Clients',
  description:
    'Accounting, payroll and tax services for retail, construction, farming, not-for-profit, trucking, cleaning and more.',
}

export default function ClientsPage() {
  return (
    <>
      <PageHero title="Clients" image="/images/hero-clients.png" alt="Business owner shaking hands with an accountant" />

      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 md:px-8">
        <h2 className="text-balance text-3xl font-semibold tracking-widest text-foreground md:text-4xl">
          Multiple Industries Served
        </h2>
        <p className="text-pretty text-lg leading-relaxed text-foreground">
          We offer complete accounting, payroll, and professional tax services for various scale of clients, from small
          business and independent to large corporate enterprises.
        </p>
        <p className="text-pretty text-lg leading-relaxed text-foreground">
          Epiphany Accounting &amp; Tax Services has been assisting numerous businesses in a range of industries
          including Retail, Construction, Farming, Not-For-Profit, Trucking and Cleaning.
        </p>
      </section>

      <section aria-label="Industries" className="bg-primary">
        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 gap-y-3 px-6 py-14 sm:grid-cols-2 md:px-8">
          {industries.map((industry) => (
            <li key={industry} className="flex items-center gap-3 text-lg font-light text-primary-foreground">
              <span className="size-2 shrink-0 bg-primary-foreground" aria-hidden="true" />
              {industry}
            </li>
          ))}
        </ul>
      </section>

      <ContactCta />
    </>
  )
}

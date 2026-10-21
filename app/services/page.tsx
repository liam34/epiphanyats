import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ContactCta } from '@/components/contact-cta'
import { serviceDetails } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Bookkeeping, personal and corporate tax, tax strategies, consulting, payroll and financial advisory services in Edmonton.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" image="/images/hero-services.png" alt="Financial reports and a calculator on a desk" />

      <div className="flex flex-col">
        {serviceDetails.map((service, i) => {
          const crimson = i % 2 === 1
          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-title`}
              className={cn('scroll-mt-24', crimson ? 'bg-primary text-primary-foreground' : 'bg-background')}
            >
              <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-3 md:gap-12 md:px-8">
                <h2
                  id={`${service.id}-title`}
                  className={cn('text-3xl font-semibold md:text-4xl', crimson ? 'text-primary-foreground' : 'text-foreground')}
                >
                  {service.title}
                </h2>
                <div
                  className={cn(
                    'flex flex-col gap-4 text-lg font-light leading-relaxed md:col-span-2',
                    crimson ? 'text-primary-foreground' : 'text-primary',
                  )}
                >
                  {service.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="text-pretty">
                      {p}
                    </p>
                  ))}
                  {service.listIntro && <p>{service.listIntro}</p>}
                  {service.list && (
                    <ul className="flex list-disc flex-col gap-1 pl-6">
                      {service.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <ContactCta />
    </>
  )
}

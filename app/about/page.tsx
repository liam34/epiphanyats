import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { ContactCta } from '@/components/contact-cta'
import { contactInfo } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About us',
  description: 'Epiphany Accounting & Tax Services has served individuals and businesses in Edmonton since 2005.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" image="/images/hero-about.png" alt="Glass office towers against a blue sky" />

      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 md:px-8">
        <h2 className="text-balance text-3xl font-semibold tracking-widest text-foreground md:text-4xl">
          Epiphany Tax &amp; Accounting Services
        </h2>
        <p className="text-pretty text-justify text-lg leading-loose text-foreground">
          Epiphany Accounting &amp; Tax Services has been accommodating individuals and businesses for their tax and
          financial requirements since 2005. Industries worked include individual taxation, corporate taxation with
          personalized services customized for each client&apos;s specific business needs from assisting basic payroll
          and other small business accounting services.
        </p>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-start">
          <div className="relative aspect-[244/241] w-full shrink-0 md:w-64">
            <Image
              src="/images/associate.png"
              alt="Lamarque Volcy, Associate, standing in a conference room"
              fill
              sizes="(min-width: 768px) 256px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 px-6 py-8 md:px-2">
            <h3 className="text-2xl font-semibold text-foreground">
              Lamarque Volcy, <em className="font-light">Associate</em>
            </h3>
            <p className="text-sm text-accent">
              <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                {contactInfo.email}
              </a>
              {' | Phone: '}
              <a href={contactInfo.phoneHref} className="hover:underline">
                Tel: {contactInfo.phone}
              </a>
            </p>
            <blockquote className="text-pretty text-justify leading-relaxed text-foreground">
              {
                '"EATS Epiphany Accounting & Tax Services is an accounting and consulting firm founded in 2005 and located in Edmonton city. EATS is committed to delivering confidence to their clients through a great range of accounting services tailor-made for small businesses".'
              }
            </blockquote>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}

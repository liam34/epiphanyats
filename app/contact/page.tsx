import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ContactForm } from '@/components/contact-form'
import { contactInfo } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Epiphany Accounting & Tax Services in Edmonton, AB. Call (587) 334-7315 or email info@epiphanyats.ca.',
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-normal text-foreground">{title}</h3>
      <div className="text-lg leading-relaxed text-foreground/80">{children}</div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" image="/images/hero-contact.png" alt="Smiling support agent wearing a headset" />

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-14 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-foreground">EPIPHANY Accounting &amp; Tax Services</h2>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-10 md:pt-8">
          <InfoBlock title="Our Address">
            <address className="not-italic">
              {contactInfo.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </InfoBlock>
          <InfoBlock title="Email">
            <a href={`mailto:${contactInfo.email}`} className="hover:text-accent">
              {contactInfo.email}
            </a>
          </InfoBlock>
          <InfoBlock title="Call Us">
            <a href={contactInfo.phoneHref} className="hover:text-accent">
              Tel: {contactInfo.phone}
            </a>
          </InfoBlock>
          <InfoBlock title="Office Hours">
            {contactInfo.hours.map((h) => (
              <p key={h.label}>
                {h.label}: {h.value}
              </p>
            ))}
          </InfoBlock>
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'

export function ContactCta() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="text-balance text-3xl font-semibold text-foreground md:text-4xl">
            Need more details? Contact us
          </h2>
          <Link
            href="/contact"
            className="bg-primary px-16 py-3 text-lg font-light text-primary-foreground transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
        </div>
        <p className="text-pretty text-lg leading-relaxed text-foreground">
          We are here to assist. Contact us by phone, email or via our social media channels.
        </p>
      </div>
    </section>
  )
}

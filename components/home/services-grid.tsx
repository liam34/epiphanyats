import Link from 'next/link'
import { homeServices } from '@/lib/site'
import { cn } from '@/lib/utils'

function OfferTile() {
  return (
    <div className="flex flex-col gap-6 bg-primary px-10 py-12 md:px-20 md:py-8">
      <h2 className="flex flex-col text-7xl font-light leading-none text-primary-foreground md:text-8xl">
        <span>What</span>
        <span>We</span>
        <span>Offer</span>
      </h2>
      <span className="h-2 w-52 bg-accent-soft" aria-hidden="true" />
    </div>
  )
}

function ServiceTile({ title, summary, crimson }: { title: string; summary: string; crimson: boolean }) {
  return (
    <article
      className={cn(
        'flex flex-col items-center gap-8 px-10 py-12 md:min-h-[540px] md:px-20',
        crimson ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground',
      )}
    >
      <h3 className="self-start text-3xl font-semibold">{title}</h3>
      <p
        className={cn(
          'text-justify text-lg font-light leading-relaxed',
          crimson ? 'text-primary-foreground' : 'text-primary',
        )}
      >
        {summary}
      </p>
      <Link
        href="/services"
        className={cn(
          'mt-auto px-10 py-1 text-lg font-light transition-opacity hover:opacity-90',
          crimson ? 'bg-background text-accent' : 'bg-primary text-primary-foreground',
        )}
      >
        More Info...
        <span className="sr-only"> about {title}</span>
      </Link>
    </article>
  )
}

export function ServicesGrid() {
  // Checkerboard: tiles alternate crimson/white across the 3-column grid, starting with the crimson "What We Offer" tile.
  return (
    <section aria-label="What we offer" className="grid grid-cols-1 md:grid-cols-3">
      <OfferTile />
      {homeServices.map((service, i) => (
        <ServiceTile key={service.title} title={service.title} summary={service.summary} crimson={i % 2 === 1} />
      ))}
    </section>
  )
}

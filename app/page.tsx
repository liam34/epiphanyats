import Image from 'next/image'
import { ServicesGrid } from '@/components/home/services-grid'

export default function HomePage() {
  return (
    <>
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

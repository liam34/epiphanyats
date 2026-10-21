import Image from 'next/image'

export function PageHero({ title, image, alt }: { title: string; image: string; alt: string }) {
  return (
    <section className="relative flex h-64 items-center overflow-hidden md:h-72">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-accent/30" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
        <h1 className="text-5xl font-normal uppercase tracking-wide text-primary-foreground drop-shadow md:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  )
}

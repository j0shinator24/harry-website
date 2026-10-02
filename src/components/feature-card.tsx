import Image from "next/image"

type FeatureCardProps = {
  title: string
  description: string
  image: string
  imageAlt?: string
}

export function FeatureCard({ title, description, image, imageAlt = "" }: FeatureCardProps) {
  return (
    <div
      className="glass rounded-2xl p-5 sm:p-7 hover:-translate-y-1.5 active:scale-[0.98] focus-within:ring-2 focus-within:ring-gold/50 transition-transform duration-200 fade-up"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl mb-3 sm:mb-4 bg-white/10 p-2 flex items-center justify-center">
        <Image
          src={image}
          alt={imageAlt}
          width={80}
          height={80}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-heading font-bold text-xl sm:text-2xl mb-2 text-white">{title}</h3>
      <p className="text-white/85 text-base sm:text-lg leading-relaxed">{description}</p>
    </div>
  )
}

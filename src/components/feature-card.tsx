import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

type FeatureCardProps = {
  title: string
  description: string
  image: string
  imageAlt?: string
}

export function FeatureCard({ title, description, image, imageAlt = "" }: FeatureCardProps) {
  return (
    <Card className="group h-full transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            width={56}
            height={56}
            className="h-12 w-12 object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

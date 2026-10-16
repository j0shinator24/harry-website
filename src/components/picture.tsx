// Harry's photos as a <picture>: AVIF and WebP at 480 and 900 px wide, with
// the original JPEG as the fallback, so a phone or a 230 px tile downloads a
// fraction of the 900 x 1200 file. Same crop and the same pixels as before
// (the variants are straight resizes of the JPEG), so the page looks the same.
// The variants live in public/img/<name>-<width>.<ext>.
type Props = {
  src: string
  alt: string
  width: number
  height: number
  sizes: string
  className?: string
  style?: React.CSSProperties
  priority?: boolean
}

const WIDTHS = [480, 900] as const

export function Picture({ src, alt, width, height, sizes, className, style, priority = false }: Props) {
  const base = src.slice(1, -".jpg".length)
  const set = (ext: string) => WIDTHS.map((w) => `/img/${base}-${w}.${ext} ${w}w`).join(", ")
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={src}
        srcSet={`/img/${base}-480.jpg 480w, ${src} 900w`}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  )
}

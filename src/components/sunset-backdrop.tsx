// Wavy SVG sunset that stretches the full document height. The Melbourne
// skyline silhouette now lives in SkylineBand, standing on the footer.
export function SunsetBackdrop() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="sunset-bg"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <rect width="1000" height="1000" fill="#1C1C1C" />
        <path d="M 0,60 Q 500,35 1000,60 L 1000,1000 L 0,1000 Z" fill="#F5B742" />
        <path d="M 0,140 Q 500,165 1000,140 L 1000,1000 L 0,1000 Z" fill="#F58C5A" />
        <path d="M 0,220 Q 500,195 1000,220 L 1000,1000 L 0,1000 Z" fill="#F06681" />
        <path d="M 0,320 Q 500,345 1000,320 L 1000,1000 L 0,1000 Z" fill="#C84B8A" />
        <path d="M 0,420 Q 500,395 1000,420 L 1000,1000 L 0,1000 Z" fill="#9B4D9E" />
        <path d="M 0,520 Q 500,545 1000,520 L 1000,1000 L 0,1000 Z" fill="#6B4C9A" />
        <path d="M 0,600 Q 500,575 1000,600 L 1000,1000 L 0,1000 Z" fill="#4A4AA0" />
        <path d="M 0,680 Q 500,705 1000,680 L 1000,1000 L 0,1000 Z" fill="#4A6FB5" />
      </svg>
    </>
  )
}

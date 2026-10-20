import type { MetadataRoute } from "next"
import { BASE_URL, LAST_UPDATED } from "@/lib/constants"
import { GUIDES } from "@/lib/guides"

export const dynamic = "force-static"

// <lastmod> is each page's last real content change (LAST_UPDATED), not the
// build time, so a rebuild never tells search engines a page changed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: LAST_UPDATED["/"],
      changeFrequency: "weekly",
      priority: 1,
    },
    ...GUIDES.map((g) => ({
      url: `${BASE_URL}${g.href}`,
      lastModified: LAST_UPDATED[g.href],
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}

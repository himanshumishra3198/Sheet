import type { MetadataRoute } from "next";
import { topics } from "@/lib/problems";
import { SDE_PATH, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL },
    { url: `${SITE_URL}${SDE_PATH}` },
    ...topics.map((t) => ({ url: `${SITE_URL}/topics/${t.slug}` })),
  ];
}

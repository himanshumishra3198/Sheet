import type { Metadata } from "next";

export const SITE_URL = "https://hm0.org";
// The site hosts two sheets; this is the name for the site as a whole.
export const SITE_NAME = "DSA Sheets";
export const A2Z_NAME = "A2Z DSA Sheet";
export const SDE_NAME = "SDE Sheet";
export const SDE_PATH = "/sde-sheet";

// Google Analytics 4 property "A2Z DSA Sheet (hm0.org)". Public by design:
// the id is visible in the page source either way.
export const GA_MEASUREMENT_ID = "G-7R0WRXLQGP";

// A page that sets openGraph/twitter replaces the layout's values instead of
// merging with them, so every page builds the complete set here.
export function socialMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const og = {
    url: image,
    width: 1200,
    height: 630,
    alt: `${title}`,
  };
  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [og],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

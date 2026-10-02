import type { Metadata } from "next";

export const SITE_URL = "https://hm0.org";
export const SITE_NAME = "A2Z DSA Sheet";

// A page that sets openGraph/twitter replaces the layout's values instead of
// merging with them, so every page builds the complete set here.
export function socialMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${SITE_NAME}: DSA problems with LeetCode and GeeksforGeeks links`,
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
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

// Google Analytics 4 property "A2Z DSA Sheet (hm0.org)". Public by design:
// the id is visible in the page source either way.
export const GA_MEASUREMENT_ID = "G-7R0WRXLQGP";

import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SheetView } from "@/components/SheetView";
import { totals } from "@/lib/problems";
import { sdePatternCount, sdeTopics, sdeTotals } from "@/lib/sde";
import { SDE_DESCRIPTION, SDE_TITLE } from "@/lib/seo-copy";
import { A2Z_NAME, SDE_NAME, SDE_PATH, SITE_URL, socialMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SDE_TITLE },
  description: SDE_DESCRIPTION,
  ...socialMetadata({
    title: SDE_TITLE,
    description: SDE_DESCRIPTION,
    path: SDE_PATH,
    image: `${SDE_PATH}/opengraph-image`,
  }),
};

export default function SdeSheet() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${SDE_NAME} topics`,
          url: `${SITE_URL}${SDE_PATH}`,
          numberOfItems: sdeTopics.length,
          itemListElement: sdeTopics.map((t) => ({
            "@type": "ListItem",
            position: t.number,
            name: `${t.name} (${t.counts.total} problems)`,
          })),
        }}
      />
      <SheetView topics={sdeTopics}>
        <Hero
          title={SDE_NAME}
          highlight="pattern by pattern"
          intro={`${sdeTotals.total} must-do coding interview problems, grouped into ${sdePatternCount} patterns across ${sdeTopics.length} topics, from two pointers and sliding window to graphs and dynamic programming. Every problem links to LeetCode or GeeksforGeeks.`}
          stats={[
            { label: "problems", value: sdeTotals.total },
            { label: "topics", value: sdeTopics.length },
            { label: "patterns", value: sdePatternCount },
            { label: "easy", value: sdeTotals.easy, tone: "easy" },
            { label: "medium", value: sdeTotals.medium, tone: "medium" },
            { label: "hard", value: sdeTotals.hard, tone: "hard" },
          ]}
          crossLink={{
            href: "/",
            lead: "Want the complete roadmap?",
            label: `${A2Z_NAME}: all ${totals.total} problems`,
          }}
        />
      </SheetView>
    </main>
  );
}

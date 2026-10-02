import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SheetView } from "@/components/SheetView";
import { A2Z_LEVELS } from "@/lib/levels";
import { topics, totals } from "@/lib/problems";
import { sdeTotals } from "@/lib/sde";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo-copy";
import { A2Z_NAME, SDE_NAME, SDE_PATH, SITE_URL, socialMetadata } from "@/lib/site";

export const metadata: Metadata = socialMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${A2Z_NAME} topics`,
          numberOfItems: topics.length,
          itemListElement: topics.map((t) => ({
            "@type": "ListItem",
            position: t.number,
            name: `${t.name} (${t.counts.total} problems)`,
            url: `${SITE_URL}/topics/${t.slug}`,
          })),
        }}
      />
      <SheetView topics={topics} levels={A2Z_LEVELS}>
        <Hero
          title={A2Z_NAME}
          highlight="reimagined & free"
          intro="Every problem from the A2Z DSA sheet, from basics to dynamic programming, with direct links to practise on LeetCode and GeeksforGeeks. Tick problems off as you go and pick up where you left off."
          stats={[
            { label: "problems", value: totals.total },
            { label: "topics", value: topics.length },
            { label: "easy", value: totals.easy, tone: "easy" },
            { label: "medium", value: totals.medium, tone: "medium" },
            { label: "hard", value: totals.hard, tone: "hard" },
          ]}
          crossLink={{
            href: SDE_PATH,
            lead: "Short on time?",
            label: `${SDE_NAME}: ${sdeTotals.total} must-do interview problems by pattern`,
          }}
        />
      </SheetView>
    </main>
  );
}

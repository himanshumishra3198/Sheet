import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";
import { JsonLd } from "@/components/JsonLd";
import { topics, totals } from "@/lib/problems";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo-copy";
import { SITE_NAME, SITE_URL, socialMetadata } from "@/lib/site";

export const metadata: Metadata = socialMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

const STATS = [
  { label: "problems", value: totals.total },
  { label: "topics", value: topics.length },
  { label: "easy", value: totals.easy, className: "text-easy" },
  { label: "medium", value: totals.medium, className: "text-medium" },
  { label: "hard", value: totals.hard, className: "text-hard" },
];

export default function Home() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${SITE_NAME} topics`,
          numberOfItems: topics.length,
          itemListElement: topics.map((t) => ({
            "@type": "ListItem",
            position: t.number,
            name: `${t.name} (${t.counts.total} problems)`,
            url: `${SITE_URL}/topics/${t.slug}`,
          })),
        }}
      />
      <HomeView topics={topics}>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-solved" aria-hidden="true" />
            Free · No sign-up
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            A2Z DSA Sheet,{" "}
            <span className="bg-gradient-to-r from-accent to-[#c084fc] bg-clip-text text-transparent">
              reimagined & free
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
            Every problem from the A2Z DSA sheet, from basics to dynamic
            programming, with direct links to practise on LeetCode and
            GeeksforGeeks. Tick problems off as you go and pick up where you
            left off.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {STATS.map((s) => (
              <li key={s.label}>
                <span className={`mr-1.5 text-xl font-semibold tabular-nums ${s.className ?? "text-fg"}`}>
                  {s.value}
                </span>
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </HomeView>
    </main>
  );
}

import { OG_SIZE, ogCard } from "@/components/og-card";
import { sdePatternCount, sdeTopics, sdeTotals } from "@/lib/sde";
import { SDE_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${SDE_NAME}: ${sdeTotals.total} coding interview problems by pattern`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogCard({
    title: SDE_NAME,
    subtitle: `${sdeTotals.total} problems · ${sdePatternCount} patterns · ${sdeTopics.length} topics`,
    chips: [
      { label: "Easy", value: sdeTotals.easy },
      { label: "Medium", value: sdeTotals.medium },
      { label: "Hard", value: sdeTotals.hard },
    ],
  });
}

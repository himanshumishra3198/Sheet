import { OG_SIZE, ogCard } from "@/components/og-card";
import { topics, totals } from "@/lib/problems";
import { A2Z_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${A2Z_NAME}: ${totals.total} DSA problems with LeetCode and GeeksforGeeks links`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogCard({
    title: A2Z_NAME,
    subtitle: `${totals.total} problems · ${topics.length} topics · LeetCode & GFG links`,
    chips: [
      { label: "Easy", value: totals.easy },
      { label: "Medium", value: totals.medium },
      { label: "Hard", value: totals.hard },
    ],
  });
}

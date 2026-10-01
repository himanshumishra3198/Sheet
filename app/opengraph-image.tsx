import { ImageResponse } from "next/og";
import { OgRabbit } from "@/components/og-rabbit";
import { topics, totals } from "@/lib/problems";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${SITE_NAME}: ${totals.total} DSA problems with LeetCode and GeeksforGeeks links`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CHIPS = [
  { label: "Easy", value: totals.easy, color: "#4ade80" },
  { label: "Medium", value: totals.medium, color: "#fbbf24" },
  { label: "Hard", value: totals.hard, color: "#fb7185" },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#ececf1",
          background:
            "radial-gradient(circle at 85% 10%, #2a2470 0%, #0b0b0f 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#5048e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <OgRabbit size={44} color="#ffffff" />
          </div>
          <div style={{ fontSize: 34, color: "#9c9cab" }}>hm0.org</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, letterSpacing: -3 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 40, color: "#b4b4c2", marginTop: 12 }}>
            {`${totals.total} problems · ${topics.length} topics · LeetCode & GFG links`}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {CHIPS.map((c) => (
            <div
              key={c.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 24px",
                borderRadius: 999,
                border: "2px solid #27272f",
                background: "#131318",
                fontSize: 30,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 7, background: c.color }} />
              {`${c.value} ${c.label}`}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}

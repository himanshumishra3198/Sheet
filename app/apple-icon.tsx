import { ImageResponse } from "next/og";
import { OgRabbit } from "@/components/og-rabbit";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5048e5",
        }}
      >
        <OgRabbit size={116} color="#ffffff" />
      </div>
    ),
    size
  );
}

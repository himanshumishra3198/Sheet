import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/site";

// Loaded after the page is interactive so it never delays first paint.
// Client-side navigations between topics are recorded by GA4's enhanced
// measurement ("page changes based on browser history events").
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}

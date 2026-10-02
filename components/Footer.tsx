import Link from "next/link";
import { topics } from "@/lib/problems";
import { A2Z_NAME, SDE_NAME, SDE_PATH, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-[10rem_minmax(0,1fr)]">
        <div>
          <h2 className="text-sm font-semibold">Sheets</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-muted transition-colors hover:text-fg">
                {A2Z_NAME}
              </Link>
            </li>
            <li>
              <Link href={SDE_PATH} className="text-muted transition-colors hover:text-fg">
                {SDE_NAME}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{A2Z_NAME} topics</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3">
            {topics.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/topics/${t.slug}`}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="max-w-2xl text-xs leading-relaxed text-muted sm:col-span-2">
          {SITE_NAME} is free to use. Problems link out to LeetCode and
          GeeksforGeeks for practice. Your progress is stored only in this
          browser and is never sent to a server; a problem that appears in both
          sheets is ticked in both. We use Google Analytics to count visits.
        </p>
      </div>
    </footer>
  );
}

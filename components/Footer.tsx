import Link from "next/link";
import { topics } from "@/lib/problems";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-sm font-semibold">All topics</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3 lg:grid-cols-4">
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
        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted">
          {SITE_NAME} is free to use. Problems link out to LeetCode and
          GeeksforGeeks for practice. Your progress is stored only in this
          browser and is never sent to a server. We use Google Analytics to
          count visits.
        </p>
      </div>
    </footer>
  );
}

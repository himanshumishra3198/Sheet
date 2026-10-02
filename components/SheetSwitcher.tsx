"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { A2Z_NAME, SDE_NAME, SDE_PATH } from "@/lib/site";

const SHEETS = [
  {
    href: "/",
    name: A2Z_NAME,
    short: "A2Z DSA",
    active: (path: string) => path === "/" || path.startsWith("/topics"),
  },
  {
    href: SDE_PATH,
    name: SDE_NAME,
    short: "SDE",
    active: (path: string) => path.startsWith(SDE_PATH),
  },
];

export function SheetSwitcher() {
  const path = usePathname() ?? "";
  return (
    <nav aria-label="Sheets" className="flex rounded-lg border border-line bg-surface p-0.5">
      {SHEETS.map((s) => {
        const active = s.active(path);
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={active ? "page" : undefined}
            className={`h-8 rounded-md px-2.5 text-sm leading-8 whitespace-nowrap transition-colors sm:px-3 ${
              active ? "bg-surface-2 font-medium text-fg" : "text-muted hover:text-fg"
            }`}
          >
            <span className="sm:hidden">{s.short}</span>
            <span className="hidden sm:inline">{s.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { ConfettiToggle } from "./ConfettiToggle";
import { RabbitIcon } from "./icons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg font-semibold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-fg">
            <RabbitIcon className="size-5" />
          </span>
          {SITE_NAME}
        </Link>
        <nav aria-label="Main" className="ml-auto flex items-center gap-1">
          <Link
            href="/#topics"
            className="inline-flex h-9 items-center rounded-lg px-2.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            Topics
          </Link>
          <ConfettiToggle />
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { ConfettiToggle } from "./ConfettiToggle";
import { RabbitIcon } from "./icons";
import { SheetSwitcher } from "./SheetSwitcher";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        <Link
          href="/"
          aria-label={`${SITE_NAME} home`}
          className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-fg"
        >
          <RabbitIcon className="size-5" />
        </Link>
        <SheetSwitcher />
        <div className="ml-auto">
          <ConfettiToggle />
        </div>
      </div>
    </header>
  );
}

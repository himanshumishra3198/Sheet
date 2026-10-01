"use client";

import { PartyPopper } from "lucide-react";
import { setConfetti, useConfetti } from "@/lib/progress";

export function ConfettiToggle() {
  const on = useConfetti();
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setConfetti(!on)}
      title={on ? "Confetti on solve: on" : "Confetti on solve: off"}
      className="inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg aria-pressed:text-fg"
    >
      <PartyPopper
        className={`size-4 ${on ? "text-medium" : "opacity-60"}`}
        aria-hidden="true"
      />
      <span className="hidden sm:inline">Confetti</span>
      <span className="sr-only sm:hidden">Confetti</span>
    </button>
  );
}

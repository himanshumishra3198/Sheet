"use client";

import { Rabbit } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Navbar({
  confetti,
  setConfetti,
}: {
  confetti: boolean;
  setConfetti: (value: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--gray-900)] bg-[var(--gray-900)] shadow-md">
      <div className="flex h-16 items-center justify-between w-full px-4">
        <div className="font-bold text-xl text-[var(--green-50)] font-serif tracking-wide">
          <Rabbit className="inline-block h-8 w-12 mr-2 text-[var(--gray-100)]" />
        </div>
        <label className="flex items-center gap-3 text-sm text-[var(--gray-100)] cursor-pointer">
          Confetti
          <Switch
            checked={confetti}
            onCheckedChange={setConfetti}
            aria-label="Toggle confetti"
            className="cursor-pointer"
          />
        </label>
      </div>
    </header>
  );
}

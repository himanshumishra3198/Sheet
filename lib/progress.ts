import { useSyncExternalStore } from "react";

// Progress lives in localStorage: there are no accounts. Each store reads
// storage lazily on the client, renders its server value during hydration,
// and stays in sync across tabs through the `storage` event.

const PROGRESS_KEY = "sheet:progress";
// Before 2026-10-02 progress was a list of numeric database ids.
const LEGACY_PROGRESS_KEY = "sheet:solved";
const CONFETTI_KEY = "sheet:confetti";

type Listener = () => void;

function read(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked: progress still works for this visit.
  }
}

function createStore<T>(
  key: string,
  serverValue: T,
  decode: (raw: unknown) => T,
  encode: (value: T) => unknown,
  onFirstSubscribe?: () => void
) {
  let value: T | undefined;
  const listeners = new Set<Listener>();
  const emit = () => listeners.forEach((l) => l());
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) {
      value = decode(read(key));
      emit();
    }
  };
  return {
    get: (): T => (value ??= decode(read(key))),
    getServer: () => serverValue,
    set(next: T) {
      value = next;
      write(key, encode(next));
      emit();
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      if (listeners.size === 1) {
        window.addEventListener("storage", onStorage);
        onFirstSubscribe?.();
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          window.removeEventListener("storage", onStorage);
        }
      };
    },
  };
}

const EMPTY: ReadonlySet<string> = new Set();

const solvedStore = createStore<ReadonlySet<string>>(
  PROGRESS_KEY,
  EMPTY,
  (raw) =>
    Array.isArray(raw)
      ? new Set(raw.filter((id): id is string => typeof id === "string"))
      : EMPTY,
  (set) => [...set],
  migrateLegacyProgress
);

const confettiStore = createStore<boolean>(
  CONFETTI_KEY,
  true,
  (raw) => raw !== false,
  (on) => on
);

let migrated = false;
function migrateLegacyProgress() {
  if (migrated) return;
  migrated = true;
  const legacy = read(LEGACY_PROGRESS_KEY);
  if (!Array.isArray(legacy) || read(PROGRESS_KEY) !== undefined) return;
  // Only old visitors pay for loading the id table.
  import("./legacy-progress").then(({ idsFromLegacy }) => {
    const ids = idsFromLegacy(legacy);
    solvedStore.set(new Set([...solvedStore.get(), ...ids]));
    try {
      window.localStorage.removeItem(LEGACY_PROGRESS_KEY);
    } catch {}
  });
}

export function useSolved(): ReadonlySet<string> {
  return useSyncExternalStore(
    solvedStore.subscribe,
    solvedStore.get,
    solvedStore.getServer
  );
}

export function setSolved(id: string, solved: boolean) {
  const next = new Set(solvedStore.get());
  if (solved) next.add(id);
  else next.delete(id);
  solvedStore.set(next);
}

export function resetProgress() {
  solvedStore.set(new Set());
}

export function useConfetti(): boolean {
  return useSyncExternalStore(
    confettiStore.subscribe,
    confettiStore.get,
    confettiStore.getServer
  );
}

export function setConfetti(on: boolean) {
  confettiStore.set(on);
}

const noopSubscribe = () => () => {};

// False during server render and hydration, true afterwards. Used to avoid
// flashing "0 solved" before saved progress has been read.
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

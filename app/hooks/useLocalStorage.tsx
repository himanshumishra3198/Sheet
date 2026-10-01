import { useEffect, useState } from "react";

// State that is persisted to localStorage under `key`. Progress lives in the
// browser, so storage can be unavailable (private mode, blocked site data):
// in that case it silently behaves like plain useState.
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    // Don't overwrite what's stored with `initial` before it has been read.
    if (!loaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, loaded]);

  return [value, setValue] as const;
}

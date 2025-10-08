import { useEffect, useRef } from "react";

export default function useInactivityTimer(
  callback: () => void,
  timeout = 5 * 60 * 1000,
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const STORAGE_KEY = "lastActivity";

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      console.log("Resetting timer");
      // Save current activity timestamp to localStorage
      localStorage.setItem(STORAGE_KEY, Date.now().toString());

      timerRef.current = setTimeout(callback, timeout);
    };

    // Handle activity updates from *other* tabs
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(callback, timeout);
      }
    };

    // Events that count as activity
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Listen for updates across tabs
    window.addEventListener("storage", handleStorage);

    resetTimer(); // initialize on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      window.removeEventListener("storage", handleStorage);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [callback, timeout]);
}

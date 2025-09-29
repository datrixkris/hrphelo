import { useEffect, useRef } from "react";

export default function useInactivityTimer(
  callback: () => void,
  timeout = 60 * 60 * 1000,
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(callback, timeout);
    };

    // Events that count as activity
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // initialize on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [callback, timeout]);
}

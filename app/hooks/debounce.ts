import { useRef } from "react";

function useDebounce<T extends (...args: string[]) => void>(
  callback: T,
  delay: number,
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default useDebounce;

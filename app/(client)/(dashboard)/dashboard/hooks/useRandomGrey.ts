import { useContext, useCallback } from "react";
import { ThemeContext } from "@/app/context/ThemeContext"; // adjust path as needed

function useRandomGrey() {
  const { theme } = useContext(ThemeContext);

  const randomGrayHex = useCallback(() => {
    let v;

    if (theme === "light") {
      // pick dark gray for contrast
      v = Math.floor(Math.random() * 100); // 0–99
    } else if (theme === "dark") {
      // pick light gray for contrast
      v = 180 + Math.floor(Math.random() * 76); // 180–255
    } else {
      // fallback (any gray)
      v = Math.floor(Math.random() * 256);
    }

    const hex = v.toString(16).padStart(2, "0");
    return `#${hex}${hex}${hex}`;
  }, [theme]);

  return randomGrayHex;
}

export default useRandomGrey;

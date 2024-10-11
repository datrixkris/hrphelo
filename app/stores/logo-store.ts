import { create } from "zustand";
import { getIsDark } from "../actions/theme";

interface LogoStore {
  isDark: boolean;
  setIsDark: () => void;
}

export const useLogoStore = create<LogoStore>((set, get) => {
  return {
    isDark: getIsDark(), 
    setIsDark: () => {
      const currentIsDark = get().isDark;
      const newIsDark = !currentIsDark;

      set({ isDark: newIsDark }); 
      localStorage.setItem("isDark", JSON.stringify(newIsDark)); 
      console.log("Theme:", newIsDark ? "dark" : "light");
    },
  };
});

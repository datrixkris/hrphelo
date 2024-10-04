import { log } from "console";
import { create } from "zustand";

interface LogoStore {
    isDark: boolean,
    setIsDark: () => void
}


function setIsDark() {
    const theme = localStorage.getItem('isDark');
    console.log("theme::", theme);

    if (theme === "true") {
        return true
    } else { return false }

}



export const useLogoStore = create<LogoStore>((set, get) => {

    return {
        isDark: setIsDark(),
        setIsDark: () => {
            const currentIsDark = get().isDark;
            set({ isDark: !currentIsDark });
            localStorage.setItem("isDark", JSON.stringify(currentIsDark));
            console.log('Theme:', !currentIsDark ? 'dark' : 'light');
        }
    };
});
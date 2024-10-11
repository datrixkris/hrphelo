export const getIsDark = () => {
    try {
      const storedTheme = localStorage.getItem("isDark");
  
      if (storedTheme === null) {
        // If no theme is stored, check system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        localStorage.setItem("isDark", JSON.stringify(prefersDark));
  
        return prefersDark;
      } else {
        return JSON.parse(storedTheme); // Ensure we return a boolean value
      }
    } catch (error) {
      console.error("Error in getting theme:", error);
      return false; // Return a fallback value in case of error
    }
  };
  
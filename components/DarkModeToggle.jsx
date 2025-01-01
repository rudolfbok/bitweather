import { useEffect } from "react";

import { useWeather } from "@/lib/weatherContext";

export default function DarkModeToggle() {

    const { setIsDarkMode, isDarkMode } = useWeather();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
      };

      useEffect(() => {
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [isDarkMode]);

    return (
        <button onClick={toggleDarkMode}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
    )
}
"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FavoritesSlider from "@/components/FavoritesSlider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n"; // Import the i18n configuration
import { useWeather } from "@/lib/weatherContext";

export default function Home() {
  const { weatherData } = useWeather();

  // Default background while loading or if there's no data
  const fallbackBackground = "bg-gradient-to-b from-blue-400 to-blue-200";

  // Determine background class
  let backgroundClass = fallbackBackground;

  if (weatherData && weatherData.current) {
    const isDayTime = weatherData.current.weather[0].icon.includes("d"); // Daytime icons contain 'd'
    const weatherCondition = weatherData.current.weather[0].main; // Ensure 'main' exists

    // Specific day/night backgrounds for "Clear" and "Clouds"
    const specificBackgroundMapping = {
      Clear: isDayTime
        ? "bg-gradient-to-b from-[#43AAF1] to-[#AAEEFA]" // Day
        : "bg-gradient-to-b from-[#0F1B39] to-[#0B1B54]", // Night
      Clouds: isDayTime
        ? "bg-gradient-to-b from-[#6C90C4] to-[#94CADF]" // Day
        : "bg-gradient-to-b from-[#1A2339] to-[#071442]", // Night
    };

    // Shared background for all other weather conditions
    const sharedBackgroundMapping = {
        "Rain": "bg-gradient-to-b from-[#025E79] to-[#94CADF]",
        "Drizzle": "bg-gradient-to-b from-[#00779A] to-[#94CADF]",
        "Thunderstorm": "bg-gradient-to-b from-[#25333B] to-[#495257]",
        "Snow": "bg-gradient-to-b from-[#AFD6F1] to-[#CFE5FB]",
        "Mist": "bg-gradient-to-b from-[#5F6C6D] to-[#909899]",
        "Smoke": "bg-gradient-to-b from-[#444746] to-[#818889]",
        "Haze": "bg-gradient-to-b from-[#5F6C6D] to-[#909899]", // Same as mist
        "Dust": "bg-gradient-to-b from-[#5F6C6D] to-[#909899]", // Same as mist
        "Fog": "bg-gradient-to-b from-[#5F6C6D] to-[#909899]", // Same as mist
        "Sand": "bg-gradient-to-b from-[#F7C489] to-[#E1CBAD]",
        "Ash": "bg-gradient-to-b from-[#444746] to-[#818889]", // Same as smoke
        "Squall": "Strong winds",
        "Tornado": "Tornado conditions"
    };

    // Apply specific or shared mapping
    backgroundClass =
      specificBackgroundMapping[weatherCondition] ||
      sharedBackgroundMapping[weatherCondition] ||
      fallbackBackground;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <main className={`text-white font-inter ${backgroundClass} min-h-screen`}>
        <Header />
        <FavoritesSlider />
        <Hero />
      </main>
    </I18nextProvider>
  );
}

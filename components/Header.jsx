"use client";

import { fetchWeather } from "@/lib/weatherService";
import { useState } from "react";
import { useWeather } from "@/lib/weatherContext";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import MagnifyingGlass from "@/public/searchglass.svg";
import DeleteInput from "@/public/deleteinput.svg";
import FavoritesMenu from "./FavoritesMenu";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

import Nameday from "./Nameday";

export default function Header() {
  const { setCity, setWeatherData, setLocation, setLatlon, setError } =
    useWeather();
  const [inputValue, setInputValue] = useState("");

  const { t } = useTranslation();

  const handleWeatherData = async () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    setInputValue("");
    try {
      const { weatherData, location, latlon, error } =
        await fetchWeather(trimmedValue);
      if (error) {
        setWeatherData(null);
        setError(error);
        return;
      }
      setError("");
      setWeatherData(weatherData);
      setLocation(location);
      setLatlon(latlon);
      setCity(location.city);
    } catch (err) {
      setWeatherData(null);
      setError("Failed to fetch weather data.");
      console.error("Error in handleWeatherData:", err);
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      handleWeatherData();
      document.activeElement.blur();
    }
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  return (
    <header className="flex flex-wrap w-screen justify-between items-center z-20 px-4 md:px-2">
      <div className="flex justify-start items-center z-20 w-1/3">
        <Image src={Logo} alt="Logo" width={50} height={50}/>
        <span>BitWeather</span>
      </div>
      <div className="flex justify-end md:w-1/3 md:order-2">
        <FavoritesMenu />
        </div>
        <div className="w-full md:w-1/3">
          <Image
            src={MagnifyingGlass}
            alt="Search"
            height={15}
            width={15}
            onClick={handleWeatherData}
            className="absolute cursor-pointer top-2.5 left-4 z-30"
          />
          <input
            type="text"
            placeholder={t("search")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSearch}
            className="text-center w-full h-[35px] relative rounded-full focus:outline-none z-20 backdrop-blur-3xl bg-black/5 placeholder-white"
          />
          {inputValue.trim() && (
            <Image
              src={DeleteInput}
              alt="Delete input"
              height={15}
              width={15}
              className="absolute cursor-pointer top-2.5 right-4 z-20"
              onClick={handleClearInput}
            />
          )}
        </div>
    </header>
  );
}

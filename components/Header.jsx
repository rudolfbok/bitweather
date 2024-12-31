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
    <header className="flex flex-wrap w-screen items-center px-4 z-20">
      <div className="flex w-1/2 md:w-1/4 justify-start items-center z-20">
        <Image src={Logo} alt="Logo" className="max-h-11 w-auto" />
        <span>BitWeather</span>
      </div>
      <div className="flex md:hidden w-1/2 justify-end">
        <FavoritesMenu />
      </div>
      <div className="flex w-full md:w-1/2 justify-center relative">
        <div className="relative w-full md:w-2/3">
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
      </div>
      <div className="w-1/4 justify-end hidden md:flex">
        <Nameday/>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

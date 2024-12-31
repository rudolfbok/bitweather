"use client";

import React from "react";
import { useWeather } from "@/lib/weatherContext";
import DeleteFavorite from "@/public/deletefavorite.svg";
import Image from "next/image";

export default function FavoritesSlider() {
  const {
    fetchWeather,
    favoriteCities,
    removeCityFromFavorites,
    getFavoriteCities,
    setWeatherData,
    setLocation,
    setLatlon,
    setIsFavorite,
  } = useWeather();

  const handleCityClick = async (city) => {
    try {
      const { weatherData, location, latlon } = await fetchWeather(city);
      setWeatherData(weatherData);
      setLocation(location);
      setLatlon(latlon);
    } catch (error) {
      console.error(`Failed to fetch weather for ${city}:`, error);
    }
  };

  const handleRemoveCityFromFavorites = (event, city) => {
    event.stopPropagation();
    const cityName = city.trim();
    if (cityName.length > 0) {
      const favoriteCities = getFavoriteCities();
      if (favoriteCities.includes(cityName)) {
        removeCityFromFavorites(cityName);
        setIsFavorite(false);
      }
    }
  };

  return (
    <div className="hidden md:flex md:flex-row max-h-[5vh] items-center mx-4 my-3">
      <span>Favorite cities:</span>
      {favoriteCities.map((city, index) => (
        <li
          key={index}
          className="flex flex-row items-center rounded-3xl backdrop-blur-3xl bg-black/5 cursor-pointer p-1 mr-3"
          onClick={() => handleCityClick(city)}
        >
          <button className="text-start ml-2">{city}</button>
          <div
            className="h-[25px] aspect-square hover:bg-red-700 rounded-full flex items-center justify-center place-content-center ml-2"
            onClick={(event) => handleRemoveCityFromFavorites(event, city)}
          >
            <Image src={DeleteFavorite} alt="Remove city" width={15} />
          </div>
        </li>
      ))}
    </div>
  );
}

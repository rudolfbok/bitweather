"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { fetchWeather } from "./weatherService";
import {
  getFavoriteCities,
  addFavoriteCity,
  removeFavoriteCity,
} from "@/lib/crudService";
import { useTranslation } from "react-i18next";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [error, setError] = useState("");
  const [latlon, setLatlon] = useState({ lat: 0, lng: 0 });
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [background, setBackground] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavoriteCities(getFavoriteCities());
    }
  }, []);

  useEffect(() => {
    if (location.city) {
      fetchWeather(location.city)
        .then((data) => {
          if (data) {
            setWeatherData(data.weatherData);
            setLocation(data.location);
            setLatlon(data.latlon);
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [i18n.language, location.city]);

  const addCityToFavorites = (city) => {
    if (addFavoriteCity(city)) {
      setFavoriteCities(getFavoriteCities());
    }
  };

  const removeCityFromFavorites = (city) => {
    if (removeFavoriteCity(city)) {
      setFavoriteCities(getFavoriteCities());
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        fetchWeather,
        city,
        setCity,
        weatherData,
        setWeatherData,
        location,
        setLocation,
        error,
        setError,
        latlon,
        setLatlon,
        favoriteCities,
        addCityToFavorites,
        getFavoriteCities,
        removeCityFromFavorites,
        isFavorite,
        setIsFavorite,
        setBackground
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};

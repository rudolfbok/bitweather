"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { fetchWeather } from "./weatherService";
import { getFavoriteCities, addFavoriteCity, removeFavoriteCity } from "@/lib/crudService";

import { useTranslation } from "react-i18next";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState({ city: "", country: "" });
    const [error, setError] = useState("");
    const [latlon, setLatlon] = useState({ lat: 0, lng: 0 });
    const [favoriteCities, setFavoriteCities] = useState([]); // Initialize empty until hydrated
    const [isFavorite, setIsFavorite] = useState(false);

    // Hydrate favorite cities once on client mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            setFavoriteCities(getFavoriteCities());
        }
    }, []);

     // Fetch weather when language changes
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
                .catch((err) => setError(err));
        }
    }, [i18n.language, location.city]);

    const addCityToFavorites = (city) => {
        if (addFavoriteCity(city)) {
            setFavoriteCities(getFavoriteCities()); // Update the favorite cities list
        }
    };

    const removeCityFromFavorites = (city) => {
        if (removeFavoriteCity(city)) {
            setFavoriteCities(getFavoriteCities()); // Update the favorite cities list
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
                setIsFavorite
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    return useContext(WeatherContext);
};

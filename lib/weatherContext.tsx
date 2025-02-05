'use client';

import { addFavoriteCity, getFavoriteCities, removeFavoriteCity } from '@/lib/crudService';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchWeather } from './weatherService';

interface LatLonResponse {
	lat: number;
	lng: number;
}

interface LocationResponse {
	city: string;
	country: string;
}

interface OpenWeatherResponse {
	current: {
		temp: number;
		feels_like: number;
		humidity: number;
		pressure: number;
		weather: {
			icon: string;
		}[];
	};
	hourly: {
		dt: number;
		temp: number;
		weather: {
			icon: string;
		}[];
	}[];
	daily: {
		dt: number;
		temp: {
			max: number;
			min: number;
		};
		rain: number;
		uvi: number;
		visibility: number;
		wind_speed: number;
		sunrise: number;
		sunset: number;
		weather: {
			description: string;
			icon: string;
		}[];
	}[];
}

interface WeatherContextType {
	city: string;
	setCity: (city: string) => void;
	weatherData: OpenWeatherResponse | null;
	setWeatherData: (data: OpenWeatherResponse) => void;
	location: LocationResponse;
	setLocation: (location: LocationResponse) => void;
	error: string;
	setError: (error: string) => void;
	latlon: LatLonResponse;
	setLatlon: (latlon: LatLonResponse) => void;
	favoriteCities: string[] | null;
	setFavoriteCities: (favoriteCities: string[]) => void;
	isFavorite: boolean;
	setIsFavorite: (isFavorite: boolean) => void;
	isDarkMode: boolean;
	setIsDarkMode: (isDarkMode: boolean) => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	currentLanguage: string;
	setCurrentLanguage: (currentLanguage: string) => void;
	suggestions: string[] | null;
	setSuggestions: (suggestions: string[]) => void;
	addCityToFavorites: (city: string) => void;
	getFavoriteCities: () => string[];
	removeCityFromFavorites: (city: string) => void;
	getIconPath: (iconCode: string) => string | undefined;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const { i18n } = useTranslation();
	const [city, setCity] = useState<string>('');
	const [weatherData, setWeatherData] = useState<OpenWeatherResponse | null>(null);
	const [location, setLocation] = useState<LocationResponse>({ city: '', country: '' });
	const [error, setError] = useState<string>('');
	const [latlon, setLatlon] = useState<LatLonResponse>({ lat: 0, lng: 0 });
	const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);
	const [suggestions, setSuggestions] = useState<string[] | null>([]);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const toggle = () => {
			setIsDarkMode(mediaQuery.matches);
			document.documentElement.classList.toggle('dark', mediaQuery.matches);
		};
		toggle();
		mediaQuery.addEventListener('change', toggle);
		return () => mediaQuery.removeEventListener('change', toggle);
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setFavoriteCities(getFavoriteCities());
		}
	}, []);

	useEffect(() => {
		if (location.city) {
			fetchWeather(location.city)
				.then((data) => {
					// Check if data contains an error
					if (data.error) {
						setError(data.error); // Set error message
					} else {
						// If no error, safely access weatherData, location, and latlon
						setWeatherData(data.weatherData);
						setLocation(data.location!);
						setLatlon(data.latlon!);
					}
				})
				.catch((err: Error) => setError(err.message)); // In case of network errors
		}
	}, [i18n.language, location.city]);

	const addCityToFavorites = (city: string) => {
		if (addFavoriteCity(city)) {
			setFavoriteCities(getFavoriteCities());
		}
	};

	const removeCityFromFavorites = (city: string) => {
		if (removeFavoriteCity(city)) {
			setFavoriteCities(getFavoriteCities());
		}
	};

	const getIconPath = (iconCode: string): string | undefined => iconMapping[iconCode];

	const iconMapping: Record<string, string> = {
		'01d': '/weathericons/clear-day.png',
		'01n': '/weathericons/clear-night.png',
		'02d': '/weathericons/partclouds-day.png',
		'02n': '/weathericons/partclouds-night.png',
		'03d': '/weathericons/clouds-day.png',
		'03n': '/weathericons/clouds-night.png',
		'04d': '/weathericons/clouds-day.png',
		'04n': '/weathericons/clouds-night.png',
		'09d': '/weathericons/rain-day.png',
		'09n': '/weathericons/rain-night.png',
		'10d': '/weathericons/rain-day.png',
		'10n': '/weathericons/rain-night.png',
		'11d': '/weathericons/storm-day.png',
		'11n': '/weathericons/storm-night.png',
		'13d': '/weathericons/snow.png',
		'13n': '/weathericons/snow.png',
		'50d': '/weathericons/fog.png',
		'50n': '/weathericons/fog.png',
	};

	const updateWeatherData = (data: OpenWeatherResponse) => {
		setWeatherData(data);
	};

	return (
		<WeatherContext.Provider
			value={{
				city,
				setCity,
				weatherData,
				setWeatherData: updateWeatherData,
				location,
				setLocation,
				error,
				setError,
				latlon,
				setLatlon,
				favoriteCities,
				setFavoriteCities,
				addCityToFavorites,
				getFavoriteCities,
				removeCityFromFavorites,
				isFavorite,
				setIsFavorite,
				isDarkMode,
				setIsDarkMode,
				getIconPath,
				suggestions,
				setSuggestions,
				currentLanguage,
				setCurrentLanguage,
				isOpen,
				setIsOpen,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeather = () => {
	return useContext(WeatherContext);
};

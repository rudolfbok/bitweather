'use client';

import {
	useState,
	useEffect,
	createContext,
	useContext,
	ReactNode,
} from 'react';
import { fetchWeather } from './weatherService';
import {
	getFavoriteCities,
	addFavoriteCity,
	removeFavoriteCity,
} from '@/lib/crudService';
import { useTranslation } from 'react-i18next';

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
	weatherData: OpenWeatherResponse;
	setWeatherData: (data: OpenWeatherResponse) => void;
	location: LocationResponse;
	setLocation: (location: Location) => void;
	error: string;
	setError: (error: string) => void;
	latlon: LatLonResponse;
	setLatlon: (latlon: LatLonResponse) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
	undefined,
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const { i18n } = useTranslation();
	const [city, setCity] = useState<string | null>('');
	const [weatherData, setWeatherData] = useState<OpenWeatherResponse | null>(
		null,
	);
	const [location, setLocation] = useState<LocationResponse>({
		city: '',
		country: '',
	});
	const [error, setError] = useState<string | null>('');
	const [latlon, setLatlon] = useState<LatLonResponse>({ lat: 0, lng: 0 });
	const [favoriteCities, setFavoriteCities] = useState<string[] | null>([]);
	const [isFavorite, setIsFavorite] = useState<boolean | null>(false);
	const [isDarkMode, setIsDarkMode] = useState<boolean | null>(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleChange = (e) => {
			setIsDarkMode(e.matches);
			if (e.matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		};

		handleChange(mediaQuery);
		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
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
					if (data) {
						setWeatherData(data.weatherData);
						setLocation(data.location);
						setLatlon(data.latlon);
					}
				})
				.catch((err) => setError(err.message));
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

	const getIconPath = (iconCode: string): string | undefined =>
		iconMapping[iconCode];

	const updateWeatherData = (data) => {
		setWeatherData(data);
	};

	return (
		<WeatherContext.Provider
			value={{
				fetchWeather,
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
				addCityToFavorites,
				getFavoriteCities,
				removeCityFromFavorites,
				isFavorite,
				setIsFavorite,
				isDarkMode,
				setIsDarkMode,
				getIconPath,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeather = () => {
	return useContext(WeatherContext);
};

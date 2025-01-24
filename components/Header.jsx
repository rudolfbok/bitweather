'use client';

import { useEffect, useRef } from 'react';

import { fetchWeather } from '@/lib/weatherService';
import { useState } from 'react';
import { useWeather } from '@/lib/weatherContext';
import Image from 'next/image';
import Logo from '@/public/logo.svg';

import SearchGlass from '@/public/searchglass.svg';
import SearchGlassDark from '@/public/searchglass-dark.svg';

import DeleteInput from '@/public/deleteinput.svg';
import DeleteInputDark from '@/public/deleteinput-dark.svg';

import FavoritesMenu from './FavoritesMenu';
import { useTranslation } from 'react-i18next';

export default function Header() {
	const {
		setCity,
		setWeatherData,
		setLocation,
		setLatlon,
		setError,
		isDarkMode,
	} = useWeather();
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const suggestionsRef = useRef(null);

	const { t } = useTranslation();

	const handleWeatherData = async (cityName) => {
		const searchValue = cityName ? cityName.trim() : inputValue.trim();
		if (!searchValue) return;
		setInputValue('');
		try {
			const { weatherData, location, latlon, error } =
				await fetchWeather(searchValue);
			if (error) {
				setWeatherData(null);
				setError(error);
				return;
			}
			setError('');
			setWeatherData(weatherData);
			setLocation(location);
			setLatlon(latlon);
			setCity(location.city);
		} catch (err) {
			setWeatherData(null);
			setError('Failed to fetch weather data.');
			console.error('Error in handleWeatherData:', err);
		}
		setSuggestions([]);
	};

	const handleSearch = (event) => {
		if (event.key === 'Enter') {
			handleWeatherData();
			document.activeElement.blur();
		}
	};

	const handleClearInput = () => {
		setInputValue('');
		setSuggestions([]);
	};

	const handleInputSecondary = () => {
		setInputValue(e.target.value);
		debounce(async () => {
			const results = await fetchWeather(e.target.value);
			setSuggestions(results);
		}, 300)();
	};

	const debounce = (fn, delay) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => fn(...args), delay);
		};
	};

	const debounceFetch = debounce(async (query) => {
		if (!query) {
			setSuggestions([]);
			return;
		}

		const response = await fetchWeather(query);
		if (response.error) {
			setSuggestions([]);
		} else {
			setSuggestions(response.locations); // Store multiple cities
		}
	});

	const handleInput = (e) => {
		const value = e.target.value;
		setInputValue(value);
		debounceFetch(value);
	};

	const handleSelect = (selectedCity) => {
		setInputValue(selectedCity.city); // Set exact city name
		setSuggestions([]); // Hide suggestions
		handleWeatherData(selectedCity.city); // Fetch weather for the selected city
	};

	useEffect(() => {
		const handleClickOutsideSuggestions = (event) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target)
			) {
				setSuggestions([]);
			}
		};
		document.addEventListener('mousedown', handleClickOutsideSuggestions);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideSuggestions);
		};
	}, []);

	return (
		<header className="flex flex-wrap md:flex-nowrap justify-between items-center z-20 space-y-2">
			<div className="flex justify-start items-center z-20 gap-2">
				<Image src={Logo} alt="Logo" width={50} height={50} />
				<span className='font-medium'>BitWeather</span>
			</div>
			<div className="flex justify-end md:order-2">
				<FavoritesMenu />
			</div>
			<div className="flex w-[100%] justify-center relative">
				<div className='w-[100%] justify-between flex'>
				<Image
					src={isDarkMode ? SearchGlassDark : SearchGlass}
					alt="Search"
					height={15}
					width={15}
					onClick={handleWeatherData}
					className="absolute cursor-pointer top-3 left-4 z-30"
				/>
				<input
					id="searchbar"
					type="text"
					placeholder={t('search')}
					value={inputValue}
					onChange={handleInput}
					onKeyDown={handleSearch}
					className={`text-center h-10 w-[100%] md:w-[60%] relative rounded-3xl focus:outline-none z-20 backdrop-blur-3xl bg-black/5 ${suggestions && suggestions.length > 0 ? 'rounded-tr-[1rem] rounded-tl-[1rem] rounded-bl-none rounded-br-none' : 'rounded-3xl'}`}
					autoComplete="off"
				/>
				{inputValue.trim() && (
					<Image
						src={isDarkMode ? DeleteInputDark : DeleteInput}
						alt="Delete input"
						height={15}
						width={15}
						className="absolute cursor-pointer top-3 right-4 z-20"
						onClick={handleClearInput}
					/>
				)}
				</div>
				{suggestions.length > 0 && (
					<ul
						className={`absolute top-full left-0 w-[100%] rounded-bl-[1rem] rounded-br-[1rem] ${isDarkMode ? 'bg-suggestions_dark' : 'bg-suggestions_light'}`}
						ref={suggestionsRef}
					>
						{suggestions.map((city, idx) => (
							<li
								key={idx}
								className="p-2 cursor-pointer"
								onClick={() => handleSelect(city)}
							>
								{city.city}, {city.country}
							</li>
						))}
					</ul>
				)}

			</div>
		</header>
	);
}

'use client';

import { useEffect, useRef, useState } from 'react';

import { useWeather } from '@/lib/weatherContext';
import { fetchWeather } from '@/lib/weatherService';
import Logo from '@/public/logo.png';
import Image from 'next/image';

import SearchGlassDark from '@/public/searchglass-dark.svg';
import SearchGlass from '@/public/searchglass.svg';

import DeleteInputDark from '@/public/deleteinput-dark.svg';
import DeleteInput from '@/public/deleteinput.svg';

import { useTranslation } from 'react-i18next';
import FavoritesMenu from './FavoritesMenu';

export default function Header() {
	const { setCity, setWeatherData, setLocation, setLatlon, setError, isDarkMode } = useWeather();
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const suggestionsRef = useRef(null);

	const { t } = useTranslation();

	const handleWeatherData = async (cityName) => {
		const searchValue = cityName ? cityName.trim() : inputValue.trim();
		if (!searchValue) return;
		setInputValue('');
		try {
			const { weatherData, location, latlon, error } = await fetchWeather(searchValue);
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
			setSuggestions(response.locations);
		}
	});

	const handleInput = (e) => {
		const value = e.target.value;
		setInputValue(value);
		debounceFetch(value);
	};

	const handleSelect = (selectedCity) => {
		const fullCityName = `${selectedCity.city}, ${selectedCity.country}`;
		setInputValue(fullCityName);
		setSuggestions([]);
		handleWeatherData(fullCityName);
	};

	useEffect(() => {
		const handleClickOutsideSuggestions = (event) => {
			if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
				setSuggestions([]);
			}
		};
		document.addEventListener('mousedown', handleClickOutsideSuggestions);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideSuggestions);
		};
	}, []);

	return (
		<header className="flex flex-wrap justify-between items-center z-20 space-y-2">
			<div className="flex justify-start items-center z-5 gap-2 w-[160px] px-1">
				<Image src={Logo} alt="Logo" width={40} height={40} />
				<span className="font-medium">BitWeather</span>
			</div>
			<div className="flex justify-end w-[160px] md:order-2">
				<FavoritesMenu />
			</div>
			<div className="flex w-full md:w-[400px] justify-center relative">
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
					className={`text-center h-10 w-full px-12 relative rounded-2xl focus:outline-none z-20 focus:placeholder-transparent bg-zinc-500/5 ${suggestions && suggestions.length > 0 && 'rounded-tr-2xl rounded-tl-2xl rounded-bl-none rounded-br-none'}`}
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
				{suggestions.length > 0 && (
					<ul
						className={`z-20 absolute top-full left-0 right-0 m-auto rounded-bl-2xl rounded-br-2xl ${isDarkMode ? 'bg-suggestions_dark' : 'bg-suggestions_light'}`}
						ref={suggestionsRef}
					>
						{suggestions.map((city, idx) => (
							<li
								key={idx}
								className={`p-2 cursor-pointer ${isDarkMode ? 'hover:bg-suggestions_light/5' : 'hover:bg-suggestions_dark/5'} last:rounded-bl-2xl last:rounded-br-2xl`}
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

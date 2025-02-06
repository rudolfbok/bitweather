'use client';

import { useWeather } from '@/lib/weatherContext';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { fetchWeather } from '@/lib/weatherService';

import DarkModeToggle from './DarkModeToggle';
import Nameday from './Nameday';

import gsap from 'gsap';

import { Cross as Hamburger } from 'hamburger-react';

export default function FavoritesMenu() {
	const {
		favoriteCities,
		setWeatherData,
		setLocation,
		setLatlon,
		isOpen,
		setIsOpen,
		getIconPath,
		setVisibleCompass,
	} = useWeather();

	const menuRef = useRef(null);

	const [weatherByCity, setWeatherByCity] = useState({});

	const { t } = useTranslation();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [isOpen]);

	const handleCityClick = async (city) => {
		try {
			const { weatherData, location, latlon } = await fetchWeather(city);
			setWeatherData(weatherData);
			setLocation(location);
			setLatlon(latlon);
			setIsOpen(false);
		} catch (error) {
			console.error(`Failed to fetch weather for ${city}:`, error);
		}
	};

	useEffect(() => {
		if (menuRef.current) {
			if (isOpen) {
				gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
			}
		}
	}, [isOpen]);

	useEffect(() => {
		const fetchWeatherForFavorites = async () => {
			const weatherData = {};

			await Promise.all(
				favoriteCities.map(async (city) => {
					try {
						const data = await fetchWeather(city);
						if (!data.error) {
							weatherData[city] = data.weatherData;
						}
					} catch (error) {
						console.error(`Error fetching weather for ${city}:`, error);
					}
				}),
			);

			setWeatherByCity(weatherData);
		};

		if (favoriteCities.length > 0) {
			fetchWeatherForFavorites();
		}
	}, [favoriteCities]);

	const handleCompass = () => {
		setWeatherData(null);
		setVisibleCompass(true);
		setIsOpen(false);
	};

	return (
		<div className="flex flex-row gap-4 items-center overflow-hidden">
			{isOpen && (
				<div className="fixed inset-0 z-50 backdrop-blur-3xl lg:bg-background" ref={menuRef}>
					<div
						className={`fixed overflow-y-auto flex flex-col top-0 right-0 w-full md:w-[45%] lg:w-screen h-full md:bg-background lg:bg-transparent py-10 z-40`}
					>
						<div className="flex flex-col lg:flex-col items-center w-full lg:p-20">
							<p className="text-xl w-full text-center lg:text-start lg:text-2xl">
								{t('favorite')}
							</p>
							<ul className="flex flex-col lg:flex-row w-[90%] lg:w-full gap-3 lg:gap-6 lg:flex-wrap py-6">
								{favoriteCities.length > 0 ? (
									favoriteCities.map((city, index) => {
										const cityWeather = weatherByCity[city];

										return (
											<li
												key={index}
												className="flex flex-row relative justify-between items-center lg:items-center rounded-2xl lg:h-36 lg:w-56 p-4 bg-zinc-500/10 cursor-pointer"
												onClick={() => handleCityClick(city)}
											>
												<div className="flex flex-col">
													<button className="text-start">{city}</button>

													<span className="text-sm">
														{cityWeather
															? cityWeather.current.weather[0].description
															: 'Loading...'}
													</span>

													<span className="items-start h-full text-xl mt-2">
														{cityWeather ? `${Math.round(cityWeather.current.temp)}°C` : '--°C'}
													</span>
												</div>
												{cityWeather && (
													<img
														src={getIconPath(cityWeather.current.weather[0].icon)}
														alt={cityWeather.current.weather[0].description}
														className="w-16 lg:w-20"
													/>
												)}
											</li>
										);
									})
								) : (
									<p className="text-center">No favorite cities yet.</p>
								)}
							</ul>

							<div className="flex flex-col items-center space-y-4 lg:mt-16">
								<Nameday />
								<DarkModeToggle />
								<button
									className="rounded-2xl p-2 px-6 bg-zinc-500/10 cursor-pointer lg:hidden"
									onClick={handleCompass}
								>
									{t('compass')}
								</button>
								<LanguageSwitcher />
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="z-50 mr-[-12px]">
				<Hamburger rounded size={22} distance="sm" toggled={isOpen} toggle={setIsOpen} />
			</div>
		</div>
	);
}

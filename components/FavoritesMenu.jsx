'use client';

import { useState, useEffect, useRef } from 'react';
import { useWeather } from '@/lib/weatherContext';
import Trash from '@/public/trash.svg';
import TrashDark from '@/public/trash-dark.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

import DarkModeToggle from './DarkModeToggle';
import Nameday from './Nameday';

import gsap from 'gsap';

import { Cross as Hamburger } from 'hamburger-react';

export default function FavoritesMenu() {
	const {
		fetchWeather,
		weatherData,
		favoriteCities,
		removeCityFromFavorites,
		setWeatherData,
		setLocation,
		setLatlon,
		getFavoriteCities,
		setIsFavorite,
		isDarkMode,
		isOpen,
		setIsOpen,
	} = useWeather();

	const menuRef = useRef(null);

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

	useEffect(() => {
		if (menuRef.current) {
			if (isOpen) {
				gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
			}
		}
	}, [isOpen]);

	return (
		<div className="flex flex-row gap-4 items-center overflow-hidden">
			{isOpen && (
				<div className="fixed inset-0 z-50 backdrop-blur-3xl lg:bg-background" ref={menuRef}>
					<div
						className={`fixed overflow-y-auto flex flex-col top-0 right-0 w-full md:w-[40%] lg:w-screen h-full md:bg-background lg:bg-transparent pt-[50px] z-40 overflow-auto`}
					>
						<div className="flex flex-col lg:flex-col items-center w-full lg:p-20">
							<p className="text-xl mb-4 w-full text-center lg:text-start lg:text-2xl">
								{t('favorite')}
							</p>
							<ul className="flex flex-col lg:flex-row w-[70%] lg:w-full gap-3 lg:gap-8 lg:flex-wrap">
								{favoriteCities.length > 0 ? (
									favoriteCities.map((city, index) => (
										<li
											key={index}
											className="flex flex-row relative justify-between items-center lg:items-start rounded-2xl h-10 lg:h-40 lg:w-52 py-2 px-4 backdrop-blur-3xl bg-zinc-500/10 cursor-pointer lg:flex-col"
											onClick={() => handleCityClick(city)}
										>
											<div className="flex lg:flex-col">
												<button className="text-start">{city}</button>
												<span className="hidden lg:block">Skoro jasno</span>
											</div>
											<div
												className="h-[30px] aspect-square hover:bg-red-700 rounded-full flex items-center justify-center place-content-center"
												onClick={(event) => handleRemoveCityFromFavorites(event, city)}
											>
												<Image src={isDarkMode ? TrashDark : Trash} alt="Remove city" width={25} />
											</div>
										</li>
									))
								) : (
									<p className="text-center">{t('nofavorites')}</p>
								)}
							</ul>
							<div className="flex flex-col space-y-2 my-4 lg:absolute lg:bottom-0">
								<Nameday />
								<DarkModeToggle />
								<button className="rounded-2xl h-10 py-2 px-4 my-5 backdrop-blur-3xl bg-zinc-500/10 cursor-pointer lg:hidden">
									{t('compass')}
								</button>
								<LanguageSwitcher />
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="z-50">
				<Hamburger rounded size={22} distance="sm" toggled={isOpen} toggle={setIsOpen} />
			</div>
		</div>
	);
}

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
		favoriteCities,
		removeCityFromFavorites,
		setWeatherData,
		setLocation,
		setLatlon,
		getFavoriteCities,
		setIsFavorite,
		isDarkMode,
	} = useWeather();
	const [isOpen, setIsOpen] = useState(false);
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
		const handleClickOutsideMenu = (event) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				!event.target.closest('.hamburger-react')
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutsideMenu);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideMenu);
		};
	}, []);

	useEffect(() => {
		if (menuRef.current) {
			if (isOpen) {
				gsap.to(menuRef.current, { opacity: 1, duration: 0.2 });
			} 
		}
	}, [isOpen]);

	return (
		<div className="flex flex-row gap-4 items-center overflow-hidden">
			{isOpen && (
				<div
					className="
                      fixed
                      overflow-y-auto
                      flex
                      flex-col
                      top-0
                      right-0
                      md:w-1/4
                      w-full
                      h-full
                      bg-white/1
                      backdrop-blur-xl
                      pt-[60px]
                      duration-500
                      z-40
                      overflow-auto
					  opacity-0
					  "
					ref={menuRef}
				>
					<div className="flex flex-col items-center w-full">
						<p className="text-xl pb-4">{t('favorite')}</p>
						<ul className="w-3/4">
							{favoriteCities.length > 0 ? (
								favoriteCities.map((city, index) => (
									<li
										key={index}
										className="flex flex-row justify-between items-center rounded-3xl py-2 px-4 my-3 backdrop-blur-3xl bg-black/5 cursor-pointer"
										onClick={() => handleCityClick(city)}
									>
										<button className="text-start">{city}</button>
										<div
											className="h-[30px] aspect-square hover:bg-red-700 rounded-full flex items-center justify-center place-content-center"
											onClick={(event) =>
												handleRemoveCityFromFavorites(event, city)
											}
										>
											<Image
												src={isDarkMode ? TrashDark : Trash}
												alt="Remove city"
												width={25}
											/>
										</div>
									</li>
								))
							) : (
								<p className="text-center">{t('nofavorites')}</p>
							)}
						</ul>
						<LanguageSwitcher />
						<Nameday />
						<DarkModeToggle />
						<button className="rounded-3xl py-2 px-4 my-5 backdrop-blur-3xl bg-black/5 cursor-pointer">
							{t('compass')}
						</button>
					</div>
				</div>
			)}
			<div className="z-50">
				<Hamburger
					rounded
					size={22}
					distance="sm"
					toggled={isOpen}
					toggle={setIsOpen}
				/>
			</div>
		</div>
	);
}

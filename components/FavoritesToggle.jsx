import { useWeather } from '@/lib/weatherContext';
import { fetchWeather } from '@/lib/weatherService';
import Favorite from '@/public/favorite.svg';
import NotFavorite from '@/public/notfavorite.svg';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function FavoritesToggle() {
	const {
		location,
		addCityToFavorites,
		getFavoriteCities,
		removeCityFromFavorites,
		setIsFavorite,
		isFavorite,
	} = useWeather();

	const [isHovered, setIsHovered] = useState(false);
	const iconRef = useRef(null);

	useEffect(() => {
		const favoriteCities = getFavoriteCities();
		setIsFavorite(favoriteCities.includes(location.city));
	}, [location.city]);

	useEffect(() => {
		if (iconRef.current) {
			gsap.to(iconRef.current, {
				scale: isHovered ? 1.2 : 1,
				duration: 0.7,
				ease: 'power2.out',
			});
		}
	}, [isHovered]);

	const handleFavoriteToggle = async (city) => {
		const cityName = city.trim();
		if (cityName.length > 0) {
			const favoriteCities = getFavoriteCities();
			if (favoriteCities.includes(cityName)) {
				removeCityFromFavorites(cityName);
				setIsFavorite(false);
				setIsHovered(false);
			} else {
				addCityToFavorites(cityName);
				setIsFavorite(true);
				setIsHovered(false);
			}
			await fetchWeather(cityName);
		}
	};

	return (
		<Image
			ref={iconRef}
			width={30}
			alt="Favorite"
			src={isHovered ? (isFavorite ? NotFavorite : Favorite) : isFavorite ? Favorite : NotFavorite}
			className="absolute right-5 bottom-5 cursor-pointer"
			onClick={() => handleFavoriteToggle(location.city)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		/>
	);
}

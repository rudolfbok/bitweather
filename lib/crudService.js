'use client';

const isClient = typeof window !== 'undefined';

export const getFavoriteCities = () => {
	if (!isClient) {
		console.warn('localStorage is not available during SSR.');
		return [];
	}

	try {
		const data = localStorage.getItem('favoriteCities');
		return data
			? JSON.parse(data).filter((city) => typeof city === 'string')
			: [];
	} catch (error) {
		console.error('Error reading favorite cities:', error);
		return [];
	}
};

export const addFavoriteCity = (city) => {
	if (!isClient) {
		console.warn('localStorage is not available during SSR.');
		return false;
	}

	try {
		const cityName = typeof city === 'string' ? city.trim() : '';
		if (!cityName) {
			console.warn('City name is invalid.');
			return false;
		}

		const favorites = getFavoriteCities();
		if (favorites.some((fav) => fav.toLowerCase() === cityName.toLowerCase())) {
			console.warn('City is already in favorites.');
			return false;
		}

		favorites.push(cityName);
		localStorage.setItem('favoriteCities', JSON.stringify(favorites));
		return true;
	} catch (error) {
		console.error('Error adding favorite city:', error);
		return false;
	}
};

export const updateFavoriteCity = (oldCity, newCity) => {
	if (!isClient) {
		console.warn('localStorage is not available during SSR.');
		return false;
	}

	try {
		const oldCityName =
			typeof oldCity === 'string' ? oldCity.trim().toLowerCase() : '';
		const newCityName = typeof newCity === 'string' ? newCity.trim() : '';

		if (!newCityName) {
			console.warn('New city name is invalid.');
			return false;
		}

		const favorites = getFavoriteCities();
		const index = favorites.findIndex(
			(fav) => fav.toLowerCase() === oldCityName,
		);
		if (index === -1) {
			console.warn('City not found in favorites.');
			return false;
		}

		favorites[index] = newCityName;
		localStorage.setItem('favoriteCities', JSON.stringify(favorites));
		return true;
	} catch (error) {
		console.error('Error updating favorite city:', error);
		return false;
	}
};

export const removeFavoriteCity = (city) => {
	if (!isClient) {
		console.warn('localStorage is not available during SSR.');
		return false;
	}

	try {
		const cityName = typeof city === 'string' ? city.trim().toLowerCase() : '';
		if (!cityName) {
			console.warn('City name is invalid.');
			return false;
		}

		const favorites = getFavoriteCities();
		const updatedFavorites = favorites.filter(
			(fav) => fav.toLowerCase() !== cityName,
		);

		if (favorites.length === updatedFavorites.length) {
			console.warn('City not found in favorites.');
			return false;
		}

		localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
		return true;
	} catch (error) {
		console.error('Error removing favorite city:', error);
		return false;
	}
};

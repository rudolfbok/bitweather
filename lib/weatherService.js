import i18n from './i18n';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export const fetchWeather = async (city) => {
	const geoUrl = `${BASE_URL}/geo/1.0/direct?q=${city}&limit=3&appid=${API_KEY}`;
	try {
		const geoResponse = await fetch(geoUrl);
		if (!geoResponse.ok) {
			throw new Error(`Error: ${geoResponse.status}`);
		}

		const geoData = await geoResponse.json();
		if (!geoData.length) {
			throw new Error('City not found');
		}
		const { lat, lon, name: cityName, country } = geoData[0];

		const locations = geoData.map(({ lat, lon, name, country }) => ({
			city: name,
			country,
			lat,
			lon,
		}));

		const weatherUrl = `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts&lang=${i18n.language}`;
		const weatherResponse = await fetch(weatherUrl);
		if (!weatherResponse.ok) {
			throw new Error(`Error: ${weatherResponse.status}`);
		}
		const weatherData = await weatherResponse.json();
		return {
			weatherData,
			location: { city: cityName, country },
			latlon: { lat, lng: lon },
			locations,
			error: null,
		};
	} catch (error) {
		console.error('Failed to fetch geo data', error);
		return { error: error.message || 'An unknown error occurred' };
	}
};

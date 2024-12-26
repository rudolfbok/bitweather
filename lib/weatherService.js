import i18n from "./i18n";

export const fetchWeather = async (city) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  try {
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) {
      throw new Error(`Error: ${geoResponse.status}`);
    }
    const geoData = await geoResponse.json();
    if (!geoData.length) {
      throw new Error("City not found");
    }
    const { lat, lon, name: cityName, country } = geoData[0];

    const language = i18n.language;

    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=minutely,alerts&lang=${language}`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error(`Error: ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();
    return {
      weatherData,
      location: { city: cityName, country },
      latlon: { lat, lng: lon },
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch geo data", error);
    return { error: error.message || "An unknown error occurred" };
  }
};

import { useEffect } from "react";
import { useWeather } from "@/lib/weatherContext";
import Image from "next/image";
import Favorite from "@/public/favorite.svg";
import NotFavorite from "@/public/notfavorite.svg";

export default function FavoritesToggle() {
  const { fetchWeather, location, addCityToFavorites, getFavoriteCities, removeCityFromFavorites, setIsFavorite, isFavorite } = useWeather();

  useEffect(() => {
    const favoriteCities = getFavoriteCities();
    if (favoriteCities.includes(location.city)) {
        setIsFavorite(true);
    }
  }, [location.city]);

  const handleFavoriteToggle = async (city) => {
    const cityName = city.trim()
    if (cityName.length > 0) {
        const favoriteCities = getFavoriteCities();
        if (favoriteCities.includes(cityName)) {
            removeCityFromFavorites(cityName);
            setIsFavorite(false);
        } else {
            addCityToFavorites(cityName);
            setIsFavorite(true);
        }
        await fetchWeather(cityName);
    }
  };

  return (
    <Image
      width={40}
      alt="Favorite"
      src={isFavorite ? Favorite : NotFavorite}
      className="cursor-pointer"
      onClick={() => handleFavoriteToggle(location.city)}
    />
  );
}

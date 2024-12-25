"use client";

import Image from "next/image";
import { useWeather } from "@/lib/weatherContext";
import DataCard from "./DataCard";
import DailyWeather from "./DailyWeather";
import HourlyWeather from "./HourlyWeather";
import Map from "./Map";
import FavoritesToggle from "./FavoritesToggle";
import { useTranslation } from "react-i18next";

export default function Hero() {
    
    const { weatherData, location } = useWeather();
    const { t } = useTranslation();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <section className="px-4 md:h-[90vh] pb-4">
            {!weatherData && (
                <p className="text-center h-screen mt-4">
                    Napište do vyhledávacího pole nahoře jakékoliv město.
                    <br />
                    <br />
                    Tato webová aplikace je vytvořena s použitím React JS a dalších frameworků.
                    <br />
                    <br />
                    Založeno na OpenWeatherAPI.
                </p>
            )}

            {weatherData && (
                <div className="grid grid-cols-1 md:grid-cols-3 h-full md:gap-4">
                    <div className="flex flex-col items-center justify-between">
                        <div className="w-full h-full rounded-3xl flex items-center justify-center backdrop-blur-xl md:bg-black/5">
                            <div className="text-center text-xl items-center flex flex-col">
                                <FavoritesToggle/>
                                <h1 className="text-3xl md:mt-0 my-4 md:text-4xl">{location.city}, {location.country}</h1>
                                <span className="text-5xl">{Math.round(weatherData.current.temp)}°C</span>
                                <img
                                    src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0]?.icon}@4x.png`}
                                    width={150}
                                    alt="Weather Icon"
                                    className="md:w-[180px]"
                                />
                                <div className="flex justify-center items-center text-xl">
                                    <Image src="/icons/temp_min.svg" height={25} width={25} alt="Min Temp" />
                                    <span>{`${Math.round(weatherData.daily[0].temp.min)}°C`}</span>
                                    <Image src="/icons/temp_max.svg" height={25} width={25} alt="Max Temp" />
                                    <span>{`${Math.round(weatherData.daily[0].temp.max)}°C`}</span>
                                </div>
                                <p className="my-1">{t("temp_feels")}: {Math.round(weatherData.current.feels_like)}°C</p>
                                <p className="font-semibold">{capitalizeFirstLetter(weatherData.current.weather[0].description)}</p>
                            </div>
                        </div>
                        <HourlyWeather />
                    </div>

                    <div className="flex flex-col">
                        <DailyWeather />
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 py-4">
                            <DataCard icon="/icons/humidity.svg" headline={t("humidity")} data={`${weatherData.current.humidity}%`} />
                            <DataCard icon="/icons/pressure.svg" headline={t("pressure")} data={`${weatherData.current.pressure}hPa`} />
                            <DataCard icon="/icons/rain.svg" headline={t("rain")} data={`${Math.round((weatherData.daily[0]?.rain ?? 0) * 10) / 10}mm`} />
                            <DataCard icon="/icons/sun.svg" headline="UV" data={Math.round(weatherData.daily[0]?.uvi)} />
                            <DataCard icon="/icons/visibility.svg" headline={t("visibility")} data={`${Math.round(weatherData.current.visibility / 1000)}km`} />
                            <DataCard icon="/icons/wind.svg" headline={t("wind")} data={`${weatherData.current.wind_speed}m/s`} />
                            <DataCard icon="/icons/sunrise.svg" headline={t("sunrise")} data={formatTime(weatherData.current.sunrise)} />
                            <DataCard icon="/icons/sunset.svg" headline={t("sunset")} data={formatTime(weatherData.current.sunset)} />
                        </div>
                    </div>

                    <div>
                        <Map />
                    </div>
                </div>
            )}
        </section>
    );
}

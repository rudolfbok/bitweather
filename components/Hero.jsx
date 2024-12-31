"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useWeather } from "@/lib/weatherContext";
import DataCard from "./DataCard";
import DailyWeather from "./DailyWeather";
import HourlyWeather from "./HourlyWeather";
import Map from "./Map";
import FavoritesToggle from "./FavoritesToggle";
import { useTranslation } from "react-i18next";

import Nameday from "./Nameday"
import RoundBox from "@/types/RoundBox";

export default function Hero() {
  const { weatherData, location, error, setBackground } = useWeather();
  const { t } = useTranslation();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const columnRef = useRef(null);

  useEffect(() => {
    {
      gsap.fromTo(
        columnRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.in" },
      );
    }
  }, [location.city]);

  const handleBackgrounds = (event) => {
    setBackground(false)
};

  return (
    <section className="px-4">
      {error && !weatherData && (
        <p className="text-center mt-6 font-semibold">{t("error")}</p>
      )}

      {!weatherData && !error && (
        <div className="font-bold text-2xl">
          BitWeather
          <button onClick={handleBackgrounds}>Permit backgrounds</button>
        </div>
      )}

      {weatherData && (
        <div
          ref={columnRef}
          className="grid grid-cols-1 md:grid-cols-3 md:gap-4"
        >
          <div className="flex flex-col items-center">
            
            <RoundBox>
              <div className="w-full flex justify-end pr-6 items-center -mb-12 md:-mb-9 py-4">
                <FavoritesToggle />
              </div>
              <div className="text-center text-xl items-center flex flex-col md:my-8">
                
                <h1 className="text-3xl md:mt-0 my-4 md:text-4xl">
                  {location.city}, {location.country}
                </h1>
                <span className="text-5xl">
                  {Math.round(weatherData.current.temp)}°C
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0]?.icon}@4x.png`}
                  width={150}
                  alt="Weather Icon"
                  className="md:w-[180px]"
                />
                <div className="flex justify-center items-center text-xl">
                  <Image
                    src="/icons/tempmin.svg"
                    height={25}
                    width={25}
                    alt="Min Temp"
                  />
                  <span>{`${Math.round(weatherData.daily[0].temp.min)}°C`}</span>
                  <Image
                    src="/icons/tempmax.svg"
                    height={25}
                    width={25}
                    alt="Max Temp"
                  />
                  <span>{`${Math.round(weatherData.daily[0].temp.max)}°C`}</span>
                </div>
                <p className="my-1">
                  {t("temp_feels")}:{" "}
                  {Math.round(weatherData.current.feels_like)}°C
                </p>
                <p className="font-semibold">
                  {capitalizeFirstLetter(
                    weatherData.current.weather[0].description,
                  )}
                </p>
              </div>
            </RoundBox>
            <HourlyWeather />
          </div>

          <div className="flex flex-col">
            <DailyWeather />
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mt-5">
              <DataCard
                icon="/icons/humidity.svg"
                headline={t("humidity")}
                data={`${weatherData.current.humidity}%`}
              />
              <DataCard
                icon="/icons/pressure.svg"
                headline={t("pressure")}
                data={`${weatherData.current.pressure}hPa`}
              />
              <DataCard
                icon="/icons/rain.svg"
                headline={t("rain")}
                data={`${Math.round((weatherData.daily[0]?.rain ?? 0) * 10) / 10}mm`}
              />
              <DataCard
                icon="/icons/sun.svg"
                headline="UV Index"
                data={Math.round(weatherData.daily[0]?.uvi)}
              />
              <DataCard
                icon="/icons/visibility.svg"
                headline={t("visibility")}
                data={`${Math.round(weatherData.current.visibility / 1000)}km`}
              />
              <DataCard
                icon="/icons/wind.svg"
                headline={t("wind")}
                data={`${weatherData.current.wind_speed}m/s`}
              />
              <DataCard
                icon="/icons/sunrise.svg"
                headline={t("sunrise")}
                data={formatTime(weatherData.current.sunrise)}
              />
              <DataCard
                icon="/icons/sunset.svg"
                headline={t("sunset")}
                data={formatTime(weatherData.current.sunset)}
              />
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

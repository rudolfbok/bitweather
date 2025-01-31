'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useWeather } from '@/lib/weatherContext';
import DataCard from './DataCard';
import DailyWeather from './DailyWeather';
import HourlyWeather from './HourlyWeather';
import Map from './Map';
import FavoritesToggle from './FavoritesToggle';
import { useTranslation } from 'react-i18next';

import TempMin from '@/public/icons/tempmin.svg';
import TempMinDark from '@/public/icons/tempmin-dark.svg';
import TempMax from '@/public/icons/tempmax.svg';
import TempMaxDark from '@/public/icons/tempmax-dark.svg';

export default function Hero() {
	const { weatherData, location, error, isDarkMode, getIconPath } = useWeather();
	const { t } = useTranslation();

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const formatTime = (timestamp) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const columnRef = useRef(null);

	useEffect(() => {
		{
			gsap.fromTo(
				columnRef.current,
				{ opacity: 0 },
				{
					opacity: 1,
					duration: 0.5,
					ease: 'power2.in',
				},
			);
		}
	}, [location.city]);

	const currentIconCode = weatherData?.current?.weather[0]?.icon;
	const currentIconPath = getIconPath(currentIconCode);

	return (
		<section>
			{error && !weatherData && <p className="text-center mt-6 font-semibold">{t('error')}</p>}

			{!weatherData && !error && (
				<div className="flex flex-col text-center h-[70vh] place-content-center space-y-4">
					Welcome
				</div>
			)}

			{weatherData && (
				<div ref={columnRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
					<div id="mainbox" className="flex flex-col w-full items-center mt-4">
						<div className="text-center text-xl items-center flex flex-col relative w-full">
							<span className="text-3xl md:text-4xl">
								{location.city}, {location.country}
							</span>
							<span className="text-5xl pt-2">
								{Math.round(weatherData.current.temp)}
								°C
							</span>
							<img src={currentIconPath} width={150} alt="Weather Icon" className="md:w-[180px]" />
							<div className="flex justify-center items-center">
								<Image
									src={isDarkMode ? TempMinDark : TempMin}
									height={25}
									width={25}
									alt="Min Temp"
								/>
								<span>{`${Math.round(weatherData.daily[0].temp.min)}°C`}</span>
								<Image
									src={isDarkMode ? TempMaxDark : TempMax}
									height={25}
									width={25}
									alt="Max Temp"
								/>
								<span>{`${Math.round(weatherData.daily[0].temp.max)}°C`}</span>
							</div>
							<p className="my-1">
								{t('temp_feels')}: {Math.round(weatherData.current.feels_like)}
								°C
							</p>
							<p className="font-semibold">
								{capitalizeFirstLetter(weatherData.current.weather[0].description)}
							</p>
							<FavoritesToggle />
						</div>
						<HourlyWeather />
					</div>

					<div className="flex flex-col">
						<DailyWeather />
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
							<DataCard
								icon="/icons/humidity.svg"
								headline={t('humidity')}
								data={`${weatherData.current.humidity}%`}
							/>
							<DataCard
								icon="/icons/pressure.svg"
								headline={t('pressure')}
								data={`${weatherData.current.pressure}hPa`}
							/>
							<DataCard
								icon="/icons/rain.svg"
								headline={t('rain')}
								data={`${Math.round((weatherData.daily[0]?.rain ?? 0) * 10) / 10}mm`}
							/>
							<DataCard
								icon="/icons/uv.svg"
								headline="UV Index"
								data={Math.round(weatherData.daily[0]?.uvi)}
							/>
							<DataCard
								icon="/icons/visibility.svg"
								headline={t('visibility')}
								data={`${Math.round(weatherData.current.visibility / 1000)}km`}
							/>
							<DataCard
								icon="/icons/wind.svg"
								headline={t('wind')}
								data={`${weatherData.current.wind_speed}m/s`}
							/>
							<DataCard
								icon="/icons/sunrise.svg"
								headline={t('sunrise')}
								data={formatTime(weatherData.current.sunrise)}
							/>
							<DataCard
								icon="/icons/sunset.svg"
								headline={t('sunset')}
								data={formatTime(weatherData.current.sunset)}
							/>
						</div>
					</div>
					<Map />
				</div>
			)}
		</section>
	);
}

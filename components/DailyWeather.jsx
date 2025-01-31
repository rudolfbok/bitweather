import { useContext, useEffect, useRef } from 'react';
import { useWeather } from '@/lib/weatherContext';
import Image from 'next/image';
import Calendar from '@/public/icons/calendar.svg';
import ThreeDots from '@/public/threedots.svg';
import ThreeDotsDark from '@/public/threedotsdark.svg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import gsap from 'gsap';

import { translateToCzech } from '@/lib/translateService';

export default function DailyWeather() {
	const { weatherData, getIconPath, isDarkMode } = useWeather();
	const [openSummaryIndex, setOpenSummaryIndex] = useState([]);
	const [translatedSummaries, setTranslatedSummaries] = useState({});
	const dotsRef = useRef();
	const summaryRef = useRef([]);

	const { t, i18n } = useTranslation();

	const getDayOfWeek = (timestamp) => {
		const date = new Date(timestamp * 1000);
		const locale = getLocale(i18n.language);
		return date.toLocaleString(locale, { weekday: 'long' });
	};

	const getDayMonth = (timestamp) => {
		const date = new Date(timestamp * 1000);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		return `${day}.${month}.`;
	};

	const getLocale = (lang) => {
		switch (lang) {
			case 'cz':
				return 'cs-CZ';
			case 'en':
				return 'en-US';
		}
	};

	const handleSummaryClick = () => {
		if (openSummaryIndex.length === weatherData.daily.slice(1, 8).length) {
			setOpenSummaryIndex([]);
		} else {
			setOpenSummaryIndex(weatherData.daily.slice(1, 8).map((_, idx) => idx));
		}
	};

	useEffect(() => {
		openSummaryIndex.forEach((index) => {
			const summary = summaryRef.current[index];
			if (summary) {
				gsap.fromTo(summary, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.in' });
			}
		});
	}, [openSummaryIndex]);

	useEffect(() => {
		if (i18n.language === 'cz') {
			const fetchTranslations = async () => {
				const translations = [];
				const delay = 500; // Delay in milliseconds

				for (let index = 0; index < 7; index++) {
					const translatedText = await translateToCzech(weatherData.daily[index + 1].summary);
					translations[index] = translatedText;
					await new Promise((resolve) => setTimeout(resolve, delay));
				}

				setTranslatedSummaries(translations);
			};

			fetchTranslations();
		}
	}, [i18n.language, weatherData]);

	return (
		<div className="flex flex-col rounded-2xl w-full bg-zinc-500/5 items-center mt-4 p-4">
			<div className="flex h-auto w-full mb-2 items-center">
				<Image src={Calendar} alt="Daily forecast" height={25} width={25} />
				<span className="flex w-full font-semibold ml-1">{t('daily')}</span>
				<Image
					ref={dotsRef}
					alt="Detailed forecast"
					src={isDarkMode ? ThreeDotsDark : ThreeDots}
					width={20}
					height={20}
					onClick={handleSummaryClick}
					className="cursor-pointer mx-3"
				/>
			</div>
			<div className="flex flex-col w-full justify-center">
				{weatherData.daily.slice(1, 8).map((day, index) => {
					const dayName = getDayOfWeek(day.dt);
					const dailyIconCode = day.weather[0].icon;
					const dailyIconPath = getIconPath(dailyIconCode);
					const monthNumber = getDayMonth(day.dt);
					return (
						<div key={index}>
							<div className="flex flex-row items-center justify-between">
								<span className="w-full font-bold">{dayName}</span>
								<span className="text-xs w-full">{day.weather[0].description}</span>
								<div className="grid grid-cols-3 items-center">
									<span className="block text-center">{`${Math.round(day.temp.min)}°C`}</span>
									<img
										src={dailyIconPath}
										width={120}
										height={120}
										alt={day.weather[0].description}
									/>
									<span className="text-center font-bold">{`${Math.round(day.temp.max)}°C`}</span>
								</div>
							</div>
							{openSummaryIndex.includes(index) && (
								<div ref={(el) => (summaryRef.current[index] = el)}>
									<p className="text-sm">
										{i18n.language === 'cz' ? translatedSummaries[index] : day.summary}
									</p>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

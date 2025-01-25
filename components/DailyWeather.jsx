import { useEffect, useRef } from 'react';
import { useWeather } from '@/lib/weatherContext';
import Image from 'next/image';
import Calendar from '@/public/icons/calendar.svg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import gsap from 'gsap';

export default function DailyWeather() {
	const { weatherData, getIconPath, isDarkMode } = useWeather();
	const [openSummaryIndex, setOpenSummaryIndex] = useState(null);
	const arrowRef = useRef();

	const { t, i18n } = useTranslation();

	const getDayOfWeek = (timestamp) => {
		const date = new Date(timestamp * 1000);
		const locale = getLocale(i18n.language);
		return date.toLocaleString(locale, { weekday: 'long' });
	};

	const getLocale = (lang) => {
		switch (lang) {
			case 'cz':
				return 'cs-CZ';
			case 'en':
				return 'en-US';
		}
	};

	const handleSummaryClick = (index) => {
		if (!arrowRef.current) arrowRef.current = [];
		setOpenSummaryIndex(openSummaryIndex === index ? null : index);
		gsap.to((arrowRef.current = [index]), {
			rotation: 90,
			duration: 2,
			ease: 'power2.inOut',
		});
	};

	return (
		<div className="flex flex-col rounded-3xl w-full bg-zinc-500/5 items-center mt-4 p-4">
			<div className="flex h-auto w-full mb-2 items-center">
				<Image src={Calendar} alt="Daily forecast" height={25} width={25} />
				<span className="flex w-full font-semibold ml-1">{t('daily')}</span>
			</div>
			<div className="flex flex-col w-full space-y-2 lg:space-y-0">
				{weatherData.daily.slice(1, 8).map((day, index) => {
					const dayName = getDayOfWeek(day.dt);
					const dailyIconCode = day.weather[0].icon;
					const dailyIconPath = getIconPath(dailyIconCode);
					return (
						<div key={index}>
							<div className="flex flex-row items-center last:border-none justify-between">
								<span className="w-full font-bold">{dayName}</span>
								<span className="text-xs w-full">
									{day.weather[0].description}
								</span>
								<div className="grid grid-cols-3 items-center">
									<span className="flex justify-center">{`${Math.round(day.temp.min)}°C`}</span>
									<img
										src={dailyIconPath}
										width={120}
										alt={day.weather[0].description}
									/>
									<span className="flex justify-center font-bold">{`${Math.round(day.temp.max)}°C`}</span>
								</div>
								<div
									className="cursor-pointer"
									onClick={() => handleSummaryClick(index)}
								>
									<img
										ref={arrowRef}
										src={isDarkMode ? 'dropdown.png' : 'dropdowndark.png'}
										width={8}
										className="mx-2"
									/>
								</div>
							</div>
							{openSummaryIndex === index && (
								<div>
									<p className="text-sm">{day.summary}</p>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

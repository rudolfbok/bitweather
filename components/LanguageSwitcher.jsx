import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useWeather } from '@/lib/weatherContext';

export default function LanguageSwitcher() {
	const { i18n, t } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
	const { setError, setWeatherData } = useWeather();

	const handleLanguageChange = (event) => {
		const lang = event.target.value;
		i18n.changeLanguage(lang);
		setCurrentLanguage(lang);
	};

	return (
		<div className="flex flex-col space-y-2">
			<span className="text-center">{t('language')}</span>
			<div className="relative inline-block">
				<select
					value={currentLanguage}
					onChange={handleLanguageChange}
					className="appearance-none rounded-full focus:outline-none pl-3 pr-10 text-center w-full cursor-pointer bg-black/5 h-[35px]"
				>
					<option value="en">English</option>
					<option value="cz">Česky</option>
				</select>
				<div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-500"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z" />
					</svg>
				</div>
			</div>
		</div>
	);
}

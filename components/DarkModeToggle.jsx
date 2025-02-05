import { useWeather } from '@/lib/weatherContext';

import { ToggleSlider } from 'react-toggle-slider';

import Image from 'next/image';

import LightModeIcon from '@/public/lightmode.svg';
import DarkModeIcon from '@/public/darkmode.svg';
import { useTranslation } from 'react-i18next';

export default function DarkModeToggle() {
	const { setIsDarkMode, isDarkMode } = useWeather();
	const { t } = useTranslation();

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		if (!isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	return (
		<div className="flex flex-row justify-center items-center gap-2">
			<ToggleSlider onToggle={toggleDarkMode} />
			<span>{isDarkMode ? t('darkmode') : t('lightmode')}</span>
			<Image
				src={isDarkMode ? DarkModeIcon : LightModeIcon}
				alt={isDarkMode ? 'Dark Mode Icon' : 'Light Mode Icon'}
				height={24}
				width={24}
			/>
		</div>
	);
}

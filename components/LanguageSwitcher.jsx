import { useWeather } from '@/lib/weatherContext';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
	const { i18n, t } = useTranslation();
	const { currentLanguage, setCurrentLanguage } = useWeather();

	const handleLanguageChange = (event) => {
		const lang = event.target.value;
		i18n.changeLanguage(lang);
		setCurrentLanguage(lang);
	};

	return (
		<div className="flex flex-col space-y-2">
			<span className="text-center">{t('language')}</span>
			<div className="flex justify-center gap-2">
				<button className="hover:underline" value="en" onClick={handleLanguageChange}>
					{t('english')}
				</button>
				<span>|</span>
				<button className="hover:underline" value="cz" onClick={handleLanguageChange}>
					{t('czech')}
				</button>
			</div>
		</div>
	);
}

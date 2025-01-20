import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '@/public/locales/en/common.json';
import czTranslation from '@/public/locales/cz/common.json';

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: enTranslation },
		cz: { translation: czTranslation },
	},
	lng: 'cz',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
});

export default i18n;

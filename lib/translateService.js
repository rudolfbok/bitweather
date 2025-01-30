import i18n from './i18n';

const DEEPL_API_KEY = process.env.NEXT_PUBLIC_DEEPL_API_KEY;

export const translateToCzech = async (text) => {
	if (i18n.language === 'cz') {
		const response = await fetch(
			`https://api-free.deepl.com/v2/translate?auth_key=${DEEPL_API_KEY}&text=${encodeURIComponent(text)}&target_lang=CS`,
		);
		const data = await response.json();
		return data.translations[0].text;
	}
	return text;
};

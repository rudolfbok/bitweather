import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleLanguageChange = (event) => {
    const lang = event.target.value; // Ensure this gets the selected language
    i18n.changeLanguage(lang); // Pass the language code to i18n
    setCurrentLanguage(lang); // Update local state
  };

  return (
    <div className="relative inline-block my-4 md:my-0">
      <select value={currentLanguage} onChange={handleLanguageChange} className="appearance-none rounded-full focus:outline-none pl-4 pr-10 text-center w-full cursor-pointer bg-black/5 h-[35px]">
        <option value="en">English</option>
        <option value="cz">Česky</option>
      </select>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"/>
        </svg>
      </div>
    </div>

  );
}

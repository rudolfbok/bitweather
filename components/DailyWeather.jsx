import { useWeather } from "@/lib/weatherContext";
import Image from "next/image";
import Calendar from "@/public/icons/calendar.svg";
import { useTranslation } from "react-i18next";

export default function DailyWeather() {
  const { weatherData } = useWeather();

  const { t, i18n } = useTranslation();

  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const locale = getLocale(i18n.language);
    return date.toLocaleString(locale, { weekday: "long" });
  };

  const getLocale = (lang) => {
    switch (lang) {
      case "cz":
        return "cs-CZ";
      case "en":
        return "en-US";
    }
  };

  return (
    <div className="flex flex-col rounded-3xl backdrop-blur-3xl bg-black/5 text-white w-full items-center p-3 max-h-1/2">
      <div className="flex h-auto w-full mb-2 items-center">
        <Image src={Calendar} alt="Daily forecast" height={25} width={25} />
        &nbsp;
        <span className="flex w-full font-bold">{t("daily")}</span>
      </div>
      <div className="flex flex-col w-full">
        {weatherData.daily.slice(1, 8).map((day, index) => {
          const dayName = getDayOfWeek(day.dt);
          return (
            <div
              key={index}
              className="flex flex-row items-center last:border-none justify-between"
            >
              <span className="w-full font-bold">{dayName}</span>
              <span className="text-xs w-full">
                {day.weather[0].description}
              </span>
              <div className="grid grid-cols-3 items-center">
                <span className="flex justify-center">{`${Math.round(day.temp.min)}°C`}</span>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  width={150}
                  alt={day.weather[0].description}
                />
                <span className="flex justify-center font-bold">{`${Math.round(day.temp.max)}°C`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

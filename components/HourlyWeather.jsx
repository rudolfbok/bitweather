import { useWeather } from "@/lib/weatherContext";
import Image from "next/image";
import Clock from "@/public/icons/clock.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

import RoundBox from "@/types/RoundBox"

export default function DailyWeather() {
  const { weatherData } = useWeather();

  const { t } = useTranslation();

  const getHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", hour12: false });
  };

  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    rows: 1,
  };

  return (
    <RoundBox>
      <div className="flex h-auto w-full mb-4">
        <Image src={Clock} alt="Daily forecast" height={25} width={25} />
        &nbsp;&nbsp;
        <span className="flex w-full font-semibold">{t("hourly")}</span>
      </div>
      <Slider {...settings} className="w-full mb-5">
        {weatherData.hourly.slice(1, 24).map((hour, index) => {
          const hourFormatted = getHour(hour.dt);
          return (
            <div
              key={index}
              className="flex flex-col place-items-center text-center"
            >
              <span className="font-bold text-sm">{hourFormatted}</span>
              <Image
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                width={70}
                height={70}
                alt="Weather Icon"
              />
              <span className="text-sm">{`${Math.round(hour.temp)}°C`}</span>
            </div>
          );
        })}
      </Slider>
    </RoundBox>
  );
}

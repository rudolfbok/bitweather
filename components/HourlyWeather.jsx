import { useWeather } from '@/lib/weatherContext';
import Clock from '@/public/icons/clock.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function DailyWeather() {
	const { weatherData, getIconPath, isDarkMode } = useWeather();

	const { t } = useTranslation();

	const getHour = (timestamp) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			hour12: false,
		});
	};

	function NextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={`w-5 absolute right-3 top-[50%] cursor-pointer hidden ${onClick ? 'lg:block' : ''}`}
			>
				<img
					src={isDarkMode ? '/arrowright.svg' : '/arrowrightdark.svg'}
					className={className}
					onClick={onClick}
					style={{ ...style }}
				/>
			</div>
		);
	}

	function PreviousArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={`w-5 absolute left-3 top-[50%] cursor-pointer hidden ${onClick ? 'lg:block' : ''}`}
			>
				<img
					src={isDarkMode ? '/arrowleft.svg' : '/arrowleftdark.svg'}
					className={className}
					onClick={onClick}
					style={{ ...style }}
				/>
			</div>
		);
	}

	const settings = {
		dots: true,
		customPaging: (i) => (
			<div id="dots" className='mt-2'>
				<img src={isDarkMode ? '/carouseldot-dark.svg' : '/carouseldot.svg'} />
			</div>
		),
		infinite: false,
		arrow: true,
		initialSlide: 0,
		adaptiveWidth: true,
		prevArrow: <PreviousArrow />,
		nextArrow: <NextArrow />,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 6,
		rows: 1,
	};

	return (
		<div className="flex flex-col rounded-2xl w-full bg-zinc-500/5 items-center pt-4 pb-8 px-4 md:px-6 mt-4">
			<div className="flex h-auto w-full mb-4">
				<Image src={Clock} alt="Hourly forecast" height={25} width={25} />
				<span className="flex w-full font-semibold ml-1">{t('hourly')}</span>
			</div>
			<Slider {...settings} className="w-full">
				{weatherData.hourly.slice(1, 24).map((hour, index) => {
					const hourFormatted = getHour(hour.dt);
					const hourlyIconCode = hour.weather[0].icon;
					const hourlyIconPath = getIconPath(hourlyIconCode);
					return (
						<div key={index} className="flex flex-col place-items-center text-center">
							<span className="font-bold text-sm">{hourFormatted}</span>
							<Image src={hourlyIconPath} width={60} height={60} alt="Weather Icon" />
							<span className="text-sm">{`${Math.round(hour.temp)}°C`}</span>
						</div>
					);
				})}
			</Slider>
		</div>
	);
}

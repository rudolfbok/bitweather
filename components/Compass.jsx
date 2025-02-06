'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWeather } from '@/lib/weatherContext';

export default function Compass() {
	const { t } = useTranslation();
	const { isDarkMode } = useWeather();
	const [direction, setDirection] = useState(null); // Compass heading in degrees
	const [permissionGranted, setPermissionGranted] = useState(false);

	// Request permissions for iOS devices
	const requestPermission = async () => {
		const DeviceOrientationEventWithPermission = DeviceOrientationEvent;

		if (typeof DeviceOrientationEventWithPermission.requestPermission === 'function') {
			try {
				const permission = await DeviceOrientationEventWithPermission.requestPermission();
				if (permission === 'granted') {
					setPermissionGranted(true);
				} else {
					console.error('Permission denied for device orientation.');
				}
			} catch (error) {
				console.error('Error requesting permission:', error);
			}
		} else {
			setPermissionGranted(true);
		}
	};

	// Set up event listener for device orientation
	useEffect(() => {
		if (!permissionGranted) return;

		const handleOrientation = (event) => {
			if (event.webkitCompassHeading !== null) {
				// Here we make sure that the alpha value is updated correctly
				setDirection(event.webkitCompassHeading); // Update compass direction with the 'alpha' angle
			}
		};

		// Add event listener for device orientation
		window.addEventListener('deviceorientation', handleOrientation);

		// Clean up event listener when component is unmounted
		return () => {
			window.removeEventListener('deviceorientation', handleOrientation);
		};
	}, [permissionGranted]);

	const getDirectionLabel = (angle) => {
		if ((angle >= 340 && angle <= 360) || (angle >= 0 && angle <= 20)) return t('north');
		if (angle > 20 && angle < 70) return t('northeast');
		if (angle >= 70 && angle <= 110) return t('east');
		if (angle > 110 && angle < 160) return t('southeast');
		if (angle >= 160 && angle <= 200) return t('south');
		if (angle > 200 && angle < 250) return t('southwest');
		if (angle >= 250 && angle <= 290) return t('west');
		if (angle > 290 && angle < 340) return t('northwest');
		return t('north'); // Fallback
	};

	return (
		<div className="flex items-center justify-center h-[70vh] bg-background rounded-3xl">
			<div className="flex flex-col justify-center items-center space-y-8">
				<div className={`border-2 border-black p-10 relative rounded-full ${isDarkMode ? 'border-white' : 'border-black'}`}>
					<span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 text-lg font-bold">
						0
					</span>
					<span className="absolute bottom-[-35px] left-1/2 transform -translate-x-1/2 text-lg font-bold">
						180
					</span>
					<span className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 text-lg font-bold">
						270
					</span>
					<span className="absolute top-1/2 right-[10px] transform -translate-y-1/2 text-lg font-bold">
						90
					</span>
					<div className="relative w-[160px] h-[160px]">
						<div className="absolute top-[-15px] left-[-50%] transform -translate-x-1/2 text-lg font-bold">
							<img src="/compassarrow.svg" alt="North arrow" className='' />
						</div>
						<div
							className="absolute left-1/2 w-0.5 h-20 bg-red-500 origin-bottom transform -translate-x-1/2"
							style={{
								transform: `rotate(${direction ?? 0}deg)`,
							}}
						/>
						<div
							className={`absolute inset-0 w-full h-full rounded-full border-2 border-black text-black ${isDarkMode ? 'border-white' : 'border-black'}`}
						>
							<span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xl font-bold">
								{t('northlabel')}
							</span>
							<span className="absolute top-1/2 left-0 transform -translate-y-1/2 text-xl font-bold">
								{t('westlabel')}
							</span>
							<span className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xl font-bold">
								{t('eastlabel')}
							</span>
							<span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xl font-bold">
								{t('southlabel')}
							</span>
						</div>
					</div>
				</div>
				<div className='flex flex-row gap-2'>
					<span className="text-red-500 font-bold">{Math.round(direction)}°</span>
					<span>-</span>
					<span>{getDirectionLabel(Math.round(direction)) || t('directionerror')}</span>
				</div>
			</div>
			{permissionGranted ? (
				<div className="flex flex-col justify-center items-center space-y-4">
					<div className={`border-2 border-black p-10 relative rounded-full ${isDarkMode ? 'border-white' : 'border-black'}`}>
						<span className="absolute top-[-35] left-1/2 transform -translate-x-1/2 text-lg font-bold">
							0
						</span>
						<span className="absolute bottom-[-35px] left-1/2 transform -translate-x-1/2 text-lg font-bold">
							180
						</span>
						<span className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 text-lg font-bold">
							270
						</span>
						<span className="absolute top-1/2 right-[-35px] transform -translate-y-1/2 text-lg font-bold">
							90
						</span>
						<div className="absolute top-[-15px] left-[50px] text-lg font-bold">
							<img src="/compassarrow.svg" alt="North arrow" />
						</div>
						<div className="relative w-40 h-40">
							<div
								className="absolute left-1/2 w-0.5 h-20 bg-red-500 origin-bottom transform -translate-x-1/2"
								style={{
									transform: `rotate(${direction ?? 0}deg)`,
								}}
							/>
							<div
								className={`absolute inset-0 w-full h-full rounded-full border-2 border-black text-black ${isDarkMode ? 'border-white' : 'border-black'}`}
							>
								<span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xl font-bold">
									{t('northlabel')}
								</span>
								<span className="absolute top-1/2 left-0 transform -translate-y-1/2 text-xl font-bold">
									{t('westlabel')}
								</span>
								<span className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xl font-bold">
									{t('eastlabel')}
								</span>
								<span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xl font-bold">
									{t('southlabel')}
								</span>
							</div>
						</div>
					</div>
					<div className='flex flex-row gap-2'>
						<span className="text-red-500 font-bold">{Math.round(direction)}°</span>
						<span>-</span>
						<span>{getDirectionLabel(Math.round(direction)) || t('directionerror')}</span>
					</div>
				</div>
			) : (
				<div className="text-center space-y-4">
					<p>{t('compasstext')}</p>
					<button
						onClick={requestPermission}
						className="rounded-2xl p-2 px-4 bg-zinc-500/10 cursor-pointer"
					>
						{t('compassbutton')}
					</button>
				</div>
			)}
		</div>
	);
}

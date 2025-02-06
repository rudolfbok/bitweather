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
		if (angle >= 0 && angle < 45) return t('north');
		if (angle >= 45 && angle < 90) return t('northeast');
		if (angle >= 90 && angle < 135) return t('east');
		if (angle >= 135 && angle < 180) return t('southeast');
		if (angle >= 180 && angle < 225) return t('south');
		if (angle >= 225 && angle < 270) return t('southwest');
		if (angle >= 270 && angle < 315) return t('west');
		return t('northwest'); // Covers 315–360
	  };

	return (
		<div className="flex items-center justify-center h-[70vh] bg-background rounded-3xl">
			{permissionGranted ? (
				<div className="flex flex-col justify-center items-center space-y-4">
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
								{t('north')}
							</span>
							<span className="absolute top-1/2 left-0 transform -translate-y-1/2 text-xl font-bold">
								{t('west')}
							</span>
							<span className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xl font-bold">
								{t('east')}
							</span>
							<span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xl font-bold">
								{t('south')}
							</span>
						</div>
					</div>
					<span>{getDirectionLabel(Math.round(direction)) || t('directionerror')}</span>
					<span className="text-red-500 font-bold">{Math.round(direction)}°</span>
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

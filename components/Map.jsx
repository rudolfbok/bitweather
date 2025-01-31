import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useWeather } from '@/lib/weatherContext';
import Image from 'next/image';
import MapIcon from '@/public/icons/map.svg';
import { useTranslation } from 'react-i18next';

export default function Map() {
	const { t } = useTranslation();
	const { latlon, isDarkMode, isOpen } = useWeather();
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	const mapOptions = {
		disableDefaultUI: true,
		styles: isDarkMode
			? [
					{
						elementType: 'geometry',
						stylers: [{ color: '#1B2331' }],
					},
					{
						elementType: 'labels.icon',
						stylers: [{ visibility: 'on' }],
					},
					{
						elementType: 'labels.text.fill',
						stylers: [{ color: '#757575' }],
					},
					{
						elementType: 'labels.text.stroke',
						stylers: [{ color: '#212121' }],
					},
					{
						featureType: 'administrative',
						elementType: 'geometry',
						stylers: [{ color: '#757575' }],
					},
					{
						featureType: 'administrative.country',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#1B2331' }],
					},
					{
						featureType: 'administrative.land_parcel',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#1B2331' }],
					},
					{
						featureType: 'poi',
						elementType: 'geometry',
						stylers: [{ color: '#143D41' }],
					},
					{
						featureType: 'poi',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#FFFFFF' }],
					},
					{
						featureType: 'road',
						elementType: 'geometry',
						stylers: [{ color: '#42566D' }],
					},
					{
						featureType: 'road',
						elementType: 'labels.icon',
						stylers: [{ visibility: 'on' }],
					},
					{
						featureType: 'road',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#FFFFFF' }],
					},
					{
						featureType: 'road',
						elementType: 'labels.text.stroke',
						stylers: [{ color: '#000000' }],
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry',
						stylers: [{ color: '4A6B96' }],
					},
					{
						featureType: 'road.highway',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#FFFFFF' }],
					},
					{
						featureType: 'road.local',
						elementType: 'geometry',
						stylers: [{ color: '#42576E' }],
					},
					{
						featureType: 'transit',
						elementType: 'geometry',
						stylers: [{ color: '#42566D' }],
					},
					{
						featureType: 'transit.station',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#FFFFFF' }],
					},
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [{ color: '#06080C' }],
					},
					{
						featureType: 'water',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#FFFFFFF' }],
					},
				]
			: [],
	};

	if (!isLoaded) return <div>Loading Map...</div>;

	return (
		<div
			className={`flex flex-col rounded-2xl w-full bg-zinc-500/5 items-center my-auo p-4 aspect-square my-4 ${isOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
		>
			<div className="flex h-auto w-full items-center mb-4">
				<Image src={MapIcon} alt="Mapa" height={25} width={25} />
				<span className="flex w-full font-semibold ml-1">{t('map')}</span>
			</div>
			<GoogleMap
				center={latlon}
				zoom={12}
				options={mapOptions}
				mapContainerStyle={{
					width: '100%',
					borderRadius: '1rem',
					aspectRatio: '1 / 1',
					color: 'black',
				}}
			>
				<Marker position={latlon} />
			</GoogleMap>
		</div>
	);
}

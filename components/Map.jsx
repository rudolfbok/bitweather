import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useWeather } from "@/lib/weatherContext";
import Image from "next/image";
import MapIcon from "@/public/icons/map.svg";
import { useTranslation } from "react-i18next";

export default function Map() {
  const { isDarkMode } = useWeather();
  const { t } = useTranslation();
  const { latlon } = useWeather();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const mapOptions = {
    disableDefaultUI: true,
    styles: isDarkMode ? [
      {
        elementType: "geometry",
        stylers: [{ color: "#212121" }],
      },
      {
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#212121" }],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#757575" }],
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#bdbdbd" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#757575" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#212121" }],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#212121" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "red" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#1f1f1f" }],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#212121" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000000" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#3d3d3d" }],
      },
    ] : [],
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
   <div id="mapbox" className="flex flex-col rounded-3xl w-full bg-black/5 items-center mt-4 p-4">
      <div className="flex h-auto w-full items-center mb-4">
        <Image src={MapIcon} alt="Mapa" height={25} width={25} />
        <span className="flex w-full font-semibold ml-1">{t("map")}</span>
      </div>
      <GoogleMap
        center={latlon}
        zoom={12}
        options={mapOptions}
        mapContainerStyle={{
          width: "100%",
          borderRadius: "1.5rem",
          aspectRatio: "1 / 1",
        }}
      >
        <Marker position={latlon} />
      </GoogleMap>
      </div>
  );
}

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useWeather } from "@/lib/weatherContext";
import Image from "next/image";
import MapIcon from "@/public/icons/map.svg";
import { useTranslation } from "react-i18next";

export default function Map() {
  const { t } = useTranslation();
  const { latlon } = useWeather();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const mapOptions = {
    disableDefaultUI: true,
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
   <div className="flex flex-col rounded-3xl w-full bg-gray-50 items-center mt-4 p-4">
      <div className="flex h-auto w-full items-center mb-4">
        <Image src={MapIcon} alt="Mapa" height={25} width={25} />
        &nbsp;
        <span className="flex w-full font-semibold">{t("map")}</span>
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

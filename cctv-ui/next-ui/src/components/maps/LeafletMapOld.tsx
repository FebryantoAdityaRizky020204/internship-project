"use client";

import React, { memo, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { Icon, LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { TypeLocation } from "@/app/public/type";

type MapLocation = LatLngLiteral & { id: string };

type MapProps = {
  center: { lat: number; lng: number };
  locations: TypeLocation[];
  locationSelected: TypeLocation | undefined;
  setLocationSelected: (value: TypeLocation | undefined) => void;
  sidebarOpen?: boolean;
  setSidebarOpen: (value: boolean) => void;
  setVideoSelected: (value: boolean) => void;
};

const mapMarkIcon = new Icon({
  iconUrl: "/images/icons/location.svg",
  iconSize: [25, 35],
  iconAnchor: [28.5, 65],
});

const mapMarkActiveIcon = new Icon({
  iconUrl: "/images/icons/location-active.svg",
  iconSize: [25, 35],
  iconAnchor: [28.5, 65],
});

const ChangeMapView = ({ location }: { location: MapLocation }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([location.lat, location.lng], map.getZoom(), { duration: 1.2 });
  }, [location, map]);

  return null;
};

// 🔹 Komponen untuk memaksa Leaflet update layout ketika sidebar berubah
const InvalidateSizeOnSidebarChange = ({
  sidebarOpen,
}: {
  sidebarOpen?: boolean;
}) => {
  const map = useMap();

  useEffect(() => {
    // Beri sedikit delay agar transisi Tailwind selesai dulu
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 300); // sesuaikan dengan durasi animasi sidebar kamu
    return () => clearTimeout(timeout);
  }, [sidebarOpen, map]);

  // Update juga kalau window diresize
  useEffect(() => {
    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [map]);

  return null;
};

export const LeafletMap: React.FC<MapProps> = memo(function LeafletMap({
  center,
  locations = [],
  locationSelected,
  setLocationSelected,
  sidebarOpen,
  setSidebarOpen,
  setVideoSelected,
}) {
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation | undefined
  >(undefined);

  useEffect(() => {
    if (locationSelected) setSelectedLocation(locationSelected);
    else setSelectedLocation(undefined);
  }, [locationSelected]);

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={15}
        minZoom={5}
        zoomControl={false}
        attributionControl={false}
        className="w-full rounded-lg shadow-lg lg:h-[calc(100vh-6.5rem)]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Jalankan flyTo jika lokasi berubah */}
        {selectedLocation && <ChangeMapView location={selectedLocation} />}

        {/* Jalankan invalidateSize setiap kali sidebar berubah */}
        <InvalidateSizeOnSidebarChange
          key={String(sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {locations.map((location) => (
          <Marker
            key={location.id}
            icon={
              location.id === selectedLocation?.id
                ? mapMarkActiveIcon
                : mapMarkIcon
            }
            position={{ lat: location.lat, lng: location.lng }}
            eventHandlers={{
              click: () => {
                const isSame = location.id === selectedLocation?.id;
                const newSelected = isSame ? undefined : location;
                setSelectedLocation(newSelected);
                setLocationSelected(newSelected);
                setSidebarOpen(true);
                setVideoSelected(true);
              },
            }}
          >
            {/* {location.id === selectedLocation?.id && (
              <Tooltip
                direction="top"
                offset={[0, -55]}
                opacity={1}
                permanent
                className="max-w-[850px] min-w-[400px] rounded-lg border border-gray-200 bg-white p-2 text-xs font-bold !whitespace-normal text-gray-800 shadow-lg"
              >
                <div className="flex flex-col">
                  <div className="font-bold">{`nama: ${location.name}`}</div>
                  <div className="mt-1">{`alamat: ${location.address}`}</div>
                </div>
              </Tooltip>
            )} */}
          </Marker>
        ))}

        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
});

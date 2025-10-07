"use client";

import React, { memo, useState, useEffect, useRef, useMemo } from "react";
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
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  setVideoSelected: (value: boolean) => void;
};

// 🔹 Icon default & aktif
const mapMarkIconActive = new Icon({
  iconUrl: "/images/icons/cctv_active.svg",
  iconSize: [25, 35],
  iconAnchor: [12.5, 35],
});

const mapMarkIconOff = new Icon({
  iconUrl: "/images/icons/cctv_off.svg",
  iconSize: [25, 35],
  iconAnchor: [12.5, 35],
});

const mapMarkActiveIcon = new Icon({
  iconUrl: "/images/icons/scan-eye.svg",
  iconSize: [25, 35],
  iconAnchor: [12.5, 35],
});

// 🔹 Komponen untuk memindahkan peta ke lokasi baru
const ChangeMapView = memo(({ location }: { location: MapLocation }) => {
  const map = useMap();
  const prev = useRef(location);

  useEffect(() => {
    if (
      location.lat !== prev.current.lat ||
      location.lng !== prev.current.lng
    ) {
      map.flyTo([location.lat, location.lng], map.getZoom(), { duration: 1 });
      prev.current = location;
    }
  }, [location, map]);

  return null;
});
ChangeMapView.displayName = "ChangeMapView";

// 🔹 Invalidasi ukuran map setiap sidebar berubah
const InvalidateSizeOnSidebarChange = memo(
  ({ sidebarOpen }: { sidebarOpen?: boolean }) => {
    const map = useMap();

    useEffect(() => {
      const timeout = setTimeout(() => {
        map.invalidateSize();
      }, 500);
      return () => clearTimeout(timeout);
    }, [sidebarOpen, map]);

    return null;
  },
);
InvalidateSizeOnSidebarChange.displayName = "InvalidateSizeOnSidebarChange";

export const LeafletMap: React.FC<MapProps> = memo(function LeafletMap({
  center,
  locations = [],
  locationSelected,
  setLocationSelected,
  sidebarOpen,
  setSidebarOpen,
  setVideoSelected,
}) {
  const mapRef = useRef<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation | undefined
  >(undefined);

  useEffect(() => {
    if (locationSelected) setSelectedLocation(locationSelected);
    else setSelectedLocation(undefined);
  }, [locationSelected]);

  const markers = useMemo(
    () =>
      locations.map((location) => (
        <Marker
          key={location.id}
          icon={
            location.id === selectedLocation?.id
              ? mapMarkActiveIcon
              : location.status === "ACTIVE"
                ? mapMarkIconActive
                : mapMarkIconOff
          }
          position={{ lat: location.lat, lng: location.lng }}
          eventHandlers={{
            click: () => {
              const same = location.id === selectedLocation?.id;
              const newSelected = same ? undefined : location;
              setSelectedLocation(newSelected);
              setLocationSelected(newSelected);
              setSidebarOpen(true);
              setVideoSelected(newSelected != undefined);
            },
          }}
        />
      )),
    [
      locations,
      selectedLocation,
      setLocationSelected,
      setSidebarOpen,
      setVideoSelected,
    ],
  );

  return (
    <div
      className={`relative rounded-lg shadow-lg transition-all duration-300 ${
        sidebarOpen ? "h-full" : "h-[calc(100vh-6.5rem)]"
      }`}
    >
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={15}
        minZoom={1}
        zoomControl={false}
        attributionControl={false}
        className={`h-full w-full rounded-lg shadow-lg transition-all duration-300`}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {selectedLocation && <ChangeMapView location={selectedLocation} />}
        <InvalidateSizeOnSidebarChange sidebarOpen={sidebarOpen} />

        {markers}

        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
});

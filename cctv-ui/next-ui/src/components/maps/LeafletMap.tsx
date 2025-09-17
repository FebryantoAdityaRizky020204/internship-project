"use client";

import React, { memo, useState } from "react";
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
import { Location } from "@/icons";
// Hapus import CSS kustom karena sudah diganti dengan Tailwind

// type MapType = "roadmap" | "satellite" | "hybrid" | "terrain";

type MapLocation = LatLngLiteral & { id: string };

type MapProps = {
  center: LatLngLiteral;
  locations: MapLocation[];
};

const SelectedLocation = ({ center }: { center: LatLngLiteral }) => {
  const map = useMap();
  map.panTo(center, { animate: true });
  return null;
};

export const LeafletMap: React.FC<MapProps> = memo(function LeafletMap({
  center,
  locations = [],
}) {
  // const [mapType, setMapType] = useState<MapType>("roadmap");
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation | undefined
  >(locations.length > 0 ? locations[0] : undefined);

  const mapMarkIcon = new Icon({
    iconUrl: "@/icons/location.svg",
    iconSize: [47, 55],
  });
  const mapMarkActiveIcon = new Icon({
    iconUrl: "@/icons/location-active.svg",
    iconSize: [57, 65],
  });

  return (
    <>
      <div className="relative">
        <MapContainer
          center={center}
          zoom={13}
          minZoom={5}
          zoomControl={false}
          attributionControl={false}
          // Tambahkan styling Tailwind untuk ukuran dan tampilan
          className="h-[500px] w-full rounded-lg shadow-lg"
        >
          {/* <TileLayer url={getUrl()} /> */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedLocation && <SelectedLocation center={selectedLocation} />}

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
                  setSelectedLocation(location);
                },
              }}
            />
          ))}

          <ZoomControl position="topright" />
        </MapContainer>
      </div>
    </>
  );
});

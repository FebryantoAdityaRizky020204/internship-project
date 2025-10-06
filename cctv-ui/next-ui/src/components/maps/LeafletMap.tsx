"use client";

import React, { memo, useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapLocation {
  id: number;
  lat: number;
  lng: number;
  name: string;
  description?: string;
}

interface MapProps {
  center: [number, number];
  locations: MapLocation[];
  locationSelected: MapLocation | null;
  setLocationSelected: (loc: MapLocation | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  setVideoSelected?: (v: string | null) => void;
}

// ─────────────────────────────
// Utility Icons
// ─────────────────────────────
const defaultIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = new L.Icon({
  iconUrl: "/marker-icon-selected.png",
  iconSize: [30, 48],
  iconAnchor: [15, 48],
});

// ─────────────────────────────
// Smooth fly to location change
// ─────────────────────────────
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

// ─────────────────────────────
// Main Map Component
// ─────────────────────────────
export const LeafletMap: React.FC<MapProps> = memo(function LeafletMap({
  center,
  locations = [],
  locationSelected,
  setLocationSelected,
  sidebarOpen,
}) {
  const mapRef = useRef<L.Map | null>(null);

  // Invalidate size when sidebar toggled (tanpa re-render)
  useEffect(() => {
    const handler = () => {
      const map = mapRef.current;
      if (map) setTimeout(() => map.invalidateSize(), 350);
    };
    window.addEventListener("resize-map", handler);
    return () => window.removeEventListener("resize-map", handler);
  }, []);

  // Trigger global resize event ketika sidebarOpen berubah
  useEffect(() => {
    window.dispatchEvent(new Event("resize-map"));
  }, [sidebarOpen]);

  // Cache marker rendering
  const markers = useMemo(
    () =>
      locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={
            locationSelected?.id === location.id ? selectedIcon : defaultIcon
          }
          eventHandlers={{
            click: () => setLocationSelected(location),
          }}
        >
          <Tooltip>{location.name}</Tooltip>
        </Marker>
      )),
    [locations, locationSelected, setLocationSelected],
  );

  return (
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
        attribution="&copy; OpenStreetMap contributors"
      />
      <ZoomControl position="bottomright" />
      {markers}
      {locationSelected && <ChangeMapView location={locationSelected} />}
    </MapContainer>
  );
});
LeafletMap.displayName = "LeafletMap";

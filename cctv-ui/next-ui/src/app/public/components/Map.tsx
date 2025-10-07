import dynamic from "next/dynamic";
import { TypeLocation } from "../type";

type MapProps = {
  center: { lat: number; lng: number };
  locations: TypeLocation[];
  locationSelected: TypeLocation | undefined;
  setLocationSelected: (value: TypeLocation | undefined) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  setVideoSelected: (value: boolean) => void;
};

const Map = dynamic<MapProps>(
  () =>
    import("@/components/maps/LeafletMap").then(
      (component) => component.LeafletMap,
    ),
  { ssr: false },
);

type MapViewProps = {
  locationSelected: TypeLocation | undefined;
  locations: TypeLocation[] | undefined;
  setLocationSelected: (value: TypeLocation | undefined) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  setVideoSelected: (value: boolean) => void;
};

const MapView = ({
  locationSelected,
  locations,
  setLocationSelected,
  sidebarOpen,
  setSidebarOpen,
  setVideoSelected,
}: MapViewProps) => {
  const centerMap = {
    lat: -2.2145732323893963,
    lng: 113.9204322377771,
  };

  return (
    <Map
      center={{
        lat: locationSelected?.lat ?? centerMap.lat,
        lng: locationSelected?.lng ?? centerMap.lng,
      }}
      locations={locations ?? []}
      locationSelected={locationSelected}
      setLocationSelected={setLocationSelected}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      setVideoSelected={setVideoSelected}
    />
  );
};

export default MapView;

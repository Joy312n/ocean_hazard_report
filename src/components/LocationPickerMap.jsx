import React, { useRef, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Component to recenter map when props change
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const LocationPickerMap = ({ position, setPosition }) => {
  const markerRef = useRef(null);

  // Drag handler for marker
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <ChangeView center={position} zoom={16} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        />
      </MapContainer>
    </div>
  );
};

export default LocationPickerMap;

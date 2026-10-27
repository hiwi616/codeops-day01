"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

// Fix default Leaflet icon paths in Next.js bundle
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function DeliveryMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-80 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-sm">
        Loading Addis Ababa Delivery Map...
      </div>
    );
  }

  // Restaurant Coordinates: Bole Medhanialem, Addis Ababa
  const restaurantCoords = [8.9953, 38.7889];

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <MapContainer
        center={restaurantCoords}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={restaurantCoords} icon={customIcon}>
          <Popup>
            <strong>Addis Eats HQ</strong>
            <br />
            Bole Medhanialem, Addis Ababa.
          </Popup>
        </Marker>
        {/* Active 5km Delivery Radius Circle */}
        <Circle
          center={restaurantCoords}
          radius={5000}
          pathOptions={{
            color: "#1B4D8E",
            fillColor: "#1B4D8E",
            fillOpacity: 0.15,
          }}
        />
      </MapContainer>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { LocateFixed, Radar } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
}

interface RecyclingPoint {
  id: string;
  lat: number;
  lng: number;
  name?: string;
}

interface OverpassElement {
  id: number;
  lat?: number;
  lon?: number;
}

function Map() {
  const [isMounted, setIsMounted] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [recyclingPoints, setRecyclingPoints] = useState<RecyclingPoint[]>([]);
  const [isLoadingRecyclingPoints, setIsLoadingRecyclingPoints] =
    useState(false);
  const [currMapCenter, setCurrMapCenter] = useState<Location | null>(null);
  const [fly, setFly] = useState(false);

  function MapCenterTracker({
    onCenterChange,
  }: {
    onCenterChange: (center: Location) => void;
  }) {
    const map = useMapEvents({
      moveend: () => {
        const center = map.getCenter();
        onCenterChange({ lat: center.lat, lng: center.lng });
      },
    });
    return null;
  }

  function FlyToLocation({
    location,
    shouldFly,
  }: {
    location: Location | null;
    shouldFly: boolean;
  }) {
    const map = useMap();
    useEffect(() => {
      if (location && shouldFly) {
        map.flyTo([location.lat, location.lng], 13);
      }
    }, [location, map, shouldFly]);
    return null;
  }

  async function fetchRecyclingPoints(center: Location, radius = 10000) {
    setIsLoadingRecyclingPoints(true);
    try {
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="recycling"]["recycling:clothes"](around:${radius},${center.lat},${center.lng});
          way["amenity"="recycling"]["recycling:clothes"](around:${radius},${center.lat},${center.lng});
          relation["amenity"="recycling"]["recycling:clothes"](around:${radius},${center.lat},${center.lng});
        );
        out center;
      `;

      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          overpassQuery
        )}`
      );

      if (!response.ok) {
        throw new Error("Error while fetching recycling points");
      }

      const data = await response.json();

      const recyclingPoints: RecyclingPoint[] = data.elements
        .map((elem: OverpassElement) => {
          const lat = elem.lat;
          const lng = elem.lon;

          return {
            id: elem.id.toString(),
            lat,
            lng,
          };
        })
        .filter((point: RecyclingPoint) => point.lat && point.lng);
      setRecyclingPoints(recyclingPoints);
    } catch (err) {
      console.error("Error while fetching recycling points: ", err);
    } finally {
      setIsLoadingRecyclingPoints(false);
    }
  }

  useEffect(function () {
    setIsMounted(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location: ", error);
          setIsLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      setLocationError("GeoLocation is not supported by this browser.");
      setIsLoadingLocation(false);
    }
  }, []);

  useEffect(
    function () {
      if (userLocation) {
        fetchRecyclingPoints(userLocation);
      }
    },
    [userLocation]
  );

  if (!isMounted) {
    return <div style={{ height: "100%", width: "100%" }}>Loading map...</div>;
  }

  const mapCenter: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [51.505, -0.09];

  const recyclingIcon = L.divIcon({
    html: "♻️",
    className: "recycling-icon",
  });

  function searchRecyclingPoints() {
    const searchCenter = currMapCenter || userLocation;
    if (searchCenter) {
      fetchRecyclingPoints(searchCenter);
    }
  }

  function resetMapCenter() {
    if (userLocation) {
      setFly(true);
      setTimeout(() => setFly(false), 100);
    }
  }

  return (
    <div style={{ height: "100%", width: "100%" }} className="-z-10">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <FlyToLocation location={userLocation} shouldFly={fly} />
        <MapCenterTracker onCenterChange={setCurrMapCenter} />
        {recyclingPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={recyclingIcon}
          />
        ))}
      </MapContainer>

      <div className="absolute bottom-10 right-10 z-10 flex flex-col gap-4">
        <button
          onClick={searchRecyclingPoints}
          disabled={
            (!currMapCenter && !userLocation) || isLoadingRecyclingPoints
          }
          className="cursor-pointer rounded-full backdrop-blur-3xl bg-white/40 p-3 shadow-lg hover:shadow-xl transition-shadow border-t-purple-300 border-l-purple-400 border-2 border-b-purple-300 border-r-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Radar
            className={`w-5 h-5 text-gray-700 ${
              isLoadingRecyclingPoints ? "animate-spin" : ""
            }`}
          />
        </button>
        <button
          onClick={resetMapCenter}
          className="cursor-pointer rounded-full backdrop-blur-3xl bg-white/40 p-3 shadow-lg hover:shadow-xl transition-shadow border-t-purple-400 border-l-purple-300 border-2 border-b-purple-400 border-r-purple-300"
        >
          <LocateFixed className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default Map;

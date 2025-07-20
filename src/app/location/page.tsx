// src/app/locations/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { ChevronRight, LocateFixed, MapPin, Navigation } from "lucide-react";

// Custom icon for markers - using Pizza Hut red color
const customIcon = L.icon({
  iconUrl: "/pin.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  hours?: string;
  description?: string;
}

function MapFlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      map.flyTo([lat, lng], 14, { duration: 1.5 });
    }
  }, [lat, lng]);

  return null;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearestLocation, setNearestLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("locations").select("*");

      if (error) {
        console.error("Error fetching locations:", error.message);
      } else if (data) {
        const filtered = data.filter(
          (loc) =>
            typeof loc.latitude === "number" &&
            typeof loc.longitude === "number"
        );
        setLocations(filtered);
        setIsLoading(false);
      }
    };
    getUserLocation();
    fetchLocations();
  }, []);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target as Node)
    ) {
      setSelectedLocation(null);
    }
  };

  if (selectedLocation) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [selectedLocation]);


  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          findNearestLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Find nearest location based on user's coordinates
  const findNearestLocation = (lat: number, lng: number) => {
    if (locations.length === 0) return;

    let nearest = locations[0];
    let shortestDistance = calculateDistance(
      lat,
      lng,
      nearest.latitude,
      nearest.longitude
    );

    locations.forEach((location) => {
      const distance = calculateDistance(
        lat,
        lng,
        location.latitude,
        location.longitude
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = location;
      }
    });

    setNearestLocation(nearest);
    setSelectedLocation(nearest);
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Get directions to selected location
  const getDirections = () => {
    if (!selectedLocation) return;

    const { latitude, longitude } = selectedLocation;

    const openGoogleMaps = (originLat: number, originLng: number) => {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${latitude},${longitude}&travelmode=driving`;
      window.open(url, "_blank");
    };

    if (userLocation) {
      // Already have user location
      openGoogleMaps(userLocation.lat, userLocation.lng);
    } else if (navigator.geolocation) {
      // Get user location on-demand
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          openGoogleMaps(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location for directions:", error);
          alert("Please enable location services to get directions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 min-h-screen md:h-[100dvh] py-24 px-4 bg-gray-50">
      {/* Sidebar */}
      <div className="md:col-span-1 p-6 border-r border-gray-200 overflow-y-auto bg-white">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-red-600">
          <MapPin className="text-red-600" /> Pizza Hut Locations
        </h2>

        {/* Location actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={getUserLocation}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LocateFixed size={18} /> Find Nearest
          </button>
          {nearestLocation && (
            <button
              onClick={() => setSelectedLocation(nearestLocation)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-red-600 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
            >
              <Navigation size={18} /> Nearest Store
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Pizza Hut locations..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Locations List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {locations
              .filter((loc) =>
                loc.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((location) => (
                <div
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedLocation?.id === location.id
                      ? "bg-red-100 border-2 border-red-600"
                      : "bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {location.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {location.address}
                      </p>
                    </div>
                    <ChevronRight className="text-red-600" />
                  </div>
                  {selectedLocation?.id === location.id && (
                    <div className="mt-2 pt-2 border-t border-red-200">
                      {location.phone && (
                        <p className="text-sm">
                          <span className="font-semibold">Phone:</span>{" "}
                          {location.phone}
                        </p>
                      )}
                      {location.hours && (
                        <p className="text-sm mt-1">
                          <span className="font-semibold">Hours:</span>{" "}
                          {location.hours}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className="md:col-span-2 relative">
        <MapContainer
          center={[30.0444, 31.2357]} // Default Cairo
          zoom={12}
          scrollWheelZoom={true}
            style={{ height: "60vh", width: "100%" }}
          className="z-0 h-[60vh] w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />

          {/* User location marker */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup className="font-semibold">Your Location</Popup>
            </Marker>
          )}

          {/* Fly to selected marker */}
          {selectedLocation && (
            <MapFlyTo
              lat={selectedLocation.latitude}
              lng={selectedLocation.longitude}
            />
          )}

          {/* Markers */}
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => setSelectedLocation(location),
              }}
            >
              <Popup className="min-w-[200px]">
                <div className="space-y-1">
                  <h3 className="font-bold text-red-600">{location.name}</h3>
                  <p className="text-sm text-gray-700">{location.address}</p>
                  {location.phone && (
                    <p className="text-sm">
                      <span className="font-semibold">Phone:</span>{" "}
                      {location.phone}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Location details panel */}
        {selectedLocation && (
          <div  ref={panelRef} className="absolute bottom-6 left-4 right-4 md:left-6 md:right-6 bg-white p-6 rounded-xl shadow-xl z-10 max-w-full md:max-w-md border border-gray-200">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-bold text-xl text-red-600">
                  {selectedLocation.name}
                </h3>
                <p className="text-gray-700 mt-1">{selectedLocation.address}</p>
                {selectedLocation.phone && (
                  <p className="mt-3">
                    <span className="font-semibold">Phone:</span>{" "}
                    {selectedLocation.phone}
                  </p>
                )}
                {selectedLocation.hours && (
                  <p className="mt-1">
                    <span className="font-semibold">Hours:</span>{" "}
                    {selectedLocation.hours}
                  </p>
                )}
                {selectedLocation.description && (
                  <p className="mt-3 text-gray-600">
                    {selectedLocation.description}
                  </p>
                )}
              </div>
              <button
                onClick={getDirections}
                disabled={!userLocation}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                  userLocation
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                <Navigation size={18} /> Directions
              </button>
            </div>
            {!userLocation && (
              <p className="text-sm text-gray-500 mt-3">
                Enable location services to get directions to this Pizza Hut
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

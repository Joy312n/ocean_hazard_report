import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { ChatBubbleLeftRightIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Mock data
const mockSocialData = [
  { id: 1, user: '@asansol_updates', source: 'Twitter', content: 'Huge traffic jam near the Court More due to a broken down truck. Avoid the area!', lat: 23.685, lng: 86.965, timestamp: new Date(Date.now() - 5 * 60000) },
  { id: 2, user: 'Asansol Citizens Forum', source: 'Facebook', content: 'Reports of a water pipeline burst in the Hutton Road area. Authorities have been notified.', lat: 23.679, lng: 86.97, timestamp: new Date(Date.now() - 15 * 60000) },
  { id: 3, user: '@wb_power_alerts', source: 'Twitter', content: 'Scheduled power cut in parts of Burnpur from 10 AM to 2 PM today for maintenance work. #Asansol', lat: 23.665, lng: 86.93, timestamp: new Date(Date.now() - 45 * 60000) },
];

const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

// Hotspot icon
const createHotspotIcon = () =>
  L.divIcon({ className: 'hotspot-marker', iconSize: [20, 20] });

const SocialFeed = () => {
  const defaultPosition = [23.6823, 86.9536];
  const [activeTab, setActiveTab] = useState("feed"); // mobile toggle

  const TwitterIcon = () => (
    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.954 4.569c-...z" />
    </svg>
  );
  const FacebookIcon = () => (
    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.675 0h-21.35c-...z"/>
    </svg>
  );

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600 mr-2" />
            Community Pulse
          </h1>
          <p className="text-gray-600 mt-1">Live hazard mentions from social media</p>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden mb-4 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === "feed" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Feed
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === "map" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Map
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Feed Section */}
          <div
            className={`bg-white rounded-xl shadow-lg p-4 flex-1 lg:block ${activeTab === "feed" ? "block" : "hidden"} lg:block`}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-3">Live Social Feed</h2>
            <div className="space-y-4 h-[400px] sm:h-[600px] overflow-y-auto pr-2">
              {mockSocialData.map(post => (
                <div key={post.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-1">
                    {post.source === 'Twitter' ? <TwitterIcon /> : <FacebookIcon />}
                    <span className="font-bold text-gray-800 ml-2">{post.user}</span>
                    <span className="text-gray-500 text-xs ml-auto">{formatTimeAgo(post.timestamp)}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{post.content}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    Near {post.lat.toFixed(2)}, {post.lng.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div
            className={`bg-white rounded-xl shadow-lg p-4 flex-1 lg:block ${activeTab === "map" ? "block" : "hidden"} lg:block`}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-3">Hazard Hotspots</h2>
            <div className="h-[400px] sm:h-[600px] rounded-lg overflow-hidden">
              <MapContainer center={defaultPosition} zoom={13} className="h-full w-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {mockSocialData.map(post => (
                  <Marker
                    key={`hotspot-${post.id}`}
                    position={[post.lat, post.lng]}
                    icon={createHotspotIcon()}
                  />
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;

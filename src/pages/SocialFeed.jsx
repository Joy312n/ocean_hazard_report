import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

import "leaflet/dist/leaflet.css";
import { ChatBubbleLeftRightIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Mock social media data remains the same
const mockSocialData = [
  {
    id: 1,
    user: "@odisha_cyclone_alerts",
    source: "Twitter",
    content: "Cyclone warning issued for Puri coast. Fishermen advised not to venture into the sea.",
    lat: 19.8134, 
    lng: 85.8315, // Puri, Odisha
    timestamp: new Date(Date.now() - 20 * 60000), // 20 mins ago
  },
  {
    id: 2,
    user: "Chennai Coastal Watch",
    source: "Facebook",
    content: "Severe coastal flooding reported in Marina Beach after unusually high tides.",
    lat: 13.0500, 
    lng: 80.2824, // Marina Beach, Chennai
    timestamp: new Date(Date.now() - 50 * 60000), // 50 mins ago
  },
  {
    id: 3,
    user: "@kerala_fishermen_forum",
    source: "Twitter",
    content: "Strong winds disrupting fishing near Alappuzha coast. Multiple boats reported damage.",
    lat: 9.4981, 
    lng: 76.3388, // Alappuzha, Kerala
    timestamp: new Date(Date.now() - 2 * 3600 * 1000), // 2 hours ago
  },
  {
    id: 4,
    user: "Goa Beach Safety",
    source: "Facebook",
    content: "Oil spill spotted off Baga Beach, causing water contamination concerns.",
    lat: 15.5527, 
    lng: 73.7517, // Baga Beach, Goa
    timestamp: new Date(Date.now() - 3 * 3600 * 1000), // 3 hours ago
  },
  {
    id: 5,
    user: "@andaman_alerts",
    source: "Twitter",
    content: "Earthquake tremors felt near Port Blair. Tsunami advisory under observation.",
    lat: 11.6234, 
    lng: 92.7265, // Port Blair, Andaman & Nicobar
    timestamp: new Date(Date.now() - 6 * 3600 * 1000), // 6 hours ago
  },
  {
    id: 6,
    user: "Mumbai Coastal Watch",
    source: "Facebook",
    content: "Coastal erosion reported along Versova Beach. Locals urged to avoid affected areas.",
    lat: 19.1340, 
    lng: 72.8122, // Versova Beach, Mumbai
    timestamp: new Date(Date.now() - 10 * 3600 * 1000), // 10 hours ago
  },
];

const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

// Function to create our custom pulsing icon
const createHotspotIcon = () => {
  return L.divIcon({
    className: 'hotspot-marker',
    iconSize: [20, 20]
  });
};

const SocialFeed = () => {
    const defaultPosition = [23.6823, 86.9536];

    const TwitterIcon = () => (
        <svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.21 0-.42-.015-.63.961-.689 1.796-1.56 2.457-2.549z" />
        </svg>
    );

    const FacebookIcon = () => (
         <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
        </svg>
    );

    return (
        <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="h-10 w-10 text-blue-600 mr-3" />
                        Community Pulse
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">Live hazard mentions from social media</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Social Feed</h2>
                        <div className="space-y-4 h-[600px] overflow-y-auto pr-2">
                            {mockSocialData.map(post => (
                                <div key={post.id} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        {post.source === 'Twitter' ? <TwitterIcon /> : <FacebookIcon />}
                                        <span className="font-bold text-gray-800 ml-2">{post.user}</span>
                                        <span className="text-gray-500 text-sm ml-auto">{formatTimeAgo(post.timestamp)}</span>
                                    </div>
                                    <p className="text-gray-700">{post.content}</p>
                                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                                        <MapPinIcon className="h-3 w-3 mr-1" />
                                        Posted from near {post.lat.toFixed(2)}, {post.lng.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg h-[700px] flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hazard Hotspots</h2>
                        <div className="flex-grow rounded-lg overflow-hidden">
                             <MapContainer center={defaultPosition} zoom={13} className="h-full w-full">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
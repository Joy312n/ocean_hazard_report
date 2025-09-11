import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../services/api";
import { MapPinIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import "leaflet/dist/leaflet.css";

// Import marker images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const defaultPosition = [23.6823, 86.9536]; // Asansol

  const fetchReports = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/reports/verified");
      setReports(response.data);
    } catch (err) {
      setError("Failed to fetch reports. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Priority badge colors
  const getPriorityStyle = (report) => {
    const priority = report.priority || "moderate";
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-red-500";
      case "moderate":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  // Status badge colors
  const getStatusStyle = (report) => {
    const status = report.status || "verified";
    switch (status.toLowerCase()) {
      case "verified":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main container */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white p-6 shadow-sm flex justify-between items-center border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <MapPinIcon className="h-6 w-6 text-blue-600 mr-2" />
              Community Hazard Map
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              View verified hazard reports in your area
            </p>
          </div>
          <button
            onClick={fetchReports}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon
              className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Map + Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* ========================= MAP SECTION ========================= */}
          <div className="flex-1 relative h-full">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <svg
                  className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-lg text-gray-700">Loading map data...</span>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10 text-red-500 text-lg">
                {error}
              </div>
            )}

            <MapContainer
              center={defaultPosition}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {reports.map((report) => (
                <Marker
                  key={report._id}
                  position={[report.latitude, report.longitude]}
                >
                  <Popup>
                    <div className="space-y-2 max-w-xs">
                      <p className="font-bold text-base text-gray-800">
                        {report.description}
                      </p>
                      {report.imageUrl && (
                        <img
                          src={report.imageUrl}
                          alt="Hazard"
                          className="w-full h-32 object-cover rounded-md mt-1"
                        />
                      )}
                      <p className="text-xs text-gray-500">
                        Lat: {report.latitude.toFixed(4)}, Lng:{" "}
                        {report.longitude.toFixed(4)}
                      </p>
                      {report.createdAt && (
                        <p className="text-xs text-gray-500">
                          Reported on:{" "}
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(
                            report
                          )} text-white`}
                        >
                          {report.priority || "Moderate"}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                            report
                          )}`}
                        >
                          {report.status || "Verified"}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* ========================= SIDEBAR ========================= */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-6 space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Recent Reports
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {reports.length} verified reports in your area
              </p>
              <div className="space-y-4">
                {reports.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No verified reports to display.
                  </p>
                ) : (
                  reports.slice(0, 5).map((report) => (
                    <div
                      key={report._id}
                      className="border border-gray-200 rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getPriorityStyle(
                            report
                          )}`}
                        >
                          {report.priority || "Moderate"}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusStyle(
                            report
                          )}`}
                        >
                          {report.status || "Verified"}
                        </span>
                      </div>
                      <p className="font-medium text-gray-800 text-sm">
                        {report.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Coordinates: {report.latitude.toFixed(4)},{" "}
                        {report.longitude.toFixed(4)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Priority Legend
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700 text-sm">
                  <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>{" "}
                  Urgent Priority
                </li>
                <li className="flex items-center text-gray-700 text-sm">
                  <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>{" "}
                  Moderate Priority
                </li>
                <li className="flex items-center text-gray-700 text-sm">
                  <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>{" "}
                  Low Priority
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;

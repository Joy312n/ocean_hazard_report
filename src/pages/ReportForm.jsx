import React, { useState } from 'react';
import api from '../services/api';
import LocationPickerMap from '../components/LocationPickerMap';

const ReportForm = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState(null); // Start with no position
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  const handleGetLocation = () => {
    setIsFetchingLocation(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        setIsFetchingLocation(false);
      },
      (err) => {
        setLocationError('Could not get location. Please allow location access or try again.');
        setIsFetchingLocation(false);
        console.error(err);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) return setFormMessage({ type: 'error', text: 'Description is required.' });
    if (!position) return setFormMessage({ type: 'error', text: 'Location is required. Please get your location first.' });
    if (!window.confirm('Submit this hazard report?')) return;

    setSubmitting(true);
    setFormMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('description', description);
    formData.append('latitude', position.lat);
    formData.append('longitude', position.lng);
    if (image) formData.append('image', image);

    try {
      await api.post('/reports/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormMessage({ type: 'success', text: 'Report submitted successfully!' });
      setDescription('');
      setImage(null);
      setPosition(null);
      e.target.reset();
    } catch (err) {
      setFormMessage({ type: 'error', text: err.response?.data?.message || 'Failed to submit.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Report a Hazard</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {formMessage.text && (
            <div className={`p-3 rounded-md text-center ${formMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {formMessage.text}
            </div>
          )}
          
          <div>
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Describe the hazard in detail..."
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">Location</label>
            {!position && (
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={isFetchingLocation}
                className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                {isFetchingLocation ? 'Fetching Location...' : 'Get My Current Location'}
              </button>
            )}
            {locationError && <p className="text-red-500 text-sm">{locationError}</p>}
            
            {/* The map will only appear after the position is set */}
            {position && (
              <div className="h-72 w-full rounded-lg overflow-hidden border-2 border-blue-500">
                <LocationPickerMap position={position} setPosition={setPosition} />
              </div>
            )}
             {position && (
              <p className="text-center text-sm text-gray-600">
                Marker set. You can drag it to adjust the location.
              </p>
            )}
          </div>
          
          <button type="submit" disabled={submitting} className="w-full py-3 px-4 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400">
            {submitting ? 'Submitting...' : 'Submit Hazard Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
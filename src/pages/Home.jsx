import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, DocumentTextIcon, CheckCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline'; // Install heroicons if not already

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Keep Your Community Safe
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Report hazards, view community alerts, and help make your neighborhood safer for everyone.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/submit-report"
            className="flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 text-lg shadow-lg"
          >
            <DocumentTextIcon className="h-6 w-6" /> Report a Hazard
          </Link>
          <Link
            to="/map-view"
            className="flex items-center gap-2 border border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 text-lg shadow-lg"
          >
            <MapPinIcon className="h-6 w-6" /> View Map
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Our platform makes it easy for citizens to report hazards and stay informed about their community's safety.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <DocumentTextIcon className="h-16 w-16 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Report Hazards</h3>
              <p className="text-gray-600">
                Quickly and easily log safety issues in your area. Your location is automatically detected for accuracy.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Verification Process</h3>
              <p className="text-gray-600">
                Reports are reviewed by local authorities to ensure accuracy and prioritize urgent safety concerns.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <MapPinIcon className="h-16 w-16 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Map</h3>
              <p className="text-gray-600">
                View all hazards on an interactive map to stay aware of safety issues in your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Community Impact</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Together, we're making our communities safer every day.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <DocumentTextIcon className="h-10 w-10 text-blue-600" />
              </div>
              <p className="text-4xl font-bold text-gray-800">1,247</p>
              <p className="text-gray-600">Reports Submitted</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircleIcon className="h-10 w-10 text-green-600" />
              </div>
              <p className="text-4xl font-bold text-gray-800">892</p>
              <p className="text-gray-600">Issues Resolved</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <UserGroupIcon className="h-10 w-10 text-purple-600" />
              </div>
              <p className="text-4xl font-bold text-gray-800">3,456</p>
              <p className="text-gray-600">Active Citizens</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens working together to create safer communities.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white font-bold py-3 px-10 rounded-full hover:bg-blue-700 transition duration-300 text-lg shadow-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
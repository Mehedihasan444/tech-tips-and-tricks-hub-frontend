"use client"
import React from 'react';
import { Input, Textarea, Button, Card } from '@nextui-org/react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerImage from '@/assets/marker.png';
// Create a default icon for Leaflet markers
const DefaultIcon = L.icon({
    iconUrl: markerImage.src, 
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side: Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
            <form className="space-y-4">
              <Input
                label="Your Name"
                placeholder="Enter your full name"
                required
                fullWidth
                className="text-gray-800"
              />
              <Input
                label="Your Email"
                placeholder="Enter your email address"
                required
                fullWidth
                type="email"
                className="text-gray-800"
              />
              <Input
                label="Subject"
                placeholder="Enter subject"
                required
                fullWidth
                className="text-gray-800"
              />
              <Textarea
                label="Your Message"
                placeholder="Write your message here..."
                required
                fullWidth
                rows={6}
                className="text-gray-800"
              />
              <Button color="primary" className="w-full bg-teal-600 text-white">
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Side: Company Information */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-teal-600 text-2xl mr-3" />
                  <p className="text-gray-700">+1 123 456 7890</p>
                </div>
                <div className="flex items-center">
                  <Mail className="text-teal-600 text-2xl mr-3" />
                  <p className="text-gray-700">info@techtips.com</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-teal-600 text-2xl mr-3" />
                  <p className="text-gray-700">123 Tech Street, San Francisco, CA</p>
                </div>
              </div>
            </Card>

            {/* Social Media Links */}
            <Card className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-6 text-2xl">
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  <Facebook />
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  <Twitter />
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  <Instagram />
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Our Location
          </h3>
          <MapContainer
            center={[37.7749, -122.4194]} // Coordinates for San Francisco
            zoom={13}
            scrollWheelZoom={false}
            className="h-96 rounded-lg shadow-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[37.7749, -122.4194]}>
              <Popup>
                We are here!<br /> 123 Tech Street, San Francisco, CA
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

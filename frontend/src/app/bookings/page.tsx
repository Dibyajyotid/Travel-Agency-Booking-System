"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";

const BookingFormPage = () => {
  const [packageId, setPackageId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    numberOfTravellers: 1, 
    specialRequest: "",
  });

  useEffect(() => {
    
    setIsClient(true);
  }, []);

  const router = useRouter(); 

  useEffect(() => {
    const queryPackageId = new URLSearchParams(window.location.search).get("packageId");
    if (queryPackageId) {
      setPackageId(queryPackageId);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    try {
      const res = await axiosInstance.post("/bookings", {
        ...formData,
        packageId: packageId,
      });

      console.log("Booking successful:", res.data);
      router.push(`/bookings/confirmations?bookingId=${res.data._id}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Error response:", error.response);
        alert(`Error: ${error.response?.data?.message || "An unknown error occurred"}`);
      } else {
        console.log("Error:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  if (!isClient) return null; 

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Book Your Package</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block font-medium">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Your Phone Number"
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfTravellers">Number of Travellers</label>
          <input
            type="number"
            id="numberOfTravellers"
            className="input input-bordered w-full"
            name="numberOfTravellers" 
            value={formData.numberOfTravellers}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="specialRequest" className="block font-medium">
            Special Request
          </label>
          <textarea
            id="specialRequest"
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Any special requests?"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingFormPage;

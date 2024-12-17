// /admin/allbookings/[id].tsx

"use client";

import { useEffect, useState, use } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
interface PackageDetails {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface BookingDetails {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  numberOfTravellers: number;
  specialRequests: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  packageDetails: PackageDetails | null;
}

const BookingDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = use(params)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axiosInstance.get(`/admin/bookings/${id}`);
        setBookingDetails(res.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookingDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!bookingDetails) return <p>Booking not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <div className="p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Booking Information</h2>
        <p><strong>Name:</strong> {bookingDetails.name}</p>
        <p><strong>Email:</strong> {bookingDetails.email}</p>
        <p><strong>Phone Number:</strong> {bookingDetails.phoneNumber}</p>
        <p><strong>Number of Travellers:</strong> {bookingDetails.numberOfTravellers}</p>
        <p><strong>Special Requests:</strong> {bookingDetails.specialRequests}</p>
        <p><strong>Price:</strong> ₹{bookingDetails.price}</p>
        <p><strong>Created At:</strong> {new Date(bookingDetails.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(bookingDetails.updatedAt).toLocaleString()}</p>

        {bookingDetails.packageDetails && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Package Details</h3>
            <p><strong>Package Name:</strong> {bookingDetails.packageDetails.title}</p>
            <p><strong>Price:</strong> ₹{bookingDetails.packageDetails.price}</p>
            <p><strong>Description:</strong> {bookingDetails.packageDetails.description}</p>
            <img
              src={bookingDetails.packageDetails.imageUrl || "/default.jpg"}
              alt={bookingDetails.packageDetails.title}
              className="w-full h-64 object-cover rounded-md mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;

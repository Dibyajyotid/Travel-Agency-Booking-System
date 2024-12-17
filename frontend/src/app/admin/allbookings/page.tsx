"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import BookingCard from "@/components/BookingCard";
import { AdminNavbar } from "@/components/AdminNavbar";

interface PackageDetails {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface Booking {
  packageId: {
    _id: string;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
  } | null; // Ensure packageId is either an object with these fields or null
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

const AllBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const header = localStorage.getItem("authHeader");
        if (!header) {
          alert("Authorization header is missing");
          return;
        }
        const res = await axiosInstance.get("/admin/bookings", {
          headers: {
            Authorization: `Bearer ${header}`,
          },
        });
        const formattedBookings = res.data.map((booking: Booking) => ({
          _id: booking._id,
          name: booking.name,
          email: booking.email,
          phoneNumber: booking.phoneNumber,
          numberOfTravellers: booking.numberOfTravellers,
          specialRequests: booking.specialRequests,
          price: booking.price,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
          packageDetails: booking.packageId
            ? {
                _id: booking.packageId._id,
                name: booking.packageId.title,
                description: booking.packageId.description,
                price: booking.packageId.price,
                imageUrl: booking.packageId.imageUrl,
              }
            : null,
        }));
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full">
      <AdminNavbar />
      <div className="m-20 rounded-lg bg-base-100 px-6 py-8 shadow-xl ring-1 ring-slate-900/5">
        <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBookingsPage;

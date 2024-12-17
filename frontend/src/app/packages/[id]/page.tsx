"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { Package } from "@/types/types";

const PackageDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [packageDetails, setPackageDetails] = useState<Package | null>(null);
  const router = useRouter();
  const { id } = use(params)

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const res = await axiosInstance.get(`/packages/${id}`);
        setPackageDetails(res.data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    if (id) {
      fetchPackageDetails();
    }
  }, [id]); 

  const handleBookNow = () => {
    if(packageDetails?._id) {
      router.push(`/bookings?packageId=${packageDetails._id}`);
    }
  };

  if (!packageDetails) return <p>Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="card glass w-3/5 shadow-2xl m-20 p-20">
        <h1 className="text-2xl font-bold card-title">{packageDetails.title}</h1>
      
        <figure>
          <img
            src={packageDetails.image || "/default.jpg"}
            alt={packageDetails.title}
            className="w-full max-h-72 object-cover rounded-lg mt-4"
          />
        </figure>
        <div className="card-body">
          <p className="text-gray-600">{packageDetails.description}</p>
          <p className="text-blue-500 font-bold mt-2">
            Price: ₹{packageDetails.price}
          </p>
          <div className="card-actions justify-end">
            <button onClick={handleBookNow} className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl">
              Book Now
            </button>    
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;

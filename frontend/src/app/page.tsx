"use client";
import { useEffect, useState } from "react";
import {axiosInstance} from "@/utils/axiosInstance";
import { Package } from "@/types/types";
import PackageCard from "@/components/PackageCard";
import {Navbar} from "../components/Navbar";

export default function HomePage() {
  const [packages, setPackages] = useState<Package[]>([]);

  const fetchPackages = async () => {
    try {
      const res = await axiosInstance.get("/packages");
      setPackages(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="w-full">
      <Navbar />
      <div className="m-20 rounded-lg bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold mb-6 text-black">Available Packages</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}

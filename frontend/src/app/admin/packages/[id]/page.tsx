"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { AdminNavbar } from "@/components/AdminNavbar";

interface UpdatedPackage {
    title: string;
    description: string;
    price: string;
    availableDates: string[];
    image: string;
}

const PackageDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const [packageDetails, setPackageDetails] = useState<UpdatedPackage | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const [updatedPackage, setUpdatedPackage] = useState<UpdatedPackage>({
        title: "",
        description: "",
        price: "",
        availableDates: [],
        image: "",
    });

    const router = useRouter();
    const { id } = use(params);

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const res = await axiosInstance.get(`/packages/${id}`);
                setPackageDetails(res.data);
                setUpdatedPackage({
                    title: res.data.title,
                    description: res.data.description,
                    price: res.data.price,
                    availableDates: res.data.availableDates || [],
                    image: res.data.image || "",
                });
            } catch (error) {
                console.error("Error fetching package details:", error);
            }
        };

        if (id) {
            fetchPackageDetails();
        }
    }, [id]);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this package?")) {
            setDeleteLoading(true);
            try {
                const header = localStorage.getItem("authHeader"); 
                if (!header) {
                    alert("Authorization header is missing.");
                    return;
                }

                await axiosInstance.delete(`/admin/packages/${id}`, {
                    headers: {
                        Authorization: `Bearer ${header}`, 
                    },
                });

                alert("Package deleted successfully!");
                router.push("/admin"); 
            } catch (error) {
                console.error("Error deleting package:", error);
                alert("Failed to delete the package. Please try again.");
            } finally {
                setDeleteLoading(false);
            }
        }
    };

    const handleUpdate = async () => {
        if (confirm("Are you sure you want to update this package?")) {
            setUpdateLoading(true);
            try {
                const header = localStorage.getItem("authHeader"); 
                if (!header) {
                    alert("Authorization header is missing.");
                    return;
                }

                const res = await axiosInstance.put(`/admin/packages/${id}`, updatedPackage, {
                    headers: {
                        Authorization: `Bearer ${header}`, 
                    },
                });

                setPackageDetails(res.data);
                setUpdatedPackage(res.data);

                alert("Package updated successfully!");
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating package:", error);
                alert("Failed to update the package. Please try again.");
            } finally {
                setUpdateLoading(false);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedPackage((prev: UpdatedPackage) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newDates = value.split(",").map((date) => date.trim());
        setUpdatedPackage((prev: UpdatedPackage) => ({
            ...prev,
            availableDates: newDates,
        }));
    };

    if (!packageDetails) return <p>Loading...</p>;

    return (
        <div>
            <AdminNavbar />
        <div className="w-full flex justify-center items-center">
            <div className="card glass w-3/5 shadow-2xl m-20 p-10">
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
                    <p className="text-blue-500 font-bold mt-2">Price: ₹{packageDetails.price}</p>
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-xl btn"
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? "Deleting..." : "Delete"}
                        </button>
                        <button
                            onClick={() => setIsEditing(true)} // Open edit form
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl btn"
                            disabled={updateLoading}
                        >
                            {updateLoading ? "Loading..." : "Update"}
                        </button>
                    </div>

                    {/* Edit Form Dropdown */}
                    {isEditing && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Update Package</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={updatedPackage.title}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block">Description</label>
                                    <textarea
                                        name="description"
                                        value={updatedPackage.description}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={updatedPackage.price}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block">Available Dates (comma separated)</label>
                                    <input
                                        type="text"
                                        value={updatedPackage.availableDates.join(", ")}
                                        onChange={handleDateChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block">Image (Optional)</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={updatedPackage.image}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl btn"
                                        disabled={updateLoading}
                                    >
                                        {updateLoading ? "Updating..." : "Update Package"}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)} 
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-xl btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default PackageDetailsPage;

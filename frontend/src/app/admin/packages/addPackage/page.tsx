"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosInstance";

const AddPackagePage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: string;
    availableDates: string[];
    image: string | null; // Changed to string to store base64 data
  }>({
    title: "",
    description: "",
    price: "",
    availableDates: [],
    image: null, // Initial value remains null
  });

  const [availableDateInput, setAvailableDateInput] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview state

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      if (file) {
        // Convert the image to a base64 string using FileReader
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          const base64Image = reader.result as string;
          setImagePreview(base64Image); // Set image preview as base64 string
          setFormData({ ...formData, image: base64Image }); // Store base64 string in formData
        };
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add available date to the list
  const addAvailableDate = () => {
    if (availableDateInput) {
      setFormData({
        ...formData,
        availableDates: [...formData.availableDates, availableDateInput],
      });
      setAvailableDateInput("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate availableDates to ensure all are valid dates
    // const formattedDates = formData.availableDates.map(date => {
    //     const newDate = new Date(date)
    //     return newDate.toISOString()
    // }) // Filter out invalid dates
    
    console.log(formData.availableDates)
    // If no valid dates are found, alert the user
    if (formData.availableDates.length === 0) {
      alert("Please provide at least one valid date.");
      return;
    }
  
    // Create FormData to send the file and other fields
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("availableDates", JSON.stringify(formData.availableDates)); // Send formatted dates
  
    if (formData.image) {
      payload.append("image", formData.image);
    }
  
    const header = localStorage.getItem("authHeader");
    if (!header) {
      alert("Authorization header is missing.");
      return;
    }
  
    try {
      setLoading(true);
      // Send POST request to the backend
      await axiosInstance.post("/admin/packages", payload, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      });
  
      router.push("/admin"); // Redirect to admin page
    } catch (error) {
      console.error("Error adding package:", error);
      alert("There was an error adding the package.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Package</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Available Dates</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={availableDateInput}
              onChange={(e) => setAvailableDateInput(e.target.value)}
              className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={addAvailableDate}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Add Date
            </button>
          </div>
          <ul className="mt-2">
            {formData.availableDates.map((date, index) => (
              <li key={index} className="flex items-center justify-between">
                {date}
                <button
                  type="button"
                  onClick={() => {
                    const updatedDates = formData.availableDates.filter((_, i) => i !== index);
                    setFormData({ ...formData, availableDates: updatedDates });
                  }}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange} // Use the modified handler
            required
            className="p-2 border rounded"
          />
          {imagePreview && (
            <div className="mt-4">
              <h3 className="font-semibold">Image Preview:</h3>
              <img src={imagePreview} alt="Image preview" className="w-32 h-32 object-cover mt-2" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPackagePage;

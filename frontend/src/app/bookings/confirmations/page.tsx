// "use client";
// import { PDFDocument } from "pdf-lib";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { axiosInstance } from "@/utils/axiosInstance";

// interface PackageDetails {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   imageUrl: string;
// }

// interface BookingDetails {
//   _id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   numberOfTravellers: number;
//   specialRequests: string;
//   price: number;
//   createdAt: string;
//   updatedAt: string;
//   packageDetails: PackageDetails;
// }

// const ConfirmationPage = () => {
//   const [isClient, setIsClient] = useState(false); // To check if it's client-side
//   const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
//   const [bookingId, setBookingId] = useState<string | null>(null);

//   useEffect(() => {
//     // Set client-side flag after component mounts
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (isClient) {
//       const searchParams = useSearchParams();
//       const bookingIdParam = searchParams.get("bookingId");
//       if (bookingIdParam) {
//         setBookingId(bookingIdParam);
//       }
//     }
//   }, [isClient]);

//   useEffect(() => {
//     if (bookingId) {
//       const fetchBookingDetails = async () => {
//         try {
//           const response = await axiosInstance.get(`/bookings/${bookingId}`);
//           setBookingDetails(response.data);
//         } catch (error) {
//           console.error("Error fetching booking details:", error);
//         }
//       };
//       fetchBookingDetails();
//     }
//   }, [bookingId]);

//   if (!bookingDetails) {
//     return <div>Loading...</div>;
//   }

//   const downloadPDF = async () => {
//     const { name, email, phoneNumber, numberOfTravellers, specialRequests, price, packageDetails } = bookingDetails;

//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 800]);

//     const font = await pdfDoc.embedFont("Helvetica");
//     const fontSize = 12;

//     page.drawText(`Booking Confirmation`, { x: 50, y: 750, font, size: 18 });
//     page.drawText(`Name: ${name}`, { x: 50, y: 730, font, size: fontSize });
//     page.drawText(`Email: ${email}`, { x: 50, y: 710, font, size: fontSize });
//     page.drawText(`Phone: ${phoneNumber}`, { x: 50, y: 690, font, size: fontSize });
//     page.drawText(`Number of Travellers: ${numberOfTravellers}`, { x: 50, y: 670, font, size: fontSize });
//     page.drawText(`Special Requests: ${specialRequests}`, { x: 50, y: 650, font, size: fontSize });
//     page.drawText(`Package: ${packageDetails.title}`, { x: 50, y: 630, font, size: fontSize });
//     page.drawText(`Package Description: ${packageDetails.description}`, { x: 50, y: 610, font, size: fontSize });
//     page.drawText(`Price: Rs${price}`, { x: 50, y: 590, font, size: fontSize });

//     const pdfBytes = await pdfDoc.save();
//     const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
//     const pdfUrl = URL.createObjectURL(pdfBlob);
//     const link = document.createElement("a");
//     link.href = pdfUrl;
//     link.download = "booking-confirmation.pdf";
//     link.click();
//   };

//   if (!isClient) return null; // Prevent rendering until the component is mounted client-side

//   return (
//     <div className="w-full flex items-center justify-center min-h-screen text-center">
//       <div className="artboard phone-5">
//         <div className="card bg-base-100 w-96 shadow-lg">
//           <div className="card-body text-start">
//             <h1 className="card-titles text-2xl"><b>Booking Confirmation</b></h1>
//             <p><span className="text-lg font-bold">Name:</span> {bookingDetails.name}</p>
//             <p><span className="text-lg font-bold">Email:</span> {bookingDetails.email}</p>
//             <p><span className="text-lg font-bold">Phone Number:</span> {bookingDetails.phoneNumber}</p>
//             <p><span className="text-lg font-bold">No. of Travellers:</span> {bookingDetails.numberOfTravellers}</p>
//             <p><span className="text-lg font-bold">Special Requests:</span> {bookingDetails.specialRequests}</p>
//             <p><span className="text-lg font-bold">Package Title:</span> {bookingDetails.packageDetails.title}</p>
//             <p><span className="text-lg font-bold">Package Description:</span> {bookingDetails.packageDetails.description}</p>
//             <p><span className="text-lg font-bold">Price:</span> {bookingDetails.price}</p>

//             {/* Button to download the PDF */}
//             <div className="card-actions mt-5">
//               <button onClick={downloadPDF} className="btn btn-xl shadow-xl border-base-100">Download PDF</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationPage;


"use client";
import { PDFDocument } from "pdf-lib";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";

interface PackageDetails {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface BookingDetails {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  numberOfTravellers: number;
  specialRequests: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  packageDetails: PackageDetails;
}

const ConfirmationPage = () => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get("bookingId");

  useEffect(() => {
    if (bookingIdParam) {
      setBookingId(bookingIdParam);
    }
  }, [bookingIdParam]);

  useEffect(() => {
    if (bookingId) {
      const fetchBookingDetails = async () => {
        try {
          const response = await axiosInstance.get(`/bookings/${bookingId}`);
          setBookingDetails(response.data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      };
      fetchBookingDetails();
    }
  }, [bookingId]);

  if (!bookingDetails) {
    return <div>Loading...</div>;
  }

  const downloadPDF = async () => {
    const { name, email, phoneNumber, numberOfTravellers, specialRequests, price, packageDetails } = bookingDetails;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont("Helvetica");
    const fontSize = 12;

    page.drawText(`Booking Confirmation`, { x: 50, y: 750, font, size: 18 });
    page.drawText(`Name: ${name}`, { x: 50, y: 730, font, size: fontSize });
    page.drawText(`Email: ${email}`, { x: 50, y: 710, font, size: fontSize });
    page.drawText(`Phone: ${phoneNumber}`, { x: 50, y: 690, font, size: fontSize });
    page.drawText(`Number of Travellers: ${numberOfTravellers}`, { x: 50, y: 670, font, size: fontSize });
    page.drawText(`Special Requests: ${specialRequests}`, { x: 50, y: 650, font, size: fontSize });
    page.drawText(`Package: ${packageDetails.title}`, { x: 50, y: 630, font, size: fontSize });
    page.drawText(`Package Description: ${packageDetails.description}`, { x: 50, y: 610, font, size: fontSize });
    page.drawText(`Price: Rs${price}`, { x: 50, y: 590, font, size: fontSize });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "booking-confirmation.pdf";
    link.click();
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen text-center">
      <div className="artboard phone-5">
        <div className="card bg-base-100 w-96 shadow-lg">
          <div className="card-body text-start">
            <h1 className="card-titles text-2xl"><b>Booking Confirmation</b></h1>
            <p><span className="text-lg font-bold">Name:</span> {bookingDetails?.name}</p>
            <p><span className="text-lg font-bold">Email:</span> {bookingDetails?.email}</p>
            <p><span className="text-lg font-bold">Phone Number:</span> {bookingDetails?.phoneNumber}</p>
            <p><span className="text-lg font-bold">No. of Travellers:</span> {bookingDetails?.numberOfTravellers}</p>
            <p><span className="text-lg font-bold">Special Requests:</span> {bookingDetails?.specialRequests}</p>
            <p><span className="text-lg font-bold">Package Title:</span> {bookingDetails?.packageDetails?.title}</p>
            <p><span className="text-lg font-bold">Package Description:</span> {bookingDetails?.packageDetails?.description}</p>
            <p><span className="text-lg font-bold">Price:</span> {bookingDetails?.price}</p>

            {/* Button to download the PDF */}
            <div className="card-actions mt-5">
              <button onClick={downloadPDF} className="btn btn-xl shadow-xl border-base-100">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

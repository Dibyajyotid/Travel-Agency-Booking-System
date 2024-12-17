import Link from "next/link";

interface PackageDetails {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface Booking {
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

const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <div className="card shadow-lg rounded-lg p-4 border">
      <h3 className="text-xl font-semibold">{booking.name}</h3>
      <p className="text-gray-600">{booking.email}</p>
      <p className="text-gray-600">{booking.phoneNumber}</p>
      <p className="text-blue-500">Price: ₹{booking.price}</p>
      {booking.packageDetails && (
        <div>
          <p className="font-medium">Package: {booking.packageDetails.name}</p>
          <img
            src={booking.packageDetails.imageUrl || "/default.jpg"}
            alt={booking.packageDetails.name}
            className="w-full h-32 object-cover rounded-md mt-2"
          />
        </div>
      )}
      <Link href={`/admin/allbookings/${booking._id}`}>
        <button className=" btn ring-1 hover:text-black bg-blue-600 text-white px-4 py-2 rounded-lg shadow-2xl mt-4">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default BookingCard;

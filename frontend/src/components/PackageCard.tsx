
import Link from "next/link";
 import Image from "next/image";
import { Package } from "@/types/types";

const PackageCard = ({ pkg }: { pkg: Package }) => {
  return (
    <div className="card border rounded-lg shadow-lg w-full">
      <figure className="px-10 pt-10">
        <Image
          src={pkg.image || "/default.jpg"}
          alt={pkg.title}
          width={500}
          height={500}
          className=" rounded-lg shadow-lg"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="text-xl font-bold mt-5">{pkg.title}</h2>
        <p className="text-blue-500 font-bold mt-2">Price: ₹{pkg.price}</p>
        <Link
          href={`/packages/${pkg._id}`} 
          className=" btn mt-4 text-base-content text-base shadow-lg text-center w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;

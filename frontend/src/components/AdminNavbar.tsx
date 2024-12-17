"use client"
import { MapPinned, DoorClosed, PackageSearch, TicketsPlane, PackagePlus } from "lucide-react";
import Link from "next/link";

export const AdminNavbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-100 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 shadow-xl'>
        <div className='container mx-auto px-4 h-20'>
            <div className='flex items-center justify-between h-full'>
            {/* left section icon */}
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                    <div className='size-9 rounded-lg bg-orangy flex items-center justify-center'>
                        <MapPinned className='size-7' />
                    </div>
                    <h1 className='text-lg font-bold '>Travel</h1>
                </div>
            </div>

            <div className="flex items-center gap-5">
                {/* Home button */}
                <Link href={"/"} className={`btn btn-xl gap-2 transition-colors shadow-lg`}>
                    <DoorClosed className='size-7' />
                    <span className='sm:inline'>Homepage</span>
                </Link>
            </div>

            {/* Right Section */}
            <div className='flex items-center gap-5'>

                

                {/* packages button */}
                <Link href={"/admin/packages"} className={`btn btn-xl gap-2 transition-colors shadow-lg`}>
                    <PackageSearch className='size-7' />
                    <span className='sm:inline'>Packages</span>
                </Link>

                {/* Add package button */}
                <Link href={"/admin/packages/addPackage"} className={`btn btn-xl gap-2 transition-colors shadow-lg`}>
                    <PackagePlus className='size-7' />
                    <span className='sm:inline'>Add Package</span>
                </Link>

                {/* booking button */}
                <Link href={"/admin/allbookings"} className={`btn btn-xl gap-2 transition-colors shadow-lg`}>
                    <TicketsPlane className='size-7' />
                    <span className='sm:inline'>Bookings</span>
                </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

//export default Navbar;

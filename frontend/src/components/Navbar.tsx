"use client"
import { MapPinned, DoorClosed, UserCog } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
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

            {/* Right Section */}
            <div className='flex items-center gap-2'>

                {/* Home button */}
                <Link href={"/"} className={`btn btn-xl gap-2 transition-colors shadow-lg`}>
                    <DoorClosed className='size-7' />
                    <span className='sm:inline'>Homepage</span>
                </Link>

                {/* admin button */}
                <Link href={"/admin"} className={`btn btn-xl gap-2 transition-colors shadow-lg`}>
                    <UserCog className='size-7' />
                    <span className='sm:inline'>Admin</span>
                </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

//export default Navbar;

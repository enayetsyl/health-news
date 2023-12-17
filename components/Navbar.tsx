'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();

  return (
    <div className="flex justify-between items-center border-b-black border-b p-5 bg-logo">
        {/* left div */}
      <div className="space-y-2">
        <Link href={'/'}>
        <h1 className="text-4xl font-bold text-white">Health News</h1>
        </Link>
        <p className="text-[12px] font-bold">Vital View: Health Headlines Unveiled</p>
      </div>
        {/* right div */}
      {
        status === 'authenticated' ? (<div>
          <button
          className="bg-white text-black px-3 py-2 rounded-lg font-bold text-sm"
          onClick={() => signOut()}
          >Log Out</button>

        </div>) : (

<button 
        className="bg-white text-black px-3 py-2 rounded-lg font-bold text-sm">
          <Link href={'/login'}>
          Login
          </Link>
        </button>
        )
      }
        
    </div>
  );
};

export default Navbar;
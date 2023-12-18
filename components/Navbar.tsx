'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { status, data:session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() =>{
    const handleClickOutside = (e: MouseEvent)=>{
      if(popupRef.current && !popupRef.current.contains(e.target as Node)){
        setIsPopupVisible(false)
      }
    };
    document.addEventListener("click", handleClickOutside)

    if(!isPopupVisible){
      document.removeEventListener("click", handleClickOutside)
    }

    return() => {
      document.removeEventListener("click", handleClickOutside)
    }

  },[isPopupVisible])
  
  return (
    <div className="flex justify-between items-center border-b-black border-b p-5 bg-logo relative">
        {/* left div */}
      <div className="space-y-2">
        <Link href={'/'}>
        <h1 className="text-4xl font-bold text-white">Health News</h1>
        </Link>
        <p className="text-[12px] font-bold">Vital View: Health Headlines Unveiled</p>
      </div>
        {/* right div */}
      {
        status === 'authenticated' ? (
            <>
            <div 
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 p-4 bg-white shadow-lg rounded-lg flex-col gap-2 text-right min-w-[160px] ${(isPopupVisible) ? 'flex' : 'hidden'}`}>
              <p>{session?.user?.name }</p>
              <p>{session?.user?.email}</p>
              <Link href={'/dashboard'} className="hover:underline"
              onClick={() => setIsPopupVisible(false)}
              >Dashboard</Link>
              <Link href={'/create-post'} className="hover:underline"
               onClick={() => setIsPopupVisible(false)}
              >Create Post</Link>
          <button
          className="bg-logo text-white px-3 py-2 rounded-lg font-bold text-sm"
          onClick={() => signOut()}
          >Log Out</button>
        </div>
       <div className="flex gap-2 items-center mr-5">
        <Link href={'create-post'}
        className="hidden md:flex gap-1 items-center text-white"
        >
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        </span>
        <span>Create New</span>
        </Link>
       <Image src={session?.user?.image || ''}
        width={36} height={36} alt="Profile Image"
        className="rounded-full cursor-pointer"
        onClick={() => setIsPopupVisible((prev) => !prev)}
        />
       </div>
            </>

        ) : (

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
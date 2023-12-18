'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
import {getServerSession} from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions)
  if(session) {
    redirect('/dashboard')
  }
  return (
    <div className="flex justify-center items-center flex-col gap-5">
    <h1 className="text-4xl font-bold mb-5">Login</h1>      
    <div>
      <button 
      onClick={() => signIn('google')}
      className="bg-logo px-8 py-3 gap-3 text-white flex justify-center items-center rounded-3xl">
        <span>
          <Image src={'/google-logo.png'}
          width={20}
          height={30}
          alt='Google logo'
          />
        </span> <span className="font-bold">Login with Google</span>
      </button>
    </div>
    <div>
      <button 
      onClick={() => signIn('github')}
      className="bg-logo px-8 py-3 gap-3 text-white flex justify-center items-center rounded-3xl">
        <span>
          <Image src={'/git-hub-logo.png'}
          width={20}
          height={30}
          alt='github logo'
          />
        </span> <span className="font-bold">Login with GitHub</span>
      </button>
    </div>
    </div>
  );
};

export default page;
import React from 'react';
import { postsData } from '@/data';
import Post from '@/components/Post';
import Link from 'next/link';
import {getServerSession} from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const Dashboard = async() => {
  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/login')
  }
  return (
    <div>
      <h1>this is dashboard</h1>
      {
      postsData && postsData.length > 0 ? (postsData.map((post, i) => <Post id={post.id} author={post.author} date={post.datePublished} thumbnail={post.thumbnail} category={post.category} content={post.content} title={post.title} links={post.links}
      key={i}
      />)) : (<div className='py-6 flex flex-col gap-5 items-center'>
        <p className='font-bold'>No posts created yet.</p>
      <Link href={'/create-post'}>
<button className="text-white bg-logo font-bold text-center py-2 px-5 rounded-lg my-2">Create New</button>

      </Link>
      </div>
      )
    }
    </div>
  );
};

export default Dashboard;
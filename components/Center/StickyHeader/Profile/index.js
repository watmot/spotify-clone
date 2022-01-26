import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import React from 'react';
import Image from 'next/image';

function Profile() {
  const { data: session, status } = useSession();
  console.log(session?.user.image);
  return (
    <div className="flex items-center bg-black/60 space-x-3 hover:bg-gray-800 cursor-pointer rounded-full p-1 pr-2">
      <Image
        src={session?.user.image}
        alt=""
        layout="fill"
        objectFit="contain"
        placeholder="blur"
      />
      <h2 className="text-white font-bold">{session?.user.name}</h2>
      <ChevronDownIcon className="h-5 w-5 text-white" />
    </div>
  );
}

export default Profile;

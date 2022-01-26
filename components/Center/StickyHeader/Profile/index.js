import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import React from 'react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Menu from './Menu';

function Profile() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`relative flex items-center justify-start ${
        open ? 'bg-[#282828]' : 'bg-black/60'
      }  space-x-3 hover:bg-[#282828] cursor-pointer rounded-full p-1 pr-2`}
      onClick={handleClick}
      ref={ref}
    >
      <img className="w-7 h-7 rounded-full" src={session?.user.image} alt="" />

      <h2 className="text-white font-bold">{session?.user.name}</h2>
      <ChevronDownIcon className="h-5 w-5 text-white" />
      {open && <Menu />}
    </div>
  );
}

export default Profile;

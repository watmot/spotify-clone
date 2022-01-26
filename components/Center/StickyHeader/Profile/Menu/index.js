import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { LogoutIcon } from '@heroicons/react/outline';

const Menu = () => {
  return (
    <div className="absolute flex flex-col items-start right-0 top-12 w-[12.5rem] bg-[#282828] rounded-md text-sm">
      <button
        className="flex justify-between w-full p-3 text-white"
        onClick={signOut}
      >
        <p>Log out</p>
        <LogoutIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Menu;

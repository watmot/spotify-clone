import React from 'react';
import { signOut, useSession } from 'next-auth/react';

const Menu = () => {
  return (
    <div className="absolute flex flex-col items-start right-0 top-12 w-[12.5rem] bg-[#282828] rounded-md text-sm">
      <button className="p-3 text-white" onClick={signOut}>
        <p>Log out</p>
      </button>
    </div>
  );
};

export default Menu;

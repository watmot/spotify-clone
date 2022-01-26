import React from 'react';
import { PlayIcon } from '@heroicons/react/solid';
import Profile from './Profile';

const StickyHeader = ({ title, positionTop, backgroundColor }) => {
  if (positionTop <= 0) {
    return (
      <header className="fixed top-0 w-full bg-[#181818] z-20">
        <div
          className="flex items-center justify-start h-20 "
          style={{ backgroundColor: backgroundColor }}
        >
          <PlayIcon className="h-16 w-16 hover:scale-105 text-[#18D860] drop-shadow-xl ml-10" />
          <h2 className="text-white font-bold text-2xl ml-4">{title}</h2>
        </div>
        <div className="fixed top-5 right-8">
          <Profile />
        </div>
      </header>
      //
    );
  }
  return (
    <header className="fixed top-5 right-8 z-20">
      <Profile />
    </header>
  );
};

export default StickyHeader;

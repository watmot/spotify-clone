import { DotsHorizontalIcon } from '@heroicons/react/outline';
import {
  ArrowCircleDownIcon,
  ExclamationCircleIcon,
  PlayIcon,
} from '@heroicons/react/solid';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export default function Track({
  number,
  imageUrl,
  title,
  artists,
  album,
  date,
  duration,
  explicit,
}) {
  const [hover, setHover] = useState(false);

  const parsedDate = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toLocaleString('en-us', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [date]);

  const parsedDuration = useMemo(() => {
    const mins = Math.floor(duration / 60000);
    const secs = ((duration % 60000) / 1000).toFixed(0);

    return secs === 60
      ? mins + 1 + ':00'
      : mins + ':' + (secs < 10 ? '0' : '') + secs;
  }, [duration]);

  // Event Handlers
  const handleMouseOver = () => {
    setHover(!hover);
  };

  return (
    <div
      className="flex items-center rounded-md hover:bg-gray-200/10 min-w-0 pt-2 pb-2 z-10"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOver}
    >
      <h3 className="w-[3rem] text-center">
        {hover ? <PlayIcon className="w-5 h-5 text-gray-200 m-auto" /> : number}
      </h3>
      <div className="flex-1 flex items-center min-w-0">
        <div className="shrink-0 relative w-10 h-10 mr-4">
          <Image
            src={imageUrl}
            alt="Alt Text"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="min-w-0 pr-6">
          <h2 className="text-gray-200 text-base font-medium truncate">
            {title}
          </h2>
          <div className="flex items-center min-w-0">
            <ExclamationCircleIcon
              className={`shrink-0 w-5 h-5 mr-1 ml-1 text-gray-400 ${
                !explicit && 'hidden'
              }`}
            />
            <h3 className={`text-sm truncate ${hover && 'text-gray-200'}`}>
              {artists.map((artist) => artist.name).join(', ')}
            </h3>
          </div>
        </div>
      </div>
      <h3
        className={`flex-1 text-left truncate mr-6 ${hover && 'text-gray-200'}`}
      >
        {album}
      </h3>
      <h3 className="flex-1 truncate">{parsedDate}</h3>
      <h3 className="w-[5rem] text-right">{parsedDuration}</h3>
      <div className="w-[3rem]">
        <DotsHorizontalIcon
          className={`w-5 h-5 text-gray-200 m-auto ${!hover && 'hidden'}`}
        />
      </div>
    </div>
  );
}

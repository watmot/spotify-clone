import { ClockIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState } from 'recoil';
import { activePlaylistState } from '../../atoms/playlistAtom';
import Track from './Track';
import StickyHeader from './StickyHeader';

const colors = {
  red: '239, 68, 68',
  yellow: '250, 204, 21',
  green: '34, 197, 94',
  blue: '59, 130, 246',
  indigo: '99, 102, 241',
  purple: '168, 85, 247',
  pink: '236, 72, 153',
};

function Center() {
  const [color, setColor] = useState('');
  const [positionTop, setPositionTop] = useState(0);

  const [activePlaylist, setActivePlaylist] =
    useRecoilState(activePlaylistState);

  const elementRef = useRef();

  const handleScroll = () => {
    setPositionTop(elementRef.current.getBoundingClientRect().top);
  };

  useEffect(() => {
    setPositionTop(elementRef.current.getBoundingClientRect().top);
  }, []);

  useEffect(() => {
    const pickedColor = shuffle(Object.keys(colors)).pop();
    setColor(colors[pickedColor]);
  }, []);

  return (
    <div
      className="relative grow scrollbar-hide overflow-scroll h-screen"
      onScroll={handleScroll}
    >
      <StickyHeader
        positionTop={positionTop}
        title={activePlaylist?.name}
        backgroundColor={`rgba(${color}, 0.25)`}
      />

      <div className="flex flex-col bg-[#181818] pb-8">
        <section
          className={`flex items-end h-[28rem] pl-8 pr-8 pt-6 pb-6`}
          style={{
            background: `linear-gradient(rgba(${color}, 1), rgba(${color}, 0.5))`,
          }}
        >
          <img
            className="h-60 w-60 object-cover mr-8 drop-shadow-2xl"
            src={activePlaylist?.images[0].url}
            alt=""
          />
          <div className="z-10">
            <h2 className="text-white font-bold pb-2 text-xs">PLAYLIST</h2>
            <h1 className="text-white max-w-[30rem] text-5xl font-bold tracking-tighter">
              {activePlaylist?.name}
            </h1>
            <h2 className="text-gray-200 font-bold pt-3 text-sm">
              {activePlaylist?.owner.display_name}
            </h2>
          </div>
        </section>

        {/* PLAYLIST */}
        <div className="relative overflow-y-scroll scrollbar-hide">
          {/* BACKGROUND GRADIENT */}
          <div
            className={`absolute h-[10rem] w-full`}
            style={{
              background: `linear-gradient(rgba(${color}, 0.25), #181818)`,
            }}
          ></div>
          {/* MISC CONTROLS */}
          <section
            className="flex h-[7rem] items-center z-10 pl-8 pr-8"
            ref={elementRef}
          >
            <PlayIcon className="h-20 w-20 hover:scale-105 text-[#18D860] drop-shadow-xl" />
          </section>

          <section className="text-sm text-gray-400 pl-8 pr-8 z-20">
            {/* TABLE HEAD */}
            <div className="flex items-center mb-1">
              <h3 className="w-[3rem] text-lg text-center">#</h3>
              <h3 className="flex-1 text-left">TITLE</h3>
              <h3 className="flex-1 text-left mr-6">ALBUM</h3>
              <h3 className="flex-1 text-left">DATE ADDED</h3>
              <div className="w-[5rem] flex items-center justify-end">
                <ClockIcon className="w-5 h-5" />
              </div>
              <div className="w-[3rem]"></div>
            </div>
            <hr className="border-t-[0.1px] border-gray-700 mb-5" />
            {/* TRACKS */}
            <div className="flex flex-col">
              {activePlaylist &&
                activePlaylist.tracks.items.map((track, index) => (
                  <Track
                    key={track.id}
                    number={index + 1}
                    imageUrl={track.track.album.images[0].url}
                    title={track.track.name}
                    artists={track.track.artists}
                    album={track.track.album.name}
                    date={track.added_at}
                    duration={track.track.duration_ms}
                    explicit={track.track.explicit}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Center;

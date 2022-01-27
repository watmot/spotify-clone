import { signOut, useSession } from 'next-auth/react';
import {
  HeartIcon,
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { activePlaylistState, playlistsState } from '../../atoms/playlistAtom';
import useSpotify from '../../hooks/useSpotify';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useRecoilState(playlistsState);
  const [activePlaylist, setActivePlaylist] =
    useRecoilState(activePlaylistState);

  const getPlaylistData = (playlistId) => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      const playlist = data.body;
      setActivePlaylist(playlist);
    });
  };

  useEffect(() => {
    // Get all user playlists
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        const playlistData = data.body.items;
        setPlaylists(playlistData);
        getPlaylistData(playlistData[0].id);
      });
    }
  }, [session, setPlaylists, setActivePlaylist, spotifyApi]);

  return (
    <div className="grow-0 min-w-[17.5rem] text-gray-300 p-5 text-sm border-r border-black overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-4">
        <div className="space-y-5">
          <button className="flex items-center space-x-4 hover:text-white">
            <HomeIcon className="h-5 w-5" />
            <p className="font-bold">Home</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white">
            <SearchIcon className="h-5 w-5" />
            <p className="font-bold">Search</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white pb-4">
            <LibraryIcon className="h-5 w-5" />
            <p className="font-bold">Your Library</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white">
            <PlusCircleIcon className="h-5 w-5" />
            <p className="font-bold">Create Playlist</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white">
            <HeartIcon className="h-5 w-5" />
            <p className="font-bold">Liked Songs</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white">
            <RssIcon className="h-5 w-5" />
            <p className="font-bold">Your Episodes</p>
          </button>
        </div>

        <hr className="border-t-[0.1px] border-gray-900" />
        {/* PLAYLISTS */}
        {playlists &&
          playlists.map((playlist) => (
            <p
              key={playlist.id}
              className="cursor-pointer hover:text-white"
              onClick={() => {
                getPlaylistData(playlist.id);
              }}
            >
              {playlist.name}
            </p>
          ))}
      </div>
    </div>
  );
}

export default Sidebar;

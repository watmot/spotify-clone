import { atom } from 'recoil';

export const activePlaylistState = atom({
  key: 'activePlaylistState',
  default: null,
});

export const playlistsState = atom({
  key: 'playlistsState',
  default: null,
});

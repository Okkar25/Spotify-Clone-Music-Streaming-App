import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [], // playlists in side bar
  userInfo: null,
  selectedPlaylistId: "58k8P2fT5WxU0VfCafHoOM",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  // playerState: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
      };
    }

    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.payload.playlists,
      };
    }

    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    }

    // current playlist // update selectedPlaylistId
    case reducerCases.SET_PLAYLIST_SONGS: {
      return {
        ...state,
        selectedPlaylistId: action.payload.playlistId,
      };
    }

    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.payload.selectedPlaylist,
      };
    }

    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.payload.currentlyPlaying,
      };
    }

    case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState: action.payload.playerState,
      };
    }

    // current playlist // update selectedPlaylistId
    case reducerCases.SET_PLAYLIST_ID: {
      return {
        ...state,
        selectedPlaylistId: action.payload.selectedPlaylistId,
      };
    }

    default:
      return state;
  }
};

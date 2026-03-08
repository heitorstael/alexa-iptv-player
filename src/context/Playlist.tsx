import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import type { ParentComponent } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import type { Playlist } from "../types/playlist";

type PlaylistContextType = {
  playlist: Playlist;
  setPlaylist: SetStoreFunction<Playlist>;
};

const PlaylistContext = createContext<PlaylistContextType>();

export const PlaylistProvider: ParentComponent = (props) => {
  const [playlist, setPlaylist] = createStore<Playlist>({
    name: "",
    url: "",
    channels: []
  });

  return (
    <PlaylistContext.Provider value={{playlist, setPlaylist}}>
      {props.children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("can't find PlaylistContext");
  }
  return context;
}
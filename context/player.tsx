import React, {createContext, useState} from 'react';
import {Player} from '../App';

type PlayerContext = {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

type PlayerProviderProps = {
  children: JSX.Element;
};

export const PlayerContext = createContext<PlayerContext>({
  players: [],
} as any);

export const PlayerProvider = ({children}: PlayerProviderProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  return (
    <PlayerContext.Provider value={{players, setPlayers}}>
      {children}
    </PlayerContext.Provider>
  );
};

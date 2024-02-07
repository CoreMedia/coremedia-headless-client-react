import React, { createContext, useReducer } from "react";
import { TimelineEntry } from "../../models/Banner/VideoBanner";
import { Banner } from "../../models/Banner/Banner";
import { ShoppableVideoReducer } from "./ShoppableVideoReducer";

export interface ShoppableVideoContextData {
  activeBlock: number;
  selectedEntry: Banner | undefined;
  timeline?: Array<TimelineEntry>;
  playing: boolean;
}

export interface ShoppableVideoContextDataAndFunctions extends ShoppableVideoContextData {
  setTimestamp: (payload: any) => void;
  play: () => void;
  pause: () => void;
  selectEntry: (entry: Banner) => void;
}

const ShoppableVideoContext = createContext<ShoppableVideoContextDataAndFunctions>({
  setTimestamp(): void {
    return;
  },
  activeBlock: 0,
  selectedEntry: undefined,
  playing: true,
  play(): void {
    return;
  },
  pause(): void {
    return;
  },
  selectEntry(): void {
    return;
  },
});

export interface VideoPayload {
  played?: number;
  playedSeconds?: number;
  loaded?: number;
  loadedSeconds?: number;
  selectedEntry?: Banner;
}

export enum ShoppableVideoActionTypes {
  SET_TIMESTAMP = "SET_TIMESTAMP",
  PLAY_VIDEO = "PLAY_VIDEO",
  PAUSE_VIDEO = "PAUSE_VIDEO",
  UPDATE_SELECTION = "UPDATE_SELECTION",
}

export type ShoppableVideoAction = {
  type: ShoppableVideoActionTypes;
  payload?: VideoPayload;
};

const initialState: ShoppableVideoContextData = { activeBlock: 0, selectedEntry: undefined, playing: false };

interface Props {
  timeline?: Array<TimelineEntry>;
}

const ShoppableVideoContextProvider: React.FC<Props> = ({ timeline, children }) => {
  const [state, dispatch] = useReducer(ShoppableVideoReducer, { ...initialState, timeline: timeline });

  const setTimestamp = (payload: VideoPayload) => {
    dispatch({ type: ShoppableVideoActionTypes.SET_TIMESTAMP, payload });
  };

  const play = () => {
    dispatch({ type: ShoppableVideoActionTypes.PLAY_VIDEO });
  };

  const pause = () => {
    dispatch({ type: ShoppableVideoActionTypes.PAUSE_VIDEO });
  };

  const selectEntry = (entry: Banner) => {
    const payload: VideoPayload = { selectedEntry: entry };
    dispatch({ type: ShoppableVideoActionTypes.UPDATE_SELECTION, payload });
  };

  const contextValues: ShoppableVideoContextDataAndFunctions = {
    setTimestamp,
    ...state,
    play,
    pause,
    selectEntry,
  };

  return <ShoppableVideoContext.Provider value={contextValues}>{children}</ShoppableVideoContext.Provider>;
};

export const useShoppableVideoContextState = (): ShoppableVideoContextDataAndFunctions => {
  const context = React.useContext(ShoppableVideoContext);
  if (context === undefined) {
    throw new Error("useShoppableVideoContextState must be used within a ShoppableVideoContextProvider");
  }
  return context;
};

export default ShoppableVideoContextProvider;

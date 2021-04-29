import React, { createContext, useReducer } from "react";
import { ShoppableVideoReducer } from "./ShoppableVideoReducer";
import { TimelineEntry } from "../../models/Banner/VideoBanner";

export interface ShoppableVideoContextData {
  activeBlock: number;
  timeline?: Array<TimelineEntry>;
}

export interface ShoppableVideoContextDataAndFunctions extends ShoppableVideoContextData {
  setTimestamp: (payload: any) => void;
}

const ShoppableVideoContext = createContext<ShoppableVideoContextDataAndFunctions>({
  setTimestamp(): void {
    return;
  },
  activeBlock: 0,
});

export interface VideoPayload {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export enum ShoppableVideoActionTypes {
  SET_TIMESTAMP = "SET_TIMESTAMP",
}

export type ShoppableVideoAction = {
  type: ShoppableVideoActionTypes;
  payload?: VideoPayload;
};

const initialState: ShoppableVideoContextData = { activeBlock: 0 };

interface Props {
  timeline?: Array<TimelineEntry>;
}

const ShoppableVideoContextProvider: React.FC<Props> = ({ timeline, children }) => {
  const [state, dispatch] = useReducer(ShoppableVideoReducer, { ...initialState, timeline: timeline });

  const setTimestamp = (payload: VideoPayload) => {
    dispatch({ type: ShoppableVideoActionTypes.SET_TIMESTAMP, payload });
  };

  const contextValues: ShoppableVideoContextDataAndFunctions = {
    setTimestamp,
    ...state,
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

import { ShoppableVideoAction, ShoppableVideoActionTypes, ShoppableVideoContextData } from "./ShoppableVideoContext";

const isVisible = (timestamp: number, startTime: number, endTime: number | undefined): boolean => {
  return (
    timestamp !== undefined &&
    startTime !== null &&
    startTime < timestamp &&
    endTime !== undefined &&
    endTime > timestamp
  );
};

export const ShoppableVideoReducer = (
  state: ShoppableVideoContextData,
  action: ShoppableVideoAction
): ShoppableVideoContextData => {
  if (action.payload) {
    // make sure the last timeline entry does have en endTime, otherwise it will never be activated
    if (state.timeline && state.timeline[state.timeline.length - 1]) {
      state.timeline[state.timeline.length - 1].endTime = action.payload.loadedSeconds;
    }
    switch (action.type) {
      case ShoppableVideoActionTypes.SET_TIMESTAMP:
        const filter = state.timeline?.filter((item) => {
          const playedSeconds = action.payload?.playedSeconds || 0;
          return action.payload && isVisible(playedSeconds, item.startTime, item.endTime);
        });
        return {
          ...state,
          activeBlock: (filter && filter.length > 0 && filter[0] && filter[0].activeIdForBlock) || 0,
        };

      case ShoppableVideoActionTypes.UPDATE_SELECTION:
        return {
          ...state,
          selectedEntry: action.payload.selectedEntry,
        };
      default:
        return state;
    }
  } else if (ShoppableVideoActionTypes.PLAY_VIDEO === action.type) {
    return {
      ...state,
      playing: true,
    };
  } else if (ShoppableVideoActionTypes.PAUSE_VIDEO === action.type) {
    return {
      ...state,
      playing: false,
    };
  }
  return { activeBlock: 0, timeline: [], playing: true, selectedEntry: undefined };
};

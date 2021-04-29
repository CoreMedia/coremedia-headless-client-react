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
    switch (action.type) {
      case ShoppableVideoActionTypes.SET_TIMESTAMP:
        const filter = state.timeline?.filter((item) => {
          return action.payload && isVisible(action.payload.playedSeconds, item.startTime, item.endTime);
        });
        return {
          ...state,
          activeBlock: (filter && filter.length > 0 && filter[0] && filter[0].activeIdForBlock) || 0,
        };
      default:
        return state;
    }
  }
  return { activeBlock: 0, timeline: [] };
};

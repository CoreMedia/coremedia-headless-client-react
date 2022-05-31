interface globalStateType {
  rootSegment: string;
}

/**
 * defaults are using seo urls for commerce links and the site "calista"
 */
let globalState: globalStateType = {
  rootSegment: "calista",
};

export const getGlobalState = () => {
  return globalState;
};

export const setGlobalState = (nextGlobalState: globalStateType) => {
  globalState = nextGlobalState;
};

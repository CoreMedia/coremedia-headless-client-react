interface globalStateType {
  useSeo: boolean;
  siteId: string;
  rootSegment: string;
}

/**
 * defaults are using seo urls for commerce links and the site "calista"
 */
let globalState: globalStateType = {
  useSeo: true,
  rootSegment: "calista",
  siteId: "",
};

export const getGlobalState = () => {
  return globalState;
};

export const setGlobalState = (nextGlobalState: globalStateType) => {
  globalState = nextGlobalState;
};

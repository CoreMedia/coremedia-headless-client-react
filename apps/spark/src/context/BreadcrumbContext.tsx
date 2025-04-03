import React, { useCallback, useState } from "react";
import { NavigationPathItem } from "../models/Navigation/NavigationPath";

interface IBreadcrumbContext {
  navigationPath: NavigationPathItem[];
  setNavigationPath(path: NavigationPathItem[]): void;
}

const BreadcrumbContext = React.createContext<IBreadcrumbContext | null>(null);

export const useBreadcrumbContext = (): IBreadcrumbContext => {
  const context = React.useContext(BreadcrumbContext);
  if (context == undefined) {
    throw new Error("useBreadcrumbContext must be used within a BreadcrumbContextProvider.");
  }
  return context;
};

interface Props {
  navigationPath?: NavigationPathItem[];
}

export const BreadcrumbContextProvider: React.FC<Props> = ({ children }) => {
  const [naviPath, setNaviPath] = useState<NavigationPathItem[]>([]);
  const setNaviPathHandler = useCallback((path) => {
    setNaviPath(path?.concat());
  }, []);
  const contextValue: IBreadcrumbContext = {
    navigationPath: naviPath,
    setNavigationPath: setNaviPathHandler,
  };
  return <BreadcrumbContext.Provider value={contextValue}>{children}</BreadcrumbContext.Provider>;
};

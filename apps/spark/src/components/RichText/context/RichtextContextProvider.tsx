import React, { ReactNode } from "react";
import { Banner } from "../../../models/Banner/Banner";

interface RichtextContext {
  embeddedItems: Array<Banner>;
}

const richtextContext = React.createContext<RichtextContext>({ embeddedItems: [] });

export const useRichtextContextState = (): RichtextContext => {
  const context = React.useContext(richtextContext);
  if (context === undefined) {
    throw new Error("useRichtextContextState must be used within a RichtextContextProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
  items?: Array<Banner>;
}

export const RichtextContextProvider: React.FC<Props> = ({ children, items }) => {
  const richtextContextValue: RichtextContext = {
    embeddedItems: items || [],
  };

  return <richtextContext.Provider value={richtextContextValue}>{children}</richtextContext.Provider>;
};

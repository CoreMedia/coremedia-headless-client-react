import React, { ReactNode } from "react";
import { Dispatchable } from "../../../utils/ViewDispatcher/Dispatchable";

interface RichtextContext {
  embeddedItems: Array<Dispatchable>;
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
  items?: Array<Dispatchable | null>;
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return !(value === null || value === undefined) && "id" in value;
}

export const RichtextContextProvider: React.FC<Props> = ({ children, items }) => {
  const richtextContextValue: RichtextContext = {
    embeddedItems: items?.filter(notEmpty) || [],
  };

  return <richtextContext.Provider value={richtextContextValue}>{children}</richtextContext.Provider>;
};

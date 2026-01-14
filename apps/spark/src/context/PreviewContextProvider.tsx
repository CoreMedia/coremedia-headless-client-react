import React, { useState } from "react";

interface PreviewContext {
  previewDate?: Date;
}

const previewDataContext = React.createContext<PreviewContext>({});

export const usePreviewContextState = (): PreviewContext => {
  const context = React.useContext(previewDataContext);
  if (context === undefined) {
    throw new Error("usePreviewContextState must be used within a PreviewDataProvider");
  }
  return context;
};

interface Props {
  previewDate?: Date;
}

export const PreviewContextProvider: React.FC<Props> = ({ children, previewDate }) => {
  const [previewDateState] = useState(previewDate);
  const previewContextValue: PreviewContext = {
    previewDate: previewDateState,
  };
  return <previewDataContext.Provider value={previewContextValue}>{children}</previewDataContext.Provider>;
};

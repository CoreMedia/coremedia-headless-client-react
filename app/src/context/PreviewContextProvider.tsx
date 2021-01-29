import React from "react";

interface PreviewContext {
  previewDate?: string;
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
  previewDate?: string;
}

export const PreviewContextProvider: React.FC<Props> = ({ children, previewDate }) => {
  const previewContextValue: PreviewContext = {
    previewDate: previewDate,
  };
  return <previewDataContext.Provider value={previewContextValue}>{children}</previewDataContext.Provider>;
};

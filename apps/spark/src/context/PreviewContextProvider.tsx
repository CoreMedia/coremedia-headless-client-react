import React from "react";

interface PreviewContext {
  previewDate?: string;
  previewP13Experiences?: PreviewP13Experiences;
}

interface PreviewP13Experiences {
  variants?: string[];

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
  previewP13Experiences?: PreviewP13Experiences;
}

export const PreviewContextProvider: React.FC<Props> = ({ children,
                                                          previewDate,
                                                          previewP13Experiences}) => {
  const previewContextValue: PreviewContext = {
    previewDate: previewDate,
    previewP13Experiences: previewP13Experiences,
  };
  return <previewDataContext.Provider value={previewContextValue}>{children}</previewDataContext.Provider>;
};

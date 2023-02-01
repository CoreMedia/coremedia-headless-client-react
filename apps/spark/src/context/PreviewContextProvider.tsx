import React, {useContext, useState} from "react";

interface PreviewContext {
  previewDate?: string;
  previewP13NExperiences?: PreviewP13NExperiences;
  setExp2?: Function;
}

export interface PreviewP13NExperiences {
  variants?: string[];

}

const previewDataContext = React.createContext<PreviewContext>({});

export const usePreviewContextState = (): PreviewContext => {
  const context = useContext(previewDataContext);
  if (context === undefined) {
    throw new Error("usePreviewContextState must be used within a PreviewDataProvider");
  }
  return context;
};

interface Props {
  previewDate?: string;
  previewP13NExperiences?: PreviewP13NExperiences;
}

export const PreviewContextProvider: React.FC<Props> = ({ children,
                                                          previewDate,
                                                          previewP13NExperiences}) => {
  // the experience context ist used as state so that it can be manipulated.
  const [exp, setExp] = useState(previewP13NExperiences);
  const previewContextValue: PreviewContext = {
    previewDate: previewDate,
    previewP13NExperiences: exp,
    setExp2: setExp,
  };
  return <previewDataContext.Provider value={previewContextValue}>{children}</previewDataContext.Provider>;
};

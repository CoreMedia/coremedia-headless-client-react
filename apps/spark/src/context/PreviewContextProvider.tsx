import React, {useContext, useState} from "react";

interface PreviewContext {
  previewDate?: string;
  previewP13Experiences?: PreviewP13Experiences;
  setExp2?: Function;
}

export interface PreviewP13Experiences {
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
  previewP13Experiences?: PreviewP13Experiences;
}

export const PreviewContextProvider: React.FC<Props> = ({ children,
                                                          previewDate,
                                                          previewP13Experiences}) => {
  // the experience context ist used as state so that it can be manipulated.
  const [exp, setExp] = useState(previewP13Experiences);
  const previewContextValue: PreviewContext = {
    previewDate: previewDate,
    previewP13Experiences: exp,
    setExp2: setExp,
  };
  return <previewDataContext.Provider value={previewContextValue}>{children}</previewDataContext.Provider>;
};

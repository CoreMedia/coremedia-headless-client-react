import React, { useState } from "react";

interface PreviewContext {
  previewDate?: Date;
  previewCampaignId?: string;
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
  previewCampaignId?: string;
}

export const PreviewContextProvider: React.FC<Props> = ({ children, previewDate, previewCampaignId }) => {
  const [previewDateState] = useState(previewDate);
  const [previewCampaignIdState] = useState(previewCampaignId);
  const previewContextValue: PreviewContext = {
    previewDate: previewDateState,
    previewCampaignId: previewCampaignIdState,
  };
  return <previewDataContext.Provider value={previewContextValue}>{children}</previewDataContext.Provider>;
};

import React, { ReactNode } from "react";
import { LocalizedVariantFragment, PageGridPlacement, useSiteQuery } from "@coremedia-labs/graphql-layer";
import { useTranslation } from "react-i18next";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { initializeNavigation, Navigation } from "../models/Navigation/Navigation";
import { initializeFooterContainer, initializeFooterNavigationContainer } from "../models/Footer/Footer";

interface SiteContext {
  navigation?: Navigation;
  footer?: Navigation;
  footerNavigation?: Navigation;
  placements?: Array<PageGridPlacement | null> | null;
  localizedVariants?: Array<LocalizedVariantFragment>;
  currentNavigation?: Array<string>;
  cmecConfig?: CmecConfig;
  siteId: string;
  siteLocale: string;
  rootSegment: string;
  isCommerce?: boolean;
}

interface CmecConfig {
  id: string;
  url: string;
}

const siteContext = React.createContext<SiteContext>({ siteId: "", siteLocale: "en", rootSegment: "calista" });

export const useSiteContextState = (): SiteContext => {
  const context = React.useContext(siteContext);
  if (context === undefined) {
    throw new Error("useSiteContextState must be used within a SiteContextProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
  rootSegment: string;
  currentNavigation?: string;
}

export const SiteContextProvider: React.FC<Props> = ({ children, rootSegment, currentNavigation = "" }) => {
  const { data, loading, error } = useSiteQuery({
    variables: {
      rootSegment: rootSegment,
    },
  });
  const { i18n } = useTranslation();

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (
    !data ||
    !data.content ||
    !data.content.site ||
    !data.content.site.id ||
    !data.content.site.locale ||
    !data.content.pageByPath ||
    !data.content.pageByPath.localizedVariants ||
    !data.content.pageByPath.grid?.placements
  ) {
    return <PageNotFoundAlert />;
  }

  const cmecConfig: CmecConfig = {
    id: data.content.pageByPath.settings.engagement.webcareId ?? import.meta.env.VITE_ENGAGEMENT_CLOUD_ID,
    url:
      data.content.pageByPath.settings.engagement.urls.tag ??
      import.meta.env.VITE_ENGAGEMENT_CLOUD_TAG_URL ??
      "https://bywe2.byside.com/agent/bwc_we2.js",
  };

  const siteContextValue: SiteContext = {
    navigation: initializeNavigation(data.content.pageByPath, rootSegment),
    footerNavigation: initializeFooterNavigationContainer(
      data.content.pageByPath.grid?.placements as Array<PageGridPlacement>,
      rootSegment
    ),
    footer: initializeFooterContainer(
      data.content.pageByPath.grid?.placements as Array<PageGridPlacement>,
      rootSegment
    ),
    placements: data.content.pageByPath.grid?.placements as Array<PageGridPlacement>,
    localizedVariants: data.content.pageByPath.localizedVariants as Array<LocalizedVariantFragment>,
    currentNavigation: currentNavigation?.split("/").filter((item) => {
      return item !== null && item !== "";
    }),
    siteId: data.content.site.id,
    siteLocale: data.content.site.locale,
    rootSegment: rootSegment,
    isCommerce: !!data.content.pageByPath.settings.commerce,
    cmecConfig: cmecConfig.id ? cmecConfig : undefined,
  };

  i18n.changeLanguage(data.content.site.locale);

  return <siteContext.Provider value={siteContextValue}>{children}</siteContext.Provider>;
};

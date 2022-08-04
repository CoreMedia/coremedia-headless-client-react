import React, { ReactNode } from "react";
import { LocalizedVariantFragment, PageGridPlacement, useSiteQuery } from "@coremedia-labs/graphql-layer";
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
  siteId: string;
  siteLocale: string;
  rootSegment: string;
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

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (
    !data ||
    !data.content ||
    !data.content.site ||
    !data.content.site.id ||
    !data.content.pageByPath ||
    !data.content.pageByPath.localizedVariants ||
    !data.content.pageByPath.grid?.placements
  ) {
    return <PageNotFoundAlert />;
  }

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
  };

  return <siteContext.Provider value={siteContextValue}>{children}</siteContext.Provider>;
};

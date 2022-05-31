import React, { ReactNode } from "react";
import { LinkableWithLocale, PageGridPlacement, RootQuery } from "@coremedia-labs/graphql-layer";
import Loading from "../components/Loading/Loading";
import { metaDataForResponsiveDevices } from "../utils/Preview/MetaData";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import Header from "../components/Header/Header";
import FooterNavigation from "../components/Footer/FooterNavigation";
import Footer from "../components/Footer/Footer";
import { setGlobalState } from "../utils/App/GlobalState";
import { initializeNavigation, Navigation } from "../models/Navigation/Navigation";
import { StyledGrid } from "../components/PageGrid/PageGrid";
import { initializeFooterContainer, initializeFooterNavigationContainer } from "../models/Footer/Footer";

interface SiteContext {
  navigation?: Navigation;
  footer?: Navigation;
  footerNavigation?: Navigation;
  placements?: Array<PageGridPlacement | null> | null;
  localizedVariants?: Array<LinkableWithLocale>;
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
  const { data, loading, error } = RootQuery(rootSegment);

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
    footerNavigation: initializeFooterNavigationContainer(data.content.pageByPath.grid?.placements, rootSegment),
    footer: initializeFooterContainer(data.content.pageByPath.grid?.placements, rootSegment),
    placements: data.content.pageByPath.grid?.placements,
    localizedVariants: data.content.pageByPath.localizedVariants as Array<LinkableWithLocale>,
    currentNavigation: currentNavigation?.split("/").filter((item) => {
      return item !== null && item !== "";
    }),
    siteId: data.content.site.id,
    siteLocale: data.content.site.locale,
    rootSegment: rootSegment,
  };
  setGlobalState({
    rootSegment: rootSegment,
  });

  return (
    <siteContext.Provider value={siteContextValue}>
      <StyledGrid {...metaDataForResponsiveDevices()}>
        <Header />
        {children}
        <FooterNavigation />
        <Footer />
      </StyledGrid>
    </siteContext.Provider>
  );
};

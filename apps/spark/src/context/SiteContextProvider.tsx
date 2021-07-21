import React, { ReactNode } from "react";
import { PageGridPlacement } from "../queries/fragments/__generated__/PageGridPlacement";
import RootQuery from "../queries/RootQuery";
import { NavigationForNavigation as Navigation } from "../queries/fragments/Navigation";
import Loading from "../components/Loading/Loading";
import { metaDataForResponsiveDevices } from "../utils/Preview/MetaData";
import { LinkableWithLocale } from "../queries/fragments/__generated__/LinkableWithLocale";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import Header from "../components/Header/Header";
import FooterNavigation from "../components/Footer/FooterNavigation";
import Footer from "../components/Footer/Footer";
import { setGlobalState } from "../utils/App/GlobalState";

interface SiteContext {
  navigation?: Navigation;
  placements?: Array<PageGridPlacement | null> | null;
  localizedVariants?: Array<LinkableWithLocale>;
  currentNavigation?: Array<string>;
}

const siteContext = React.createContext<SiteContext>({});

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
    navigation: data.content.pageByPath as Navigation,
    placements: data.content.pageByPath.grid?.placements,
    localizedVariants: data.content.pageByPath.localizedVariants as Array<LinkableWithLocale>,
    currentNavigation: currentNavigation?.split("/").filter((item) => {
      return item !== null && item !== "";
    }),
  };
  setGlobalState({ useSeo: rootSegment !== "apparelhomepage", rootSegment: rootSegment, siteId: data.content.site.id });

  return (
    <siteContext.Provider value={siteContextValue}>
      <div className={"cm-grid"} {...metaDataForResponsiveDevices()}>
        <Header />
        {children}
        <FooterNavigation />
        <Footer />
      </div>
    </siteContext.Provider>
  );
};

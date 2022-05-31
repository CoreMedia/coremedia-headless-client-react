import React, { FC, useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { SortFieldWithOrder } from "@coremedia-labs/graphql-layer";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { SiteContextProvider } from "../../context/SiteContextProvider";
import { getRootSegment, isAPQEnabled } from "../../utils/App/App";
import PreviewPage from "../../container/PreviewPage";
import { initializeApollo } from "../../utils/App/Apollo";
import { getPreviewDate, isPreview } from "../../utils/Preview/Preview";
import { PreviewContextProvider } from "../../context/PreviewContextProvider";
import SearchStateContextProvider, { SearchSortField } from "../../context/SearchStateContext";
import { StyledAlert } from "../Error/Alert";
import { StyledLoading } from "../Loading/Loading";
import AppRoutes from "./AppRoutes";
import Woff from "./assets/BebasNeue-Regular.woff";
import Woff2 from "./assets/BebasNeue-Regular.woff2";

export const GlobalStyle = createGlobalStyle`
  :root {
    /* FONTS */
    --font-family-headline: BebasNeue, Times New Roman, Times, serif;
    --font-family-text: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --font-family-studio: 'Roboto', 'Segoe UI', 'Trebuchet MS', 'Lucida Grande', 'Helvetica', sans-serif;
    --font-size-heading-1: 60px;
    --font-size-heading-2: 30px;
    --font-size-heading-3: 20px;
    --font-size-text: 16px;
    --font-size-text-small: 14px;
    --line-height: 1.2rem;
    /* COLORS */
    --color-background-light: #fff;
    --color-background-dark: #1a1a1a;
    --color-background-grey: #333;
    --color-background-light-grey: #efefed;
    --color-menu-shadow: hsla(0, 0%, 0%, 0.5);
    --color-background-image: #ccc;
    --color-green-highlight: #6fc3b8;
    --color-green-highlight-hover: var(--color-background-dark);
    --color-green-highlight-active: var(--color-background-grey);
    --color-font-cta-hover: var(--color-background-light);
    /* SIZES */
    --padding-small: 12px;
    --padding-medium: 24px;
    --padding-large: 48px;
    --screen-size-max: 1140px;
  }

  @font-face {
    font-family: "BebasNeue";
    src: local("BebasNeue"),
    url(${Woff}) format("woff"),
    url(${Woff2}) format("woff2");
  }

  html,
  body,
  .cm-app {
    height: 100%;
  }

  .cm-app > ${StyledLoading} {
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
  }

  .cm-app {
    > ${StyledAlert} {
      position: absolute;
      bottom: 50%;
      right: 50%;
      transform: translate(50%, 50%);
      box-sizing: border-box;
      padding: var(--padding-large);

      @media screen and (min-width: 768px) {
        background: var(--color-background-image);
        width: 700px;
        border-radius: 12px;
      }
    }
  }

  body {
    font-family: var(--font-family-text);
    background-color: var(--color-background-light);
    margin: 0;

    &.cm-app--preview {
      background-color: transparent;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-headline);
    font-weight: normal;
  }

  a {
    color: var(--color-background-dark);
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

/**
 * The main app component with the ApolloClient, [[SiteContextProvider]], and [[PreviewContextProvider]]
 * @category Components
 */
const App: FC = () => {
  const location = useLocation();
  const rootSegment = getRootSegment(location.pathname) || "calista";
  const previewDate = getPreviewDate(location.search);
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const apolloClient = initializeApollo(previewDate, isAPQEnabled());

  const sortFields: Array<SearchSortField> = [
    {
      label: "Relevance",
      value: null,
    },
    {
      label: "Display Date Asc",
      value: SortFieldWithOrder.EXTERNALLY_DISPLAYED_DATE_ASC,
    },
    {
      label: "Display Date Desc",
      value: SortFieldWithOrder.EXTERNALLY_DISPLAYED_DATE_DESC,
    },
    { label: "Creation Date Asc", value: SortFieldWithOrder.CREATION_DATE_ASC },
    {
      label: "Creation Date Desc",
      value: SortFieldWithOrder.CREATION_DATE_DESC,
    },
    {
      label: "Modification Date Asc",
      value: SortFieldWithOrder.MODIFICATION_DATE_ASC,
    },
    {
      label: "Modification Date Desc",
      value: SortFieldWithOrder.MODIFICATION_DATE_DESC,
    },
  ];

  return (
    <ApolloProvider client={apolloClient}>
      <PreviewContextProvider previewDate={previewDate}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <Switch>
              <Route exact path={"/"}>
                <Redirect to={`/${rootSegment}`} />
              </Route>
              {isPreview() && <Route path={"/preview/:rootSegment/:id/"} component={PreviewPage} />}

              <SearchStateContextProvider
                sortField={urlSearchParams.get("sort")}
                sortFields={sortFields}
                query={urlSearchParams.get("query") || ""}
              >
                <SiteContextProvider rootSegment={rootSegment} currentNavigation={location.pathname}>
                  <AppRoutes />
                </SiteContextProvider>
              </SearchStateContextProvider>
            </Switch>
          </HelmetProvider>
        </ThemeProvider>
      </PreviewContextProvider>
    </ApolloProvider>
  );
};

export default App;

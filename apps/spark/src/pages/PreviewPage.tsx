import React, { FC } from "react";
import { useFragmentPreviewQuery } from "@coremedia-labs/graphql-layer";
import ViewDispatcher, { defaultView } from "@coremedia-labs/view-dispatcher";
import { match } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Fragment, fragmentsByType } from "../components/FragmentPreview/FragmentsByType";
import typeHierarchy from "../utils/ViewDispatcher/Interfaces";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import FragmentPreview from "../components/FragmentPreview/FragmentPreview";
import { useSiteContextState } from "../context/SiteContextProvider";

// Initialize the viewDispatcher
const viewDispatcher = new ViewDispatcher<Fragment | Fragment[]>(typeHierarchy);
Object.keys(fragmentsByType).forEach((type) => {
  viewDispatcher.addViewComponent(fragmentsByType[type], type);
});

interface FragmentPreviewProps {
  match: match<RouteProps>;
}

interface RouteProps {
  id: string;
  rootSegment: string;
}

const PreviewPage: FC<FragmentPreviewProps> = ({ match }) => {
  const { cmecConfig } = useSiteContextState();
  const { data, loading, error } = useFragmentPreviewQuery({
    variables: {
      contentId: match.params.id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content || !data.content.content) return <PageNotFoundAlert />;

  const self = data.content.content;

  const fragments = viewDispatcher.lookupView(self.__typename, defaultView, null) || [];

  if (!fragments) {
    return <PageNotFoundAlert />;
  }

  // cmec extra metrics
  let cmecPageData = `var bysideWebcare_content_uuid="${data.content.content.uuid}";`;
  cmecPageData += `var bysideWebcare_content_type="${data.content.content.type}";`;
  cmecPageData += `var bysideWebcare_content_locale="${data.content.content.locale}";`;

  return (
    <>
      {!!cmecConfig && (
        <Helmet>
          <script>{cmecPageData}</script>
        </Helmet>
      )}
      <FragmentPreview self={self} fragments={fragments} />
    </>
  );
};

export default PreviewPage;

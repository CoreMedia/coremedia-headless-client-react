import React, {FC} from "react";
import {useFragmentPreviewQuery} from "@coremedia-labs/graphql-layer";
import ViewDispatcher, {defaultView} from "@coremedia-labs/view-dispatcher";
import {match} from "react-router-dom";
import {Fragment, fragmentsByType} from "../components/FragmentPreview/FragmentsByType";
import typeHierarchy from "../utils/ViewDispatcher/Interfaces";
import Loading from "../components/Loading/Loading";
import {ApolloClientAlert, PageNotFoundAlert} from "../components/Error/Alert";
import FragmentPreview from "../components/FragmentPreview/FragmentPreview";
import {PreviewP13Experiences, usePreviewContextState} from "../context/PreviewContextProvider";

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
  const { data, loading, error } = useFragmentPreviewQuery({
    variables: {
      contentId: match.params.id,
    },
  });

  // catch the function to set the preview experience
  const { setExp2 } = usePreviewContextState();

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content || !data.content.content) return <PageNotFoundAlert />;

  const self = data.content.content;

  const fragments = viewDispatcher.lookupView(self.__typename, defaultView, null) || [];

  if (!fragments) {
    return <PageNotFoundAlert />;
  }

  // the p13 hook which is used by studio "eye".
  window.addEventListener("message", function (event) {
    const data = event.data;
    if (data.type === "previewExperience") {
      const variantId = data?.body?.variantId;
      const exp:PreviewP13Experiences = {variants: [variantId]};
      setExp2 && setExp2(exp);
    }
  }, false);

  return <FragmentPreview self={self} fragments={fragments} />;
};

export default PreviewPage;

import React, { FC } from "react";
import { match } from "react-router-dom";
import { CommerceBeanType, useCommercePreviewQuery } from "@coremedia-labs/graphql-layer";
import Loading from "../components/Loading/Loading";
import { Alert, ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import Include from "../utils/ViewDispatcher/Include";
import { useSiteContextState } from "../context/SiteContextProvider";

interface CommercePreviewProps {
  match: match<RouteProps>;
}

interface RouteProps {
  externalId: string;
  type: string;
}

const asCommerceBeanType = (beanTypeName: string | null): CommerceBeanType | null => {
  if (Object.values(CommerceBeanType).some((col: string) => col === beanTypeName)) {
    return beanTypeName as CommerceBeanType;
  }
  return null;
};

const CommercePreviewPage: FC<CommercePreviewProps> = ({ match }) => {
  const { siteId } = useSiteContextState();
  const commerceBeanType = asCommerceBeanType(match.params.type);
  if (!commerceBeanType) {
    return <Alert title="Invalid Type" message="Sorry, the requested type is not available." />;
  }

  const { data, loading, error } = useCommercePreviewQuery({
    variables: {
      externalId: match.params.externalId,
      type: commerceBeanType,
      siteId: siteId,
    },
  });

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.commerceBeanByType) return <PageNotFoundAlert />;

  const self = data.commerceBeanByType;

  return <Include self={self} view={"asPreview"} />;
};

export default CommercePreviewPage;

import React, { FC } from "react";
import { match } from "react-router-dom";
import { DetailQuery } from "@coremedia-labs/graphql-layer";
import Include from "../utils/ViewDispatcher/Include";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";

interface DetailViewProps {
  match: match<RouteProps>;
}

interface RouteProps {
  id: string;
}

const DetailPage: FC<DetailViewProps> = ({ match }) => {
  const { data, loading, error } = DetailQuery(match.params.id);

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content) return <PageNotFoundAlert />;

  return (
    <>
      <div id="cm-placement-main" className="cm-placement cm-placement--main">
        {data.content.content && <Include self={data.content.content} view={"asDetail"} />}
      </div>
    </>
  );
};

export default DetailPage;

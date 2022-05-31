import React, { FC } from "react";
import { StandaloneQuery } from "@coremedia-labs/graphql-layer";
import Loading from "./Loading";

import "./StandaloneFragment.css";

interface Props {
  contentId: string;
  caasUri: string;
}

const StandaloneFragment: FC<Props> = ({ contentId, caasUri }) => {
  const { data, loading, error } = StandaloneQuery(contentId);

  if (loading) return <Loading />;
  if (error) return <></>;
  if (!data || !data.content || !data.content.content) return <></>;

  // model
  const banner = {
    teaserTitle: data.content.content.teaserTitle,
    teaserText: data.content.content.plainTeaserText,
    picture: {
      alt: data.content.content.picture?.alt || "",
      url:
        data.content.content?.picture !== null
          ? caasUri +
            data.content.content.picture.uriTemplate
              .replace("{cropName}", "landscape_ratio8x3")
              .replace("{width}", "1144")
          : "",
    },
  };

  // view
  return (
    <div>
      <div>
        <h1>{banner.teaserTitle}</h1>
        <div>{banner.teaserText}</div>
      </div>
      <picture>{banner.picture.url && <img src={banner.picture.url} alt={banner.picture.alt} />}</picture>
    </div>
  );
};

export default StandaloneFragment;

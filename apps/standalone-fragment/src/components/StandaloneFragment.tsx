import React, { FC } from "react";
import StandaloneFragmentQuery from "../queries/StandaloneFragmentQuery";
import Loading from "./Loading";

import "./StandaloneFragment.css";

interface Props {
  contentId: string;
  caasUri: string;
}

const StandaloneFragment: FC<Props> = ({ contentId, caasUri }) => {
  const { data, loading, error } = StandaloneFragmentQuery(contentId);

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
    <div className={"cm-banner"}>
      <div className={"cm-banner__caption"}>
        <h1 className={"cm-banner__title"}>{banner.teaserTitle}</h1>
        <div className={"cm-banner__text"}>{banner.teaserText}</div>
      </div>
      <picture className={"cm-banner__picture"}>
        {banner.picture.url && <img src={banner.picture.url} alt={banner.picture.alt} />}
      </picture>
    </div>
  );
};

export default StandaloneFragment;

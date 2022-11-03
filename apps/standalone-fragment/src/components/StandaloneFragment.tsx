import React, { FC } from "react";
import { StandaloneTeasableFragment, useStandaloneFragmentQuery } from "@coremedia-labs/graphql-layer";
import Loading from "./Loading";

import "./StandaloneFragment.css";

interface Props {
  contentId: string;
  caasUri: string;
}

const StandaloneFragment: FC<Props> = ({ contentId, caasUri }) => {
  const { data, loading, error } = useStandaloneFragmentQuery({ variables: { contentId } });

  if (loading) return <Loading />;
  if (error)
    return (
      <>
        <h2>Error</h2>
        <p>{error.message}</p>
      </>
    );
  if (!data || !data.content || !data.content.content)
    return (
      <>
        <h2>Error</h2>
        <p>No content found.</p>
      </>
    );

  const content = data.content.content as StandaloneTeasableFragment;

  // model
  const banner = {
    teaserTitle: content.teaserTitle,
    teaserText: content.teaserText?.plaintext,
    picture: {
      alt: content.picture?.alt || "",
      url:
        content.picture !== null
          ? caasUri +
            content.picture?.uriTemplate?.replace("{cropName}", "landscape_ratio8x3").replace("{width}", "1144")
          : "",
    },
  };

  const codeblock = document.querySelector(".cm-preview-copy-code") as HTMLElement;
  codeblock.style.display = "block";

  // view
  return (
    <div className={"cm-banner"}>
      <div className={"cm-banner__caption"}>
        <h1>{banner.teaserTitle}</h1>
        <div>{banner.teaserText}</div>
      </div>
      <picture className={"cm-banner__picture"}>
        {banner.picture.url && <img src={banner.picture.url} alt={banner.picture.alt} />}
      </picture>
    </div>
  );
};

export default StandaloneFragment;

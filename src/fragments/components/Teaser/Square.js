import React from "react";

import {Square as TeaserBrick} from "../../../bricks/components/CMTeasable";

const SquareTeaser = {
  type: 'teasables',
  view: null,
  brick(data, params) {
    const picture = data.picture || {};
    return (
      <TeaserBrick url={params.url ? params.url : data.teaserTarget.link}
                   pictureLink={picture.link}
                   pictureTitle={picture.title}
                   pictureAlt={picture.alt}
                   title={data.teaserTitle}
                   text={data.teaserText}
                   params={params}
      />
    );
  }
};

export default SquareTeaser;

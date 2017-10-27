import React from "react";

import {Hero as HeroBrick} from "../../../bricks/components/CMTeasable";

const Hero = {
  type: 'teasables',
  view: null,
  brick(data, params) {
    const picture = data.picture || {};
    return (
      <HeroBrick url={params.url ? params.url : data.teaserTarget.link}
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

export default Hero;

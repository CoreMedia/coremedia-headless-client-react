import React from "react";
import Include from "../../utils/ViewDispatcher/Include";
import Slider from "../Slider/Slider";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";

interface Props {
  media: Array<Dispatchable | null> | null;
}

const DetailedMedia: React.FC<Props> = ({ media }) => {
  return (
    <Slider
      className={`cm-details__medias`}
      innerArrows={true}
      config={{
        fade: true,
        arrows: true,
      }}
    >
      {media &&
        media.map((content, index) => {
          return content && <Include key={index} self={content} view={"asDetail"} />;
        })}
    </Slider>
  );
};
export default DetailedMedia;

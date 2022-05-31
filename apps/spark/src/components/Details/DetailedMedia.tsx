import React from "react";
import styled from "styled-components";
import { Video } from "../../models/Banner/Media";
import { Picture } from "../../models/Banner/Picture";
import { supportsVideo } from "../../models/Banner/VideoBanner";
import Image from "../Media/Image";
import VideoPlayer from "../Media/VideoPlayer";
import Slider from "../Slider/Slider";

interface Props {
  media: Array<Video | Picture | null> | null;
}

export const StyledMedia = styled.div`
  margin-bottom: var(--padding-large);
`;

const DetailedMedia: React.FC<Props> = ({ media }) => {
  return (
    <Slider
      className={StyledMedia.styledComponentId}
      innerArrows={true}
      config={{
        fade: true,
        arrows: true,
      }}
    >
      {media &&
        media.map((media, index) => {
          return (
            media && (
              <div key={index}>
                {supportsVideo(media) && (
                  <VideoPlayer
                    video={media.video}
                    controls={false}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    metadata={media.metadata}
                  />
                )}
                {"uriTemplate" in media && <Image picture={media} cropName={"landscape_ratio8x3"} width={1144} />}
              </div>
            )
          );
        })}
    </Slider>
  );
};
export default DetailedMedia;

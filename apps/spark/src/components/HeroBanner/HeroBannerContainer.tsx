import React from "react";
import { Slot } from "../../models/Grid/Slot";
import ShoppableHeroVideo from "../ShoppableVideo/ShoppableHeroVideo";
import Slider, { Settings } from "../Slider/Slider";
import HeroBanner from "./HeroBanner";

const heroConfig: Settings = {
  fade: true,
};

const HeroBannerContainer: React.FC<Slot> = ({ items }) => {
  return (
    <Slider innerArrows={true} config={heroConfig}>
      {items.map((content, index) => {
        //Hero is supporting shoppable videos. check if the viewtype is set
        if (content.viewtype && content.viewtype === "shoppable") {
          return <ShoppableHeroVideo banner={content} key={index} />;
        }
        return <HeroBanner banner={content} key={index} />;
      })}
    </Slider>
  );
};
export default HeroBannerContainer;

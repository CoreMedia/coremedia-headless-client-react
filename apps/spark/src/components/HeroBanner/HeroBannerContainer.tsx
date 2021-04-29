import React from "react";
import { Slot } from "../../models/Grid/Slot";
import Include from "../../utils/ViewDispatcher/Include";
import Slider, { Settings } from "../Slider/Slider";

const heroConfig: Settings = {
  fade: true,
};

const HeroBannerContainer: React.FC<Slot> = ({ items }) => {
  return (
    <Slider className={"cm-hero-banner-container"} innerArrows={true} config={heroConfig}>
      {items &&
        items.map((content, index) => {
          return (
            content && (
              <Include
                key={index}
                self={content}
                view={"_gridItem"}
                params={{ includeView: "asHeroBanner", className: "cm-hero-banner" }}
              />
            )
          );
        })}
    </Slider>
  );
};
export default HeroBannerContainer;

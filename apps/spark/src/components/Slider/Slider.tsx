import React from "react";
import ReactSlider, { Settings as ReactSliderSettings } from "react-slick";
import "./Slider.scss";

interface Props {
  className?: string;
  innerArrows?: boolean;
  config: Settings;
}

export type Settings = ReactSliderSettings;

const Slider: React.FC<Props> = ({ className, config, innerArrows = false, children }) => {
  return (
    <ReactSlider
      className={`cm-slick-carousel ${innerArrows ? "cm-slick-carousel--inner-arrows" : ""} ${className}`}
      {...config}
    >
      {children}
    </ReactSlider>
  );
};
export default Slider;

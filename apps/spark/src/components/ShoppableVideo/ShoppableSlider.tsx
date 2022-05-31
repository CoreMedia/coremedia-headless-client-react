import React, { useEffect } from "react";
import ReactSlider, { Settings as ReactSliderSettings } from "react-slick";
import { useShoppableVideoContextState } from "./ShoppableVideoContext";

interface Props {
  config: Settings;
}

export type Settings = ReactSliderSettings;

const ShoppableSlider: React.FC<Props> = ({ config, children }) => {
  const { activeBlock } = useShoppableVideoContextState();

  const [internalSlider, setInternalSlider] = React.useState<any>();

  useEffect(() => {
    if (internalSlider) {
      internalSlider.slickGoTo(activeBlock);
    }
  }, [internalSlider, activeBlock]);

  return (
    <ReactSlider {...(setInternalSlider && { ref: setInternalSlider })} {...config}>
      {children}
    </ReactSlider>
  );
};
export default ShoppableSlider;

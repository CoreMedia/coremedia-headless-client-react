import React from "react";
import { HotZoneProps, OverlayConfiguration } from "./ImageMapHelpers";
import useModal from "../Modal/Modal";
import ModalComponent from "../Modal/ModalComponent";
import Include from "../../utils/ViewDispatcher/Include";
import "./Imagemap.scss";

interface Props {
  hotZone?: HotZoneProps | null | undefined;
  cssClass?: string | undefined;
  overlayConfiguration?: OverlayConfiguration;
}

const Hotzone: React.FC<Props> = ({ hotZone, cssClass, overlayConfiguration }) => {
  const { isShowing, toggle } = useModal();

  const overlay: OverlayConfiguration = {
    displayTitle: true,
    displayShortText: true,
    displayPicture: true,
    displayDefaultPrice: true,
    displayDiscountedPrice: true,
    displayOutOfStockLink: true,
    ...overlayConfiguration,
  };

  return (
    <>
      {hotZone && hotZone.position && (
        <span
          className={cssClass}
          style={{
            top: hotZone.position.y + "%",
            left: hotZone.position.x + "%",
          }}
          onClick={toggle}
        />
      )}
      {hotZone && hotZone.self && (
        <ModalComponent isShowing={isShowing} hide={toggle}>
          <Include self={hotZone.self} view={"asPopup"} params={{ ...overlay }} />
        </ModalComponent>
      )}
    </>
  );
};

export default Hotzone;

import React from "react";
import styled from "styled-components";
import { HotZoneProps, ImagemapOverlayConfiguration } from "../../models/Banner/ImagemapBanner";
import useModal from "../Modal/Modal";
import ModalComponent from "../Modal/ModalComponent";
import PopupBanner from "../Popup/PopupBanner";
import ImageMapIcon from "./assets/imagemap-icon.svg";
import ImageMapIconHover from "./assets/imagemap-icon-hover.svg";

interface Props {
  hotZone: HotZoneProps;
  overlayConfiguration?: ImagemapOverlayConfiguration;
}

const HotzoneIcon = styled.span`
  position: absolute;
  z-index: 3;
  border: 0;
  padding: 0;
  display: block;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: transparent url(${ImageMapIcon}) no-repeat 50%;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    background-image: url(${ImageMapIconHover});
  }
`;

const Hotzone: React.FC<Props> = ({ hotZone, overlayConfiguration }) => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      {hotZone.position && (
        <HotzoneIcon
          style={{
            top: hotZone.position.y + "%",
            left: hotZone.position.x + "%",
          }}
          onClick={toggle}
        />
      )}
      <ModalComponent isShowing={isShowing} hide={toggle}>
        <PopupBanner banner={hotZone.self} overlay={overlayConfiguration} />
      </ModalComponent>
    </>
  );
};

export default Hotzone;

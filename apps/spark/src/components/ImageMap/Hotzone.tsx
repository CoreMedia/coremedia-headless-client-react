import React from "react";
import styled from "styled-components";
import { HotZoneProps, ImagemapOverlayConfiguration } from "../../models/Banner/ImagemapBanner";
import useModal from "../Modal/Modal";
import ModalComponent from "../Modal/ModalComponent";
import PopupBanner from "../Popup/PopupBanner";
import Link from "../Link/Link";
import { formatPrice } from "../Product/ProductPricing";
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

const HotzoneInlineLabel = styled.span`
  position: absolute;
  z-index: 3;
  padding: 2px 0.5em;
  color: black;
  font-size: 0.8em;

  a {
    color: black;
    font-weight: bold;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  &.hotzone-label--dark,
  &.hotzone-label--dark-on-light {
    color: #000;

    a {
      color: #000;
    }
  }

  &.hotzone-label--dark-on-light {
    background-color: #fff;
  }

  &.hotzone-label--light,
  &.hotzone-label--light-on-dark {
    color: #fff;

    a {
      color: #fff;
    }
  }

  &.hotzone-label--light-on-dark {
    background-color: #000;
  }
`;

const HotzonePrices = styled.div`
  span:nth-of-type(2) {
    text-decoration: line-through;
    opacity: 0.6;
  }
`;

const HotzonePriceLabel = styled.span`
  display: inline-block;
  margin-right: 1em;
`;

const Hotzone: React.FC<Props> = ({ hotZone, overlayConfiguration }) => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      {/* render inline overlay ... */}
      {hotZone.displayAsInlineOverlay && hotZone.position && hotZone.self && (
        <HotzoneInlineLabel
          className={`hotzone-label hotzone-label--${hotZone.inlineOverlayTheme}`}
          style={{
            top: hotZone.position.y + "%",
            left: hotZone.position.x + "%",
          }}
        >
          <Link to={hotZone.self.linkTarget}>{hotZone.self.title}</Link>
          <HotzonePrices>
            {overlayConfiguration?.displayDiscountedPrice && (
              <HotzonePriceLabel>
                {formatPrice(hotZone.self.offerPrice, hotZone.self.currency || null, hotZone.self.locale || null)}
              </HotzonePriceLabel>
            )}
            {overlayConfiguration?.displayDefaultPrice && (
              <HotzonePriceLabel>
                {formatPrice(hotZone.self.listPrice, hotZone.self.currency || null, hotZone.self.locale || null)}
              </HotzonePriceLabel>
            )}
          </HotzonePrices>
        </HotzoneInlineLabel>
      )}
      {/* ... or hotzone icon with popup */}
      {!hotZone.displayAsInlineOverlay && (
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
      )}
    </>
  );
};

export default Hotzone;

import React from "react";
import styled from "styled-components";
import { HotZoneProps, ImagemapOverlayConfiguration } from "../../models/Banner/ImagemapBanner";
import Hotzone from "./Hotzone";
import HotzoneRect from "./HotzoneRect";

interface Props {
  cropName: string;
  hotzones?: Array<Array<HotZoneProps>>;
  imagemapOverlayConfiguration?: ImagemapOverlayConfiguration;
}

const Areas = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  left: 0;
  right: 0;
  width: 100%;
  max-width: none;
  max-height: none;

  svg {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    left: 0;
    right: 0;
    width: 100%;
    max-width: none;
    max-height: none;

    opacity: 0;

    a {
      z-index: 2;
    }
  }
`;

const ImageMapAreas: React.FC<Props> = ({ imagemapOverlayConfiguration, hotzones, cropName }) => {
  const zones: Array<HotZoneProps> = [];
  hotzones?.forEach((entry) => {
    entry
      .filter((listEntry) => listEntry.name === cropName)
      .forEach((item) => {
        zones.push(item);
      });
  });
  return (
    <Areas>
      {zones.length > 0 && (
        <svg version={"1.1"}>
          {zones.map((p, index) => {
            return <HotzoneRect hotZone={p} key={index} />;
          })}
        </svg>
      )}
      {zones.map((p, index) => {
        return <Hotzone hotZone={p} key={index} overlayConfiguration={imagemapOverlayConfiguration} />;
      })}
    </Areas>
  );
};

export default ImageMapAreas;

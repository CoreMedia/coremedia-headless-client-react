import React from "react";
import { createHotZoneList } from "./ImageMapHelpers";
import HotzoneRect from "./HotzoneRect";
import { Hotzone as HotzoneProps } from "../../models/Banner/ImagemapBanner";
import Hotzone from "./Hotzone";

interface Props {
  cropName: string;
  hotzones?: Array<HotzoneProps>;
  overlayConfiguration?: any;
}

const ImageMapAreas: React.FC<Props> = ({ overlayConfiguration, hotzones, cropName }) => {
  const hotZonePropsList = createHotZoneList(cropName || undefined, hotzones);
  return (
    <div className={"cm-imagemap__areas"}>
      {hotZonePropsList && (
        <svg version={"1.1"}>
          {hotZonePropsList.map((p, index) => {
            return <HotzoneRect hotZone={p} key={index} />;
          })}
        </svg>
      )}
      {hotZonePropsList &&
        hotZonePropsList.map((p, index) => {
          return (
            <Hotzone
              hotZone={p}
              key={index}
              overlayConfiguration={{ ...overlayConfiguration.overlay }}
              cssClass={"cm-imagemap__hotzone cm-imagemap__hotzone--icon"}
            />
          );
        })}
    </div>
  );
};

export default ImageMapAreas;

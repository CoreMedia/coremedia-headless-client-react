import React from "react";
import { HotZoneProps } from "./ImageMapHelpers";
import Link from "../Link/Link";

interface Props {
  hotZone?: HotZoneProps | null | undefined;
  cssClass?: string | undefined;
}

const HotzoneRect: React.FC<Props> = ({ hotZone, cssClass }) => {
  return (
    <>
      {hotZone && hotZone.self && hotZone.rect && hotZone.shape === "rect" && (
        <Link to={hotZone.self} className={cssClass}>
          <rect
            {...{
              x: hotZone.rect.x + "%",
              y: hotZone.rect.y + "%",
              width: hotZone.rect.width + "%",
              height: hotZone.rect.height + "%",
            }}
          />
        </Link>
      )}
    </>
  );
};

export default HotzoneRect;

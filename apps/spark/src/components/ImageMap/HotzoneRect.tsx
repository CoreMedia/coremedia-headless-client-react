import React from "react";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { HotZoneProps } from "../../models/Banner/ImagemapBanner";
import { getLink } from "../../utils/Link/LinkUtils";
import Link from "../Link/Link";

interface Props {
  hotZone?: HotZoneProps | null | undefined;
}

const HotzoneRect: React.FC<Props> = ({ hotZone }) => {
  const { rootSegment } = useSiteContextState();
  const link = hotZone && hotZone.self && getLink(hotZone.self, rootSegment);
  return (
    <>
      {hotZone && link && hotZone.rect && hotZone.shape === "rect" && (
        <Link to={link.linkTarget} externalLink={link.externalLink} openInNewTab={link.openInNewTab}>
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

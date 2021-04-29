import React from "react";
import CTA from "../CTA/CTA";
import Overlay from "./Overlay";
import { Target } from "../../models/Banner/Target";
import { OverlayConfiguration } from "../../models/Banner/Banner";

interface Props {
  text?: string;
  overlayConfiguration?: OverlayConfiguration;
  targets?: Array<Target>;
}

const OverlayWithCtas: React.FC<Props> = ({ text, overlayConfiguration, targets }) => {
  const enabled = Boolean(
    overlayConfiguration && overlayConfiguration.enabled !== undefined ? overlayConfiguration.enabled : false
  );
  const positionX = Number(
    overlayConfiguration && overlayConfiguration.positionX !== null ? overlayConfiguration.positionX + 50 : 50
  );
  const positionY = Number(
    overlayConfiguration && overlayConfiguration.positionY !== null ? overlayConfiguration.positionY + 50 : 50
  );
  const width = Number(
    overlayConfiguration && overlayConfiguration.width !== undefined ? overlayConfiguration.width : 50
  );

  const color = String(
    overlayConfiguration && overlayConfiguration.style && overlayConfiguration.style.color !== undefined
      ? overlayConfiguration.style.color
      : ""
  );
  const backgroundColor = String(
    overlayConfiguration && overlayConfiguration.style && overlayConfiguration.style.backgroundColor !== undefined
      ? overlayConfiguration.style.backgroundColor
      : ""
  );
  const additionalStyles = String(
    overlayConfiguration && overlayConfiguration.style && overlayConfiguration.style.additionalStyles !== undefined
      ? overlayConfiguration.style.additionalStyles
      : ""
  );

  if (enabled) {
    const overlayStyle: React.CSSProperties = {};
    overlayStyle["left"] = `${positionX}%`;
    overlayStyle["marginRight"] = `-${positionX}%`;
    overlayStyle["top"] = `${positionY}%`;
    overlayStyle["marginBottom"] = `-${positionY}%`;
    overlayStyle["transform"] = `translate(-${positionX}%, -${positionY}%)`;
    overlayStyle["width"] = `${width}%`;

    if (color) {
      overlayStyle["color"] = `${color}`;
    }
    if (color) {
      overlayStyle["backgroundColor"] = `${backgroundColor}`;
    }
    if (additionalStyles) {
      // overlayStyle.push(additionalStyles);
    }

    const ctaCls: string =
      overlayConfiguration && overlayConfiguration.style && overlayConfiguration.style.ctaCls !== undefined
        ? String(overlayConfiguration.style.ctaCls)
        : "";

    const ctaAlignment =
      overlayConfiguration && overlayConfiguration.style && overlayConfiguration.style.ctaAlignment !== undefined
        ? String(overlayConfiguration.style.ctaAlignment)
        : undefined;

    const additionalCtaClasses: string = ctaAlignment !== undefined ? ` cm-teaser-overlay__cta--${ctaAlignment}` : "";

    return (
      <Overlay text={text} overlayConfiguration={overlayConfiguration}>
        <CTA
          targets={targets}
          additionalClass={`cm-teaser-overlay__cta ${additionalCtaClasses}`}
          additionalButtonClass={String(`cm-teaser-overlay__cta-button ${ctaCls}`)}
        />
      </Overlay>
    );
  } else {
    return null;
  }
};

export default OverlayWithCtas;

import React from "react";
import CTA from "../CTA/CTA";
import { Target } from "../../models/Banner/Target";
import { OverlayConfiguration } from "../../models/Banner/Banner";
import Overlay from "./Overlay";

interface Props {
  text?: string;
  overlayConfiguration?: OverlayConfiguration;
  targets?: Array<Target>;
}

const OverlayWithCtas: React.FC<Props> = ({ text, overlayConfiguration, targets }) => {
  const enabled = Boolean(
    overlayConfiguration && overlayConfiguration.enabled !== undefined ? overlayConfiguration.enabled : false
  );

  if (enabled) {
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
        <CTA targets={targets} additionalClass={additionalCtaClasses} additionalButtonClass={ctaCls} />
      </Overlay>
    );
  } else {
    return null;
  }
};

export default OverlayWithCtas;

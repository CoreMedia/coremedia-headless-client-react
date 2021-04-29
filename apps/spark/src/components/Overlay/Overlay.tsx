import React from "react";
import "./Overlay.scss";
import { OverlayConfiguration } from "../../models/Banner/Banner";

interface Props {
  text?: string;
  overlayConfiguration?: OverlayConfiguration | null;
  additionalClass?: string | undefined;
  beforeText?: string | null;
}

const Overlay: React.FC<Props> = ({ text, overlayConfiguration, additionalClass, beforeText, children }) => {
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
  const cls = String(
    overlayConfiguration && overlayConfiguration.style && overlayConfiguration.style.cls !== undefined
      ? overlayConfiguration.style.cls
      : ""
  );
  const textCls = String(
    overlayConfiguration && overlayConfiguration.style && overlayConfiguration.style.textCls !== undefined
      ? overlayConfiguration.style.textCls
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
    return (
      <div
        className={`cm-teaser-overlay ${additionalClass !== undefined ? additionalClass : ""} ${cls}`}
        style={overlayStyle}
      >
        {beforeText}
        {text && (
          <div
            className={`cm-teaser-overlay__text cm-richtext ${textCls}`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        {children}
      </div>
    );
  } else {
    return null;
  }
};

export default Overlay;

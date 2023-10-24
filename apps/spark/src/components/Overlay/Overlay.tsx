import React from "react";
import styled, { css } from "styled-components";
import { OverlayConfiguration } from "../../models/Banner/Banner";
import { StyledCTA } from "../CTA/CTA";
import { StyledRichText } from "../RichText/RichText";

interface Props {
  text?: string;
  overlayConfiguration?: OverlayConfiguration | null;
  beforeText?: string | null;
}

const overlayStyleByName = (style: string) => {
  switch (style) {
    case "cm-richtext--dark-shadow": {
      return css`
        text-shadow:
          -1px 0 #fff,
          0 1px #fff,
          1px 0 #fff,
          0 -1px #fff;
      `;
    }
    case "cm-richtext--light-shadow": {
      return css`
        text-shadow: 0 0 var(--padding-small) var(--color-background-dark);
      `;
    }
  }
};

export const StyledOverlay = styled.div<{ overlayStyle?: string }>`
  position: absolute;
  padding: 5px;
  overflow: hidden;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  z-index: 1;

  ${StyledCTA} {
    margin: 5px 0 0;
    text-align: center;
    width: 100%;
  }
`;

export const StyledOverlayText = styled(StyledRichText)<{ overlayStyle?: string }>`
  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }

  h1 {
    font-family: var(--font-family-headline);
    font-size: var(--font-size-heading-2);
    margin-bottom: 0;
  }

  p {
    --line-height: 24px;
    --max-lines: 4;
    max-height: calc(var(--line-height) * var(--max-lines));
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: var(--line-height);
    padding-bottom: 24px;
  }

  ${(props) => props.overlayStyle && overlayStyleByName(props.overlayStyle)}
`;

const Overlay: React.FC<Props> = ({ text, overlayConfiguration, beforeText, children }) => {
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
      <StyledOverlay overlayStyle={cls} style={overlayStyle}>
        {beforeText}
        {text && <StyledOverlayText overlayStyle={textCls} dangerouslySetInnerHTML={{ __html: text }} />}
        {children}
      </StyledOverlay>
    );
  } else {
    return null;
  }
};

export default Overlay;

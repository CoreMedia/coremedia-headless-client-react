import React from "react";
import styled from "styled-components";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import Button from "../Button/Button";
import { Target } from "../../models/Banner/Target";

interface Props {
  targets?: Array<Target>;
  additionalClass?: string;
  additionalButtonClass?: string;
}

export const StyledCTA = styled.div`
  display: inline-flex;
  justify-content: center;
  margin: 10px;
  text-shadow: none;
`;

const CTA: React.FC<Props> = ({ targets, additionalClass, additionalButtonClass }) => {
  return (
    <StyledCTA className={additionalClass} {...metaDataProperty("properties.targets")}>
      {targets &&
        targets.map((target, index) => {
          return (
            target &&
            target.callToActionEnabled && (
              <Button
                key={index}
                linkTarget={target.linkTarget}
                text={target.callToActionText}
                additionalClass={additionalButtonClass}
                openInNewTab={target.openInNewTab}
                externalLink={target.externalLink}
              />
            )
          );
        })}
    </StyledCTA>
  );
};

export default CTA;

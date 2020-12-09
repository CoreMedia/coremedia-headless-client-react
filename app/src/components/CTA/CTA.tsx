import React from "react";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import Button from "../Button/Button";
import { Target } from "../../models/Banner/Target";

interface Props {
  targets?: Array<Target>;
  additionalClass?: string;
  additionalButtonClass?: string;
}

const CTA: React.FC<Props> = ({ targets, additionalClass, additionalButtonClass }) => {
  return (
    <div
      className={`cm-cta ${additionalClass !== undefined ? additionalClass : ""}`}
      {...metaDataProperty("properties.targets")}
    >
      {targets &&
        targets.map((target, index) => {
          return (
            target && (
              <Button
                key={index}
                linkTarget={target.target}
                text={target.callToActionText}
                openInNewTab={false}
                additionalClass={additionalButtonClass}
              />
            )
          );
        })}
    </div>
  );
};

export default CTA;

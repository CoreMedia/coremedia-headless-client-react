import React from "react";

interface Props {
  slotTitle?: string;
  slotText?: string;
}

const SlotHeader: React.FC<Props> = ({ slotTitle, slotText }) => {
  return (
    <>
      {slotTitle && <h2 className={`cm-slot__headline`}>{slotTitle}</h2>}
      {slotText && <div className={`cm-slot__text`} dangerouslySetInnerHTML={{ __html: slotText }} />}
    </>
  );
};

export default SlotHeader;

import React from "react";

interface Props {
  name: string | null;
  shortDescription: string | null;
  longDescription: string | null;
}

const ProductDetails: React.FC<Props> = ({ name, shortDescription, longDescription }) => {
  return (
    <div className={`cm-details__textual`}>
      <div className={`sticky`}>
        <h1 className={`cm-details__headline`}>{name}</h1>
        {shortDescription && (
          <div className={`cm-details__text cm-richtext`} dangerouslySetInnerHTML={{ __html: shortDescription }} />
        )}
        {longDescription && (
          <div className={`cm-details__text cm-richtext`} dangerouslySetInnerHTML={{ __html: longDescription }} />
        )}
      </div>
    </div>
  );
};
export default ProductDetails;

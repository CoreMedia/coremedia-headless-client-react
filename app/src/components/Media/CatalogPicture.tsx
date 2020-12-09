import React, { FC } from "react";
import { CatalogPicture as Picture } from "../../models/Banner/CatalogPicture";

interface Props {
  picture: Picture;
  layoutClassName?: string;
}

const CatalogPicture: FC<Props> = ({ picture }) => {
  return (
    <>{picture && picture.url && <img className="cm-image" src={picture.url} alt={""} title={""} loading="lazy" />}</>
  );
};

export default CatalogPicture;

import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import React from "react";
import DetailedMedia from "./DetailedMedia";
import Related from "./DetailedRelated";
import RichText from "../RichText/RichText";
import { DetailCMProduct } from "../../models/Detail/DetailCMProduct";

const DetailedCMProduct: React.FC<DetailCMProduct> = ({
  title,
  media,
  productCode,
  structuredText,
  downloads,
  related,
  metadata = {},
}) => {
  return (
    <div className={`cm-details cm-details--product`} {...metaDataElement(metadata.root)}>
      <article className={`cm-details__content`}>
        <h1 className={`cm-details__headline`} {...metaDataElement(metadata.title)}>
          {title}
        </h1>

        <DetailedMedia media={media} />
        {productCode && (
          <div className={`cm-details__code`} {...metaDataElement(metadata.productCode)}>
            <span>Product Code</span> {productCode}
          </div>
        )}
        {structuredText && (
          <div className={`cm-details__text`} {...metaDataProperty(metadata.structuredText)}>
            <RichText text={structuredText} />
          </div>
        )}
        {downloads && downloads.length > 0 && (
          <div className={`cm-details__downloads cm-downloads`} {...metaDataElement(metadata.downloads)}>
            <h3>Downloads</h3>
            <ul className={"cm-downloads__items"}>
              {downloads.map((item, index) => {
                return (
                  item && (
                    <li key={index} className={"cm-downloads__item"}>
                      <Link to={item}>{item.title}</Link>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        )}
      </article>
      {related && (
        <section className={`cm-details__related`} {...metaDataElement(metadata.related)}>
          <Related related={related} />
        </section>
      )}
    </div>
  );
};
export default DetailedCMProduct;

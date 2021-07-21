import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { LinkableWithLocale } from "../../queries/fragments/__generated__/LinkableWithLocale";
import { getLink } from "../../utils/Link/LinkUtils";

interface Props {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  alternate?: Array<LinkableWithLocale>;
}

const SeoHeader: FC<Props> = ({ title, description, keywords, alternate }) => {
  return (
    <Helmet>
      {title && <title>{`${title} | CoreMedia Spark`}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="generator" content="CoreMedia Content Cloud" />
      {alternate?.map((item, index) => {
        return (
          item.locale && (
            <link key={index} rel="alternate" hrefLang={item.locale} href={getLink(item)} title={item.locale} />
          )
        );
      })}
    </Helmet>
  );
};

export default SeoHeader;

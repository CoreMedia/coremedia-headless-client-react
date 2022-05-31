import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { LinkableWithLocale } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";
import { useSiteContextState } from "../../context/SiteContextProvider";

interface Props {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  alternate?: Array<LinkableWithLocale>;
}

const SeoHeader: FC<Props> = ({ title, description, keywords, alternate }) => {
  const { rootSegment } = useSiteContextState();
  return (
    <Helmet>
      {title && <title>{`${title} | CoreMedia Spark`}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="generator" content="CoreMedia Content Cloud" />
      {alternate?.map((item, index) => {
        const linkTarget = getLink(item, rootSegment).linkTarget;
        return (
          item.locale &&
          linkTarget && (
            <link key={index} rel="alternate" hrefLang={item.locale} href={linkTarget} title={item.locale} />
          )
        );
      })}
    </Helmet>
  );
};

export default SeoHeader;

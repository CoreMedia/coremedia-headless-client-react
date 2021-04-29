import React, { ReactElement } from "react";
import RichTextElement, { RichTextElementProps } from "./RichTextElement";
import Link from "../Link/Link";
import Include from "../../utils/ViewDispatcher/Include";
import TeasableQuery from "../../queries/TeasableQuery";
import Loading from "../Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../Error/Alert";

export interface Attribute {
  _type: string;
  name: string;
  value: string;
}

export const getAttributeValueFor = (attributes: Array<Attribute>, name: string): string | undefined => {
  let result: string | undefined = undefined;
  const hrefAttributes: Array<Attribute> = attributes.filter((attibute) => {
    return attibute.name === name;
  });
  if (hrefAttributes && hrefAttributes.length > 0) {
    hrefAttributes.forEach((item) => {
      result = item.value;
    });
  }
  return result;
};

const getContentId = (attributes: Array<Attribute>, fullString: string): string | undefined => {
  const dataHref = getAttributeValueFor(attributes, fullString);
  if (dataHref && dataHref.startsWith("coremedia:")) {
    const splitted: string[] = dataHref.split("/");
    return splitted[splitted.length - 1];
  }
  return undefined;
};

export const handleEmbeddedLinks = (
  attributes: Array<Attribute>,
  children?: Array<RichTextElementProps>
): ReactElement | null | undefined => {
  const childrenToRender = (
    <>
      {children &&
        children.map((item, index) => {
          return <RichTextElement {...item} key={index} />;
        })}
    </>
  );

  const href = getAttributeValueFor(attributes, "href");
  //external link
  if (href) {
    return <Link to={href}>{childrenToRender}</Link>;
  } else {
    //embedded image
    const dataSrc = getContentId(attributes, "data-src");
    if (dataSrc) {
      const { data, loading, error } = TeasableQuery(dataSrc);

      if (loading) return <Loading />;
      if (error) return <ApolloClientAlert error={error} />;
      if (!data || !data.content || !data.content) return <PageNotFoundAlert />;

      return data.content.content && <Include self={data.content.content} view={"asRichtextEmbed"} />;
    } else {
      //embedded content into richtext
      const contentId = getContentId(attributes, "data-href");
      if (contentId) {
        const { data, loading, error } = TeasableQuery(contentId);

        if (loading) return <Loading />;
        if (error) return <ApolloClientAlert error={error} />;
        if (!data || !data.content || !data.content) return <PageNotFoundAlert />;

        const embeddingType = getAttributeValueFor(attributes, "data-show");
        if (embeddingType === "embed") {
          return data.content.content && <Include self={data.content.content} view={"asRichtextEmbed"} />;
        } else {
          return data.content.content && <Link to={data.content.content}>{childrenToRender}</Link>;
        }
      }
    }
  }
};

export const transformAttributes = (attributes?: Array<Attribute>): { class: string } | null => {
  const className: string | undefined = attributes && getAttributeValueFor(attributes, "class");
  if (className) {
    return { class: className };
  } else {
    return null;
  }
};

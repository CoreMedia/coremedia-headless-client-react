import React from "react";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { slugify, TOC_ELEMENTS } from "../RichText/RichTextHelper";
import { RichTextElementProps } from "../RichText/RichTextElement";

interface Props {
  title?: string;
  structuredText: RichTextElementProps;
}

interface TOCElement {
  level: string;
  text: string;
  link: string;
}

const StyledTOC = styled.div`
  background-color: var(--color-background-light-grey);
  margin-top: var(--padding-medium);
  padding: var(--padding-medium);
  border-radius: var(--border-radius-medium);

  h2 {
    font-size: var(--font-size-text-medium);
    margin: 0;
  }

  ul {
    font-size: var(--font-size-text-small);
    margin: 0;
    padding: 0 var(--padding-medium);
  }
`;

const DetailTOC: React.FC<Props> = ({ title, structuredText }) => {
  const { t } = useTranslation();

  if (!structuredText || !structuredText.children) {
    return null;
  }

  const headlines = structuredText.children
    .filter((element: { name: string }) => {
      return TOC_ELEMENTS.indexOf(element.name) >= 0;
    })
    .map((headline: any): TOCElement => {
      const text = headline.children[0]?.data || "";
      return { level: headline.name, text: text, link: `#${slugify(text)}` };
    });

  if (!headlines || headlines.length < 1) {
    return null;
  }

  return (
    <StyledTOC>
      <h2>{title || t("DetailTOC.title")}</h2>
      <ul>
        {headlines.map((entry, index) => {
          return (
            <li key={index}>
              <HashLink to={entry.link} smooth={true}>
                {entry.text}
              </HashLink>
            </li>
          );
        })}
      </ul>
    </StyledTOC>
  );
};

export default DetailTOC;

import React from "react";
import styled from "styled-components";
import { Banner } from "../../models/Banner/Banner";
import RichTextElement, { RichTextElementProps } from "./RichTextElement";
import { RichtextContextProvider } from "./context/RichtextContextProvider";

interface Props {
  text: RichTextElementProps;
  embeddedItems?: Array<Banner>;
}

export const StyledRichText = styled.div`
  font-size: var(--font-size-text);
  hyphens: auto;

  > h1,
  > h2,
  > h3 {
    margin-top: var(--padding-medium);
    margin-bottom: var(--padding-small);
  }

  > h4,
  > h5,
  > h6 {
    margin-top: var(--padding-small);
    margin-bottom: var(--padding-small);
    font-size: var(--font-size-text-small);
  }

  > h1 {
    font-size: 24px;
  }

  > h2 {
    font-size: 20px;
  }

  > h3 {
    font-size: 16px;
  }

  > p {
    margin: 0 0 var(--padding-small);
    line-height: 1.5;
  }

  .underline {
    text-decoration: underline;
  }

  .strike {
    text-decoration: line-through;
  }

  sub {
    vertical-align: sub;
  }

  sup {
    vertical-align: super;
  }

  .rte--list {
    margin-bottom: 1em;
    margin-left: 20px;
  }

  blockquote {
    margin: 0 0 1rem;
    padding: 1em;
    background: #f0f0f0;
    quotes: inherit;

    p {
      display: inline-block;
    }

    p:last-child {
      margin-bottom: 0;
    }
  }

  .align--left {
    text-align: left;
  }

  .align--center {
    text-align: center;
  }

  .align--right {
    text-align: right;
  }

  .align--justify {
    text-align: justify;
  }

  .float--left {
    float: left;
  }

  .float--right {
    float: right;
  }

  .float--none {
    float: none;
  }

  table {
    width: 100%;
    border: 1px solid #000;
    margin: 10px 0;

    th {
      font-weight: 700;
      text-align: left;
      padding: 10px;
      border-bottom: 1px dashed #000;
    }

    td {
      padding: 5px 10px;
      border-bottom: 1px dashed #ccc;
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
`;

const RichText: React.FC<Props> = ({ text, embeddedItems }) => {
  return (
    <RichtextContextProvider items={embeddedItems}>
      <StyledRichText>
        {text.children &&
          text.children.map((item, index) => {
            return <RichTextElement {...item} key={index} />;
          })}
      </StyledRichText>
    </RichtextContextProvider>
  );
};

export default RichText;

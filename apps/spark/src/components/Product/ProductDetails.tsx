import React from "react";
import styled from "styled-components";
import { Headline } from "../Details/Detail";
import { StyledRichText } from "../RichText/RichText";

interface Props {
  name: string | null;
  shortDescription: string | null;
  longDescription: string | null;
}

const Textuals = styled.div`
  flex: 1;
  padding-left: 6px;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
`;

const ProductHeadline = styled(Headline)`
  text-align: left;
`;

const Text = styled(StyledRichText)`
  padding: 0;

  & > * {
    width: 100%;
  }
`;

const ProductDetails: React.FC<Props> = ({ name, shortDescription, longDescription }) => {
  return (
    <Textuals>
      <Sticky>
        <ProductHeadline>{name}</ProductHeadline>
        {shortDescription && <Text dangerouslySetInnerHTML={{ __html: shortDescription }} />}
        {longDescription && <Text dangerouslySetInnerHTML={{ __html: longDescription }} />}
      </Sticky>
    </Textuals>
  );
};
export default ProductDetails;

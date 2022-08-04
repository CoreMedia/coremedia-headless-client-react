import React from "react";
import styled from "styled-components";
import Image from "../Media/Image";
import { StyledMedia } from "../Details/DetailedMedia";
import { useProductPageContextState } from "../../context/ProductPageContext";

const StyledProductAssets = styled(StyledMedia)`
  flex: 2;
  padding-right: 6px;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledProductAsset = styled.div`
  flex: 1 1 auto;
  width: 49%;
  padding: 2px;
`;

const ProductAssets: React.FC = () => {
  const { media } = useProductPageContextState();
  return (
    <StyledProductAssets>
      {media &&
        media.map((picture, index) => {
          return (
            picture && (
              <StyledProductAsset key={index}>
                <Image picture={picture} cropName={"portrait_ratio2x3"} width={768} />
              </StyledProductAsset>
            )
          );
        })}
    </StyledProductAssets>
  );
};
export default ProductAssets;

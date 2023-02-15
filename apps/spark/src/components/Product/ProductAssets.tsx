import React from "react";
import styled from "styled-components";
import Image from "../Media/Image";
import { StyledMedia } from "../Details/DetailedMedia";
import { useProductPageContextState } from "../../context/ProductPageContext";
import Link from "../Link/Link";

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

const StyledProductDownloads = styled.div`
  width: 100%;
`;

const ProductAssets: React.FC = () => {
  const { media, downloads } = useProductPageContextState();
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
      {downloads && downloads.length > 0 && (
        <StyledProductDownloads>
          <h3>Downloads</h3>
          <ul>
            {downloads.map((download, index) => {
              return (
                <li key={index}>
                  <Link to={download.data?.uri} openInNewTab={true} externalLink={true}>
                    {download.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </StyledProductDownloads>
      )}
    </StyledProductAssets>
  );
};
export default ProductAssets;

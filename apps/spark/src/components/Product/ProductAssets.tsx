import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Image from "../Media/Image";
import { StyledMedia } from "../Details/DetailedMedia";
import { useProductPageContextState } from "../../context/ProductPageContext";
import Link from "../Link/Link";
import { useBreakpoints } from "../../utils/TeaserVariants/variantsHelper";
import Slider from "../Slider/Slider";

const StyledProductAssets = styled(StyledMedia)`
  margin-right: var(--grid-gap);
  width: 50%;

  @media screen and (max-width: 736px) {
    margin-right: 0;
    width: 100%;
  }
`;

const StyledProductMedia = styled.div``;

const StyledProductDownloads = styled.div`
  width: 100%;
`;

const StyledMobileProductMedia = styled.div`
  width: 100%;
`;

const StyledDesktopProductMedia = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const sliderConfig = {
  arrows: false,
  dots: true,
  fade: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
};

const ProductAssets: React.FC = () => {
  const { media, downloads } = useProductPageContextState();
  const { isMobile, isTablet, isLandscape } = useBreakpoints();
  const { t } = useTranslation();

  // Get crop name for breakpoint and orientation
  let cropName = media.length > 1 ? "portrait_ratio2x3" : "portrait_ratio1x1";
  let imageWidth = 768;
  if (isMobile) {
    cropName = isLandscape ? "landscape_ratio8x3" : "portrait_ratio1x1";
    imageWidth = isLandscape ? 768 : 400;
  } else if (isTablet) {
    cropName = isLandscape ? "landscape_ratio4x3" : "portrait_ratio1x1";
    imageWidth = 768;
  }

  const aspectRatio = cropName.split("_")[1].replace("ratio", "").replace("x", "/");

  const productMedia = media.map((picture, index, all) => {
    const width = all.length === 1 ? "100%" : "50%"; // use 100% width, if only one asset is available.
    return (
      picture && (
        <StyledProductMedia key={index} style={{ width: width }}>
          <Image picture={picture} cropName={cropName} width={imageWidth} aspectRatio={aspectRatio} />
        </StyledProductMedia>
      )
    );
  });
  return (
    <StyledProductAssets>
      {/*render product media as slideshow on mobile*/}
      {isMobile && (
        <StyledMobileProductMedia>
          <Slider config={sliderConfig}>{productMedia}</Slider>
        </StyledMobileProductMedia>
      )}

      {!isMobile && <StyledDesktopProductMedia>{productMedia}</StyledDesktopProductMedia>}

      {downloads && downloads.length > 0 && (
        <StyledProductDownloads>
          <h3>{t("ProductAssets.downloads")}</h3>
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

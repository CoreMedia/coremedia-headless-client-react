import React from "react";
import styled from "styled-components";
import { Banner } from "../../models/Banner/Banner";
import { ImagemapOverlayConfiguration } from "../../models/Banner/ImagemapBanner";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import CTA from "../CTA/CTA";
import Link from "../Link/Link";
import Image from "../Media/Image";

import ProductPricing, { ListPrice, OfferPrice, Price } from "../Product/ProductPricing";

interface Props {
  banner: Banner;
  overlay?: ImagemapOverlayConfiguration;
}

const Popup = styled.div`
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  font-family: var(--font-family-text);
  font-size: var(--font-size-text-small);

  @media screen and (max-width: 767px) {
    height: auto;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    max-width: 700px;
    max-height: 525px;
    margin: auto;
  }
`;

const Container = styled.div`
  flex: 1 1 0;

  img {
    max-height: 100%;
    object-fit: contain;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 12px;
`;

const Title = styled(Link)`
  font-family: var(--font-family-headline);
  font-size: var(--font-size-heading-2);
  font-weight: 400;
  text-align: left;
  color: #373737;
  margin: 24px 0 0;
  text-transform: uppercase;
  line-height: 1.4;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.div`
  flex: 1 1 0;
  margin-top: 24px;
  line-height: 24px;
`;

const PopupPrice = styled.div`
  margin-top: 24px;

  ${Price} {
    font-size: 20px;
    line-height: 20px;
  }
  ${OfferPrice} + ${ListPrice} {
    float: left;
    font-size: 16px;
    margin-right: 12px;
  }
`;

const PopupBanner: React.FC<Props> = ({ banner, overlay }) => {
  return (
    <Popup {...metaDataElement(banner.metadata?.root)}>
      {(overlay?.displayPicture || true) && banner.picture && (
        <Container>
          <Link to={banner.linkTarget}>
            <Image picture={banner.picture} cropName={"portrait_ratio2x3"} width={400} />
          </Link>
        </Container>
      )}
      <Container>
        <Content>
          {banner?.title && (overlay?.displayTitle || true) && (
            <div>
              <Title to={banner.linkTarget} {...metaDataProperty(banner.metadata?.properties?.title)}>
                {banner?.title}
              </Title>
            </div>
          )}
          {(overlay?.displayDefaultPrice || true || overlay?.displayDiscountedPrice || true) && (
            <PopupPrice>
              <ProductPricing
                {...banner}
                showListPrice={overlay?.displayDefaultPrice || true}
                showOfferPrice={overlay?.displayDiscountedPrice || true}
              />
            </PopupPrice>
          )}
          {banner?.plaintext && (overlay?.displayShortText || true) && (
            <Text
              dangerouslySetInnerHTML={{ __html: banner?.plaintext }}
              {...metaDataProperty(banner.metadata?.properties?.plaintext)}
            />
          )}
          <CTA targets={banner.targets} />
        </Content>
      </Container>
    </Popup>
  );
};

export default PopupBanner;

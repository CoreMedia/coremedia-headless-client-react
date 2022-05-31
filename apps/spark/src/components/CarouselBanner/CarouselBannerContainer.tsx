import React from "react";
import styled from "styled-components";
import SlotHeader from "../Slot/SlotHeader";
import Slider, { Settings } from "../Slider/Slider";
import { Slot } from "../../models/Grid/Slot";
import { metaDataElement } from "../../utils/Preview/MetaData";
import { Item } from "../Slot/Slot";
import CarouselBanner from "./CarouselBanner";

const carouselConfig = (infinite = true): Settings => {
  return {
    slidesToScroll: 5,
    slidesToShow: 5,
    swipeToSlide: true,
    infinite: infinite,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 0,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
          slidesToScroll: 1,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 543,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
          slidesToScroll: 1,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToScroll: 3,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToScroll: 4,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToScroll: 5,
          slidesToShow: 5,
        },
      },
    ],
  };
};

interface Props extends Slot {
  infinite?: boolean;
}

const StyledBanner = styled.div`
  box-sizing: border-box;
  overflow: hidden;

  // reset slider buttons
  @media screen and (min-width: 768px) {
    margin: 0 25px;
    overflow: initial;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
  }

  .slick-slide {
    height: unset;

    > div {
      margin: 0 6px;
      height: 100%;

      @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
        margin: 0 12px;
      }
    }

    ${Item} {
      height: 100%;
    }
  }
`;

const CarouselBannerContainer: React.FC<Props> = ({ items, title, text, infinite = false, metadata }) => {
  return (
    <StyledBanner {...metaDataElement(metadata?.root)}>
      <SlotHeader title={title} text={text} metadata={metadata} />
      <StyledSlider config={carouselConfig(infinite)}>
        {items.map((content, index) => {
          return <CarouselBanner banner={content} key={index} />;
        })}
      </StyledSlider>
    </StyledBanner>
  );
};

export default CarouselBannerContainer;

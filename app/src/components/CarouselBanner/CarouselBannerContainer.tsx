import React from "react";
import Include from "../../utils/ViewDispatcher/Include";
import SlotHeader from "../Slot/SlotHeader";
import Slider, { Settings } from "../Slider/Slider";
import { Slot } from "../../models/Grid/Slot";

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

const CarouselBannerContainer: React.FC<Props> = ({ items, title, text, infinite = false }) => {
  return (
    <div className={"cm-carousel-banner-container"}>
      <SlotHeader slotTitle={title} slotText={text} />
      <Slider className={"cm-slick-carousel--multiple"} config={carouselConfig(infinite)}>
        {items &&
          items.map((content, index) => {
            return (
              content && (
                <Include
                  key={index}
                  self={content}
                  view={"_gridItem"}
                  params={{ includeView: "asCarouselBanner", className: "cm-carousel-banner" }}
                />
              )
            );
          })}
      </Slider>
    </div>
  );
};

export default CarouselBannerContainer;

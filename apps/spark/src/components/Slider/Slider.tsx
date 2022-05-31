import React from "react";
import ReactSlider, { Settings as ReactSliderSettings } from "react-slick";
import styled, { css } from "styled-components";
import Next from "./assets/arrow-next.svg";
import Prev from "./assets/arrow-prev.svg";

import NextInner from "./assets/arrow-next-inner.svg";
import NextInnerHover from "./assets/arrow-next-inner-hover.svg";
import PrevInner from "./assets/arrow-prev-inner.svg";
import PrevInnerHover from "./assets/arrow-prev-inner-hover.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  className?: string;
  innerArrows?: boolean;
  config: Settings;
}

export type Settings = ReactSliderSettings;

const StyledSlider = styled(ReactSlider)<{ innerArrows: boolean }>`
  z-index: 0;

  .slick-arrow:before {
    display: block;
    height: 24px;
    width: 24px;
    background-size: cover;
    content: "";
  }

  .slick-prev:before {
    background-image: url(${Prev});
  }

  .slick-next:before {
    background-image: url(${Next});
  }

  .slick-active {
    z-index: 99;
  }

  ${(props) =>
    props.innerArrows &&
    css`
      .slick-arrow {
        top: 0;
        bottom: 0;
        height: auto;
        transform: none;
        width: 5%;

        @media screen and (max-width: 767px) {
          width: 10%;
        }

        &:before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .slick-prev {
        z-index: 1;
        left: 0;

        &:before {
          background-image: url(${PrevInner});
        }

        &:hover:before {
          background-image: url(${PrevInnerHover});
        }
      }

      .slick-next {
        right: 0;

        &:before {
          background-image: url(${NextInner});
        }

        &:hover:before {
          background-image: url(${NextInnerHover});
        }
      }
    `};

  .slick-slide:not(.slick-current) video {
    visibility: hidden;
  }
`;

const Slider: React.FC<Props> = ({ className, config, innerArrows = false, children }) => {
  return (
    <StyledSlider innerArrows={innerArrows || false} {...config} className={className}>
      {children}
    </StyledSlider>
  );
};
export default Slider;

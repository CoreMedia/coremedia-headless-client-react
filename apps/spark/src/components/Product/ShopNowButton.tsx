import React from "react";
import styled from "styled-components";
import { Banner } from "../../models/Banner/Banner";
import Link from "../Link/Link";
import { CMButton } from "../Button/Button";

interface Props {
  banner: Banner;
}

export const ShowNow = styled.div`
  overflow: hidden;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  :before {
    display: block;
    padding-top: 150%;
    content: "";
  }
`;

const Button = styled(CMButton)`
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  pointer-events: auto;
  box-sizing: border-box;
  padding: 14px;
  text-transform: uppercase;
  white-space: nowrap;
  text-decoration: none;
  color: #000;
  background-color: hsla(0, 0%, 100%, 0.75);
  transition: all 0.1s ease;
  text-align: center;

  &:hover {
    background-color: #fff;
  }

  &:active,
  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 1px #fff, inset 0 0 0 2px #000;
  }
`;

const ShopNowButton: React.FC<Props> = ({ banner }) => {
  return (
    <>
      {banner.shopNowConfiguration && (
        <ShowNow>
          <Button as={Link} to={banner.linkTarget}>
            <span>Shop Now</span>
          </Button>
        </ShowNow>
      )}
    </>
  );
};

export default ShopNowButton;

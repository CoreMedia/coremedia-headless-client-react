import React, { FC } from "react";
import styled, { css } from "styled-components";

const StyledHamburger = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 2px;
  width: 44px;
  height: 44px;
  cursor: pointer;

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    display: none;
  }
`;

const HamburgerBar = styled.span<{ barIndex: number; toggled: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -11px;
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
  background-color: var(--color-background-light);
  ${(props) =>
    props.barIndex === 1 &&
    css`
      margin-top: ${props.toggled ? "0" : "-7px"};
      transition: ${props.toggled
        ? "margin .2s cubic-bezier(.455, .03, .515, .955), transform .2s cubic-bezier(.455, .03, .515, .955) .2s"
        : "margin 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.2s, transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955)"};
      transform: ${props.toggled ? css`rotate(45deg)` : "none"};
    `}
  ${(props) =>
    props.barIndex === 2 &&
    css`
      margin-top: -1px;
      background-color: ${props.toggled ? `transparent` : "none"};
    `}
  ${(props) =>
    props.barIndex === 3 &&
    css`
      margin-top: ${props.toggled ? "0" : "5px"};
      transition: ${props.toggled
        ? "margin .2s cubic-bezier(.455, .03, .515, .955), transform .2s cubic-bezier(.455, .03, .515, .955) .2s"
        : "margin 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.2s, transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955)"};
      transform: ${props.toggled ? css`rotate(-45deg)` : "none"};
    `}
`;

interface Props {
  toggled?: boolean;
  clickHandler: () => void;
}

const Hamburger: FC<Props> = ({ toggled = false, clickHandler }) => {
  return (
    <StyledHamburger type="button" onClick={clickHandler}>
      <HamburgerBar barIndex={1} toggled={toggled} />
      <HamburgerBar barIndex={2} toggled={toggled} />
      <HamburgerBar barIndex={3} toggled={toggled} />
    </StyledHamburger>
  );
};

export default Hamburger;

import React, { FC } from "react";
import styled, { css } from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import { NavigationProps } from "../../models/Navigation/Navigation";
import NavigationItem from "./NavigationItem";

export const NavigationMenuItem = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;
export const NavigationMenuItemLabel = styled.li``;
export const NavigationItemTitle = styled.span`
  display: block;
  padding: 5px 15px 5px 25px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  text-align: center;
  text-decoration: none;

  &:focus,
  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    padding: 3px 15px;
    line-height: 1.428571429;
    color: #000;
    text-align: left;
    cursor: auto;
    @at-root a#{&} {
      cursor: pointer;
    }
  }
`;
export const NavigationToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 0;
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  line-height: 20px;
  cursor: pointer;
  overflow: visible;

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    position: relative;
    display: inline-block;
    width: 8px;
    height: 8px;
    padding: 0;
    top: -7px;
    left: -13px;
    font-size: 0;
    line-height: 0;
  }

  &:before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin-left: 2px;
    vertical-align: middle;
    border-color: #fff;
    border-style: solid;
    border-width: 0 2px 2px 0;
    height: 8px;
    width: 8px;
    transform: rotate(45deg);

    @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
      border-color: #000;
      border-style: solid;
      border-width: 0 1px 1px 0;
    }
  }
`;
export const StyledNavigationItem = styled.li<{ active?: boolean; open?: boolean; depth?: number }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    display: inline-block;
  }

  ${(props) =>
    props.depth !== undefined &&
    props.depth === 1 &&
    css`
      border-bottom-width: 4px;

      > a,
      > ${NavigationItemTitle} {
        padding: 10px 15px;
        display: inline-block;
      }

      > ${NavigationItemTitle} {
        text-transform: uppercase;
        text-decoration: none;
      }

      > ${NavigationMenuItem} {
        margin-bottom: 10px;
        @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
          margin-bottom: 0;
        }
      }

      @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
        ${NavigationMenuItemLabel} {
          > ${NavigationItemTitle} {
            padding: 10px 15px;
            font-size: 20px;
            text-transform: uppercase;
          }
        }
      }
      // this menu and nested
      ${NavigationMenuItem} {
        opacity: 1;
        border: none;
        box-shadow: none;
        border-radius: 0;
        margin-top: 0;
        display: none;

        @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
          position: absolute;
          top: 100%;
          right: 0;
          z-index: 1000;
          min-width: 160px;
          list-style: none;
          font-size: 14px;
          text-align: left;
          background-color: #fff;

          border-bottom: 1px solid #000000;
          border-top: 1px solid #000000;
        }
      }

      @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
        display: inline-block;
        position: static;
        border-bottom: 4px solid ${props.active !== undefined && props.active ? "#000000" : "transparent"};

        > ${NavigationItemTitle} {
          font-size: 14px;
          padding: 20px 20px 16px 20px;
        }

        &:hover {
          border-color: #000000;

          ${NavigationMenuItem} {
            visibility: visible;
            z-index: 1001;
            background-clip: border-box;
          }
        }

        > ${NavigationMenuItem} {
          left: 0;
          display: flex;
          flex-wrap: wrap;
          visibility: hidden;
          background-clip: border-box;

          > ${NavigationMenuItemLabel} {
            flex: none;
            width: 100%; // force wrap

            > ${NavigationItemTitle} {
              // link should not take the whole space
              display: inline-block;
            }
          }

          > li {
            width: 20%;
            position: static;

            > a {
              display: block;
            }

            ${NavigationMenuItem} {
              position: static;
              border: none;
              box-shadow: none;
              border-radius: 0;
            }
          }
        }
      }
    `}

  ${(props) =>
    props.depth !== undefined &&
    props.depth === 2 &&
    css`
      > ${NavigationToggle} {
        display: none;
      }

      > ${NavigationItemTitle} {
        white-space: normal;
        font-size: 14px;
        text-transform: uppercase;
        text-decoration: none;
        padding-left: 15px;
      }

      @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
        padding-bottom: 30px;

        > ${NavigationMenuItem} {
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          text-align: left;
        }

        > ${NavigationItemTitle}, > a {
          font-size: 14px;
        }
      }
    `}
  ${(props) =>
    props.depth !== undefined &&
    props.depth === 3 &&
    css`
      > ${NavigationToggle} {
        display: none;
      }

      > ${NavigationItemTitle} {
        font-size: 14px;
        text-decoration: none;
        padding-left: 15px;
      }

      @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
        > ${NavigationMenuItem} {
          display: block;
          text-align: left;
        }

        > a {
          font-size: 12px;
          padding-top: 6px;
          padding-bottom: 6px;
        }
      }
    `}

  ${(props) =>
    props.active !== undefined &&
    props.active &&
    css`
      background-color: rgba(255, 255, 255, 0.2);

      a {
        background-color: transparent;
      }

      @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
        background-color: transparent;
      }
    `}

  ${(props) =>
    props.open !== undefined &&
    props.open &&
    css`
      @media screen and (max-width: 767px),
        screen and (min-width: 768px) and (max-width: 1199px) and (orientation: portrait) {
        ${NavigationToggle} {
          &::before {
            transform: rotate(225deg);
          }
        }

        ${NavigationMenuItem} {
          display: block;
        }
      }
    `}

  ${NavigationMenuItem} {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;

    @media screen and (max-width: 767px),
      screen and (min-width: 768px) and (max-width: 1199px) and (orientation: portrait) {
      opacity: 1 !important;
    }

    ${NavigationMenuItemLabel} {
      display: none;

      @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
        display: block;
      }
    }
  }
`;

const NavigationMenu: FC<NavigationProps> = ({
  linkTarget,
  items,
  title,
  depth = 0,
  isTopLevel = true,
  maxDepth = 0,
  metadata = {},
}) => {
  if (maxDepth < 0) {
    return null;
  }
  return (
    <>
      {items && (
        <NavigationMenuItem {...metaDataProperty("children")}>
          {depth <= 1 && (
            <NavigationMenuItemLabel {...metaDataElement(metadata?.root)}>
              {linkTarget && (
                <NavigationItemTitle as={Link} to={linkTarget}>
                  {title}
                </NavigationItemTitle>
              )}
              {!linkTarget && <NavigationItemTitle>{title}</NavigationItemTitle>}
            </NavigationMenuItemLabel>
          )}
          {items &&
            items.map((child, index) => {
              return (
                child && (
                  <NavigationItem
                    key={index}
                    depth={depth + 1}
                    isTopLevel={isTopLevel}
                    maxDepth={maxDepth - 1}
                    {...child}
                  />
                )
              );
            })}
        </NavigationMenuItem>
      )}
    </>
  );
};
export default NavigationMenu;

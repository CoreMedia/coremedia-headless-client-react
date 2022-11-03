import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { getLink } from "../../utils/Link/LinkUtils";
import Link from "../Link/Link";
import SeoHeader from "./SeoHeader";

export const LanguageToggle = styled.button`
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
      border-width: 0 1px 1px 0;
    }
  }
`;

export const LanguageChooserMenu = styled.ul<{ open: boolean }>`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  opacity: 1;
  border: none;
  box-shadow: none;
  display: none;

  min-width: 200px;
  border-radius: 0 2px 2px 2px;
  border-top: 1px solid var(--color-background-light-grey);
  border-color: var(--color-background-light-grey);
  background-color: rgba(255, 255, 255, 0.8);
  left: -1px;

  ${(props) =>
    props.open &&
    css`
      display: block;
    `}

  li {
    position: relative;
    display: block;
    &:hover {
      background-color: var(--color-background-light-grey);
    }

    a {
      line-height: 32px;
      padding: 2px 0 2px 18px;
      margin: 0;
      text-decoration: none;
    }
  }

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    position: absolute;
    top: calc(100% + 4px);
    z-index: 1000;
    list-style: none;
    font-size: 14px;
    text-align: left;
    backdrop-filter: blur(10px);
    min-width: 250px;
    border-radius: 0 2px 2px 2px;

    padding: 0;
    box-shadow: none;
    border-top: none;
  }

  @media screen and (max-width: 767px),
    screen and (min-width: 768px) and (max-width: 1199px) and (orientation: portrait) {
    opacity: 1 !important;
  }
`;
export const StyledLanguageChooser = styled.li<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  border-radius: 2px;
  border: 1px solid transparent;
  border-bottom: 4px none;

  ${(props) =>
    props.open &&
    css`
      border-color: var(--color-background-light-grey);
      background-color: var(--color-background-light-grey);
      border-radius: 2px 2px 0 0;
    `};

  > span {
    display: inline-block;
    font-size: var(--font-size-text-small);
    line-height: 1.428571429;
    padding: 6px 18px;
    cursor: pointer; // always show pointer as it is either a dropdown or a link
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;

    ${(props) =>
      props.open &&
      css`
        color: var(--color-background-dark);
      `};
  }

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    display: inline-block;
    border-bottom: 4px solid transparent;
  }
`;

const LanguageChooser: React.FC = () => {
  const { localizedVariants, siteLocale, rootSegment } = useSiteContextState();
  const [clicked, setClicked] = useState(false);
  const regionDisplayNames = new Intl.DisplayNames([siteLocale], { type: "region" });

  if (!localizedVariants || localizedVariants.length < 2) {
    return null;
  }
  const me = localizedVariants.filter((item) => {
    return item.segment === rootSegment;
  })[0];

  const localeDisplayName = (localeString: string): string => {
    let localizedLabel = localeString;
    try {
      const locale = new Intl.Locale(localeString);
      const region: string = locale.region || "";

      if (localizedLabel === localeString && region) {
        const regionLabel: any = `${regionDisplayNames.of(region)}`;
        if (region !== regionLabel) {
          localizedLabel = `${regionLabel} (${locale?.language?.toLocaleUpperCase()})`;
        }
      }
    } catch (e) {}
    return localizedLabel;
  };

  return (
    <>
      <SeoHeader
        alternate={localizedVariants.filter((item) => {
          return item.locale !== me.locale;
        })}
      />
      {localizedVariants && localizedVariants.length > 1 && me.locale && (
        <StyledLanguageChooser
          open={clicked}
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          <span>{localeDisplayName(me.locale)}</span>
          <LanguageToggle type="button" aria-haspopup="true" />
          <LanguageChooserMenu open={clicked}>
            {localizedVariants.map((item, index) => {
              return (
                item !== me &&
                me.locale &&
                item.locale && (
                  <li key={index}>
                    <Link to={getLink(item, rootSegment).linkTarget}>{localeDisplayName(item.locale)}</Link>
                  </li>
                )
              );
            })}
          </LanguageChooserMenu>
        </StyledLanguageChooser>
      )}
    </>
  );
};

export default LanguageChooser;

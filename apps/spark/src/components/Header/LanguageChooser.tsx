import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { getLink } from "../../utils/Link/LinkUtils";
import Link from "../Link/Link";
import SeoHeader from "./SeoHeader";
import CountryFlagIcon, { StyledCountryFlagIcon } from "./CountryFlagIcon";

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
    display: inline-block;
    width: 8px;
    height: 8px;
    padding: 0;
    top: 50%;
    transform: translateY(-6px) translateX(6px);
    font-size: 0;
    line-height: 0;
  }

  &:before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin-left: 2px;
    vertical-align: middle;
    border-color: var(--color-background-light-grey);
    border-style: solid;
    border-width: 0 2px 2px 0;
    height: 8px;
    width: 8px;
    transform: rotate(45deg);

    @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
      border-width: 0 1px 1px 0;
      border-color: var(--color-background-dark);
    }
  }
`;

export const LanguageChooserMenu = styled.ul<{ open: boolean }>`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  border: none;
  box-shadow: none;
  display: none;

  min-width: 200px;

  ${(props) =>
    props.open &&
    css`
      display: block;
    `}

  li {
    position: relative;
    display: block;

    a {
      margin: 0;
      text-decoration: none;
      color: var(--color-white);
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
    background-color: rgba(244, 244, 244, 0.5);
    box-shadow: var(--drop-shadow);
    min-width: 250px;
    border-radius: 0 2px 2px 2px;
    padding: 0;
    border-top: none;

    li {
      a {
        color: var(--color-background-dark);
      }
    }
  }
`;

export const StyledLanguageChooser = styled.li<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  border-radius: 2px;
  border: none;
  border-bottom: 4px none;

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    display: inline-block;
    border-bottom: 4px solid transparent;

    ${(props) =>
      props.open &&
      css`
        border-color: var(--color-background-light-grey);
        background-color: var(--color-background-light-grey);
        border-radius: 2px 2px 0 0;
      `};
  }

  ${StyledCountryFlagIcon} {
    margin-right: 6px;
  }
`;

const CurrentLocale = styled.span`
  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    display: none;
  }
`;

const StyledLanguageItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 6px 18px 6px 6px;
  cursor: pointer; // always show pointer as it is either a dropdown or a link
  text-transform: uppercase;
  text-decoration: none;
  position: relative;

  &:hover {
    background-color: var(--color-background-light-grey);
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

  const countryFromLocale = (locale?: string | null): string | undefined => {
    let countryCode;
    if (locale) {
      const tmp = locale.split("-");
      if (tmp && tmp.length === 2 && isNaN(parseInt(tmp[1]))) {
        countryCode = tmp[1];
      }
    }
    return countryCode;
  };

  const currentCountry = countryFromLocale(me.locale);

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
          <StyledLanguageItem>
            <CountryFlagIcon countryCode={currentCountry} />
            <CurrentLocale>{localeDisplayName(me.locale)}</CurrentLocale>
            <LanguageToggle type="button" aria-haspopup="true" />
          </StyledLanguageItem>

          <LanguageChooserMenu open={clicked}>
            {localizedVariants.map((item, index) => {
              const countryCode = countryFromLocale(item.locale);
              return (
                item !== me &&
                me.locale &&
                item.locale && (
                  <li key={index}>
                    <Link to={getLink(item, rootSegment).linkTarget}>
                      <StyledLanguageItem>
                        <CountryFlagIcon countryCode={countryCode} />
                        {localeDisplayName(item.locale)}
                      </StyledLanguageItem>
                    </Link>
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

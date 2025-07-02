import React, { FC } from "react";
import styled from "styled-components";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { getWorkspaceVersion } from "../../utils/App/App";
import { StyledCol } from "../PageGrid/Col";
import { metaDataForPlacement } from "../../utils/Preview/MetaData";
import FooterItem from "./FooterItem";
import Facebook from "./assets/facebook.svg";
import LinkedIn from "./assets/linkedin.svg";
import Twitter from "./assets/twitter.svg";
import YouTube from "./assets/youtube.svg";

const StyledFooter = styled.footer`
  background-color: var(--color-background-dark);
  color: var(--color-background-light);
  padding: var(--padding-small) 0;
  text-align: center;
  font-size: var(--font-size-text-small);

  @media screen and (min-width: 768px) and (orientation: landscape), (min-width: 1200px) {
    text-align: left;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  max-width: var(--screen-size-max);
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
  padding: 0 var(--grid-gap);

  @media screen and (min-width: 768px) and (orientation: landscape), (min-width: 1200px) {
    flex-direction: row;
  }
`;

const Copyright = styled.div`
  margin-bottom: 12px;

  @media screen and (min-width: 768px) and (orientation: landscape), (min-width: 1200px) {
    display: inline-block;
    flex-grow: 0;
    white-space: nowrap;
    margin-right: 12px;
    margin-bottom: 0;
  }
`;

const Links = styled.ul`
  padding: 0;
  margin: 0 0 12px;
  list-style: none;

  @media screen and (min-width: 768px) and (orientation: landscape), (min-width: 1200px) {
    display: inline-block;
    flex-grow: 1;
    margin-bottom: 0;
  }

  > li {
    display: block;
    border-bottom: 1px solid var(--color-background-light);

    > a {
      display: block;
      color: var(--color-background-light);
      text-transform: uppercase;
      text-decoration: none;
      padding: 12px;

      @media screen and (min-width: 768px) {
        padding: 0;
        margin: 0 12px;
      }

      &:hover {
        text-decoration: underline;
      }
    }

    @media screen and (min-width: 768px) {
      display: inline-block;
      border-right: 1px solid var(--color-background-light);
      border-bottom: 0;

      &:last-child {
        border-right: none;
      }
    }
  }
`;

const SocialIcons = styled.div`
  line-height: 1;

  @media screen and (min-width: 768px) and (orientation: landscape), (min-width: 1200px) {
    flex-grow: 0;
    text-align: right;
    white-space: nowrap;
  }

  > a > i {
    height: 24px;
    width: 32px;
    display: inline-block;
    background: no-repeat 50%;
  }
`;

const Version = styled.div`
  @media screen and (min-width: 768px) and (orientation: landscape), (min-width: 1200px) {
    margin-left: 12px;
  }
`;

const Footer: FC = () => {
  const { footer, cmecConfig } = useSiteContextState();
  const name = footer?.metadata?.root.id || "footer";

  return (
    <StyledCol zone={name} {...(footer && metaDataForPlacement(name, !!footer?.items?.length))}>
      <StyledFooter>
        <FooterWrapper>
          <Copyright>© CoreMedia GmbH</Copyright>

          {footer && footer.items && (
            <Links>
              {footer.items.map((link, index) => {
                return <FooterItem key={index} {...link} />;
              })}
            </Links>
          )}

          <SocialIcons>
            <a href="https://www.facebook.com/coremedia" target="_blank" rel="noopener noreferrer">
              <i style={{ backgroundImage: `url("${Facebook}")` }} />
            </a>
            <a href="https://de.linkedin.com/company/coremedia-ag" target="_blank" rel="noopener noreferrer">
              <i style={{ backgroundImage: `url("${LinkedIn}")` }} />
            </a>
            <a href="https://twitter.com/CoreMedia" target="_blank" rel="noopener noreferrer">
              <i style={{ backgroundImage: `url("${Twitter}")` }} />
            </a>
            <a href="https://www.youtube.com/user/coremediachannel" target="_blank" rel="noopener noreferrer">
              <i style={{ backgroundImage: `url("${YouTube}")` }} />
            </a>
          </SocialIcons>
          <Version>
            Version: <b>{getWorkspaceVersion()}</b> {cmecConfig ? "with CMEC" : ""}
          </Version>
        </FooterWrapper>
      </StyledFooter>
    </StyledCol>
  );
};

export default Footer;

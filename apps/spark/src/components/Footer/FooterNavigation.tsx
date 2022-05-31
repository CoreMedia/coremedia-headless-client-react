import React, { FC } from "react";
import styled from "styled-components";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { StyledCol } from "../PageGrid/Col";
import { metaDataForPlacement } from "../../utils/Preview/MetaData";
import FooterNavigationColumn from "./FooterNavigationColumn";

const StyledFooterNavigation = styled.div`
  background-color: var(--color-background-light-grey);
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--screen-size-max);
  margin-left: auto;
  margin-right: auto;
  padding: var(--grid-gap);

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  > div {
    flex: 1; // same width for all columns
    h2 {
      margin-top: 25px;
      margin-bottom: 0;
      padding-left: 12px;
      border-left: 4px solid var(--color-background-dark);
      font-size: var(--font-size-heading-2);
      color: var(--color-background-dark);
    }
  }
`;

const FooterNavigation: FC = () => {
  const { footerNavigation } = useSiteContextState();
  const name = footerNavigation?.metadata?.root.id || "footer-navigation";

  return (
    <StyledCol zone={name} {...(footerNavigation && metaDataForPlacement(name, !!footerNavigation?.items?.length))}>
      {footerNavigation?.items && (
        <StyledFooterNavigation>
          <Columns>
            {footerNavigation.items.map((column, index) => {
              return <FooterNavigationColumn key={index} {...column} />;
            })}
          </Columns>
        </StyledFooterNavigation>
      )}
    </StyledCol>
  );
};

export default FooterNavigation;

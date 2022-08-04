import React, { FC } from "react";
import Header from "../Header/Header";
import FooterNavigation from "../Footer/FooterNavigation";
import Footer from "../Footer/Footer";
import { metaDataForResponsiveDevices } from "../../utils/Preview/MetaData";
import { StyledGrid } from "../PageGrid/PageGrid";

const PageContext: FC = ({ children }) => {
  return (
    <StyledGrid className={"cm-grid "} {...metaDataForResponsiveDevices()}>
      <Header />
      {children}
      <FooterNavigation />
      <Footer />
    </StyledGrid>
  );
};
export default PageContext;

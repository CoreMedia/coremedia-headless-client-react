import React, { FC } from "react";
import Header from "../Header/Header";
import FooterNavigation from "../Footer/FooterNavigation";
import Footer from "../Footer/Footer";
import { metaDataForResponsiveDevices } from "../../utils/Preview/MetaData";
import { StyledGrid } from "../PageGrid/PageGrid";
import { BreadcrumbContextProvider } from "../../context/BreadcrumbContext";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const PageContext: FC = ({ children }) => {
  return (
    <BreadcrumbContextProvider>
      <StyledGrid className={"cm-grid "} {...metaDataForResponsiveDevices()}>
        <Header />
        <Breadcrumb />
        {children}
        <FooterNavigation />
        <Footer />
      </StyledGrid>
    </BreadcrumbContextProvider>
  );
};
export default PageContext;

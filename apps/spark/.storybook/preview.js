import React from "react";
import { MemoryRouter } from "react-router-dom";
import { GlobalStyle } from "../src/components/App/App";
import { StyledGrid } from "../src/components/PageGrid/PageGrid";
import { StyledCol } from "../src/components/PageGrid/Col";
import styled from "styled-components";
import { StyledNavigation } from "../src/components/Navigation/Navigation";
import { ImageBox } from "../src/components/Media/ResponsiveImage";
import { StyledImage } from "../src/components/Media/Image";

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      mobile_portrait: {name: "Mobile", styles: {width: "414px", height: "736px"}},
      tablet_portrait: {name: "Tablet", styles: {width: "768px", height: "1024px"}},
    },
  },
}

const StyledStoryBook = styled.div`
  ${ImageBox} > ${StyledImage} {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center center;
  }
  ${StyledNavigation} {
    ${StyledImage} {
      max-width: 204px;
    }
  }
`;

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle/>
      <MemoryRouter>
        <StyledStoryBook>
          <StyledGrid>
            <StyledCol zone={"main"}>
              <Story/>
            </StyledCol>
          </StyledGrid>
        </StyledStoryBook>
      </MemoryRouter>
    </>
  ),
];

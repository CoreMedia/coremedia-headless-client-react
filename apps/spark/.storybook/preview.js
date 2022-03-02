import {MemoryRouter} from "react-router-dom";
import React from "react";
import "../src/components/App/App.scss"
import "../src/components/PageGrid/PageGrid.scss"

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

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <div className={"cm-grid cm-grid--multislot"}>
      <div
        className={`cm-placement cm-placement--main cm-placement__width-12`}
      >
        <Story/>
      </div>
      </div>
    </MemoryRouter>
  ),
];

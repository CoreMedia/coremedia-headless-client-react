import { createGlobalStyle } from "styled-components";
import { StyledLoading } from "../Loading/Loading";
import { StyledAlert } from "../Error/Alert";
import Woff from "./assets/BebasNeue-Regular.woff";
import Woff2 from "./assets/BebasNeue-Regular.woff2";

export const GlobalStyle = createGlobalStyle`
  :root {
    /* FONTS */
    --font-family-headline: BebasNeue, Times New Roman, Times, serif;
    --font-family-text: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --font-family-studio: 'Roboto', 'Segoe UI', 'Trebuchet MS', 'Lucida Grande', 'Helvetica', sans-serif;
    --font-size-heading-1: 60px;
    --font-size-heading-2: 30px;
    --font-size-heading-3: 20px;
    --font-size-text: 16px;
    --font-size-text-small: 14px;
    --line-height: 1.2rem;

    /* COLORS - primary */
    --color-red: #dd342b;
    --color-magenta: #d82eb4;
    --color-dark-grey: #363936;

    /* COLORS - secondary */
    --color-purple: #672779;
    --color-blue: #006cae;
    --color-turquoise: #6fc3b8;
    --color-green: #2fac66;
    --color-yellow: #efdf0f;
    --color-light-grey: #f4f4f4;
    --color-black: #000;
    --color-white: #fff;

    --color-background-light: var(--color-white);
    --color-background-dark: var(--color-dark-grey);
    --color-background-grey: #333;
    --color-background-light-grey: var(--color-light-grey);
    --color-background-image: var(--color-light-grey);

    --color-green-highlight: #bbff00;
    --color-green-highlight-hover: #ddff00;
    --color-green-highlight-active: var(--color-green-highlight-hover);

    /* GRADIENTS - primary */
    --gradient-red-to-magenta: linear-gradient(135deg, var(--color-red), var(--color-magenta));
    --gradient-purple-to-blue: linear-gradient(135deg, var(--color-purple), var(--color-blue));
    --gradient-magenta-to-purple: linear-gradient(135deg, var(--color-magenta), var(--color-purple));

    /* GRADIENTS - secondary */
    --gradient-turquoise-to-purple: linear-gradient(135deg, var(--color-turquoise), var(--color-purple));
    --gradient-blue-to-green: linear-gradient(135deg, var(--color-blue), var(--color-green));
    --gradient-yellow-to-red: linear-gradient(135deg, var(--color-yellow), var(--color-red));
    --gradient-blue-to-turquoise: linear-gradient(135deg, var(--color-blue), var(--color-turquoise));
    --gradient-dark-to-light-grey: linear-gradient(135deg, var(--color-dark-grey), var(--color-light-grey));
    --gradient-light-to-dark-grey: linear-gradient(135deg, var(--color-light-grey), var(--color-dark-grey));

    /* SIZES */
    --padding-small: 12px;
    --padding-medium: 24px;
    --padding-large: 48px;
    --screen-size-max: 1140px;

    /* BORDERS */
    --border-radius-small: 3px;
    --border-radius-medium: 6px;
    --border-radius-large: 9px;
    --border-width-small: 1px;
    --border-width-medium: 2px;
    --border-width-large: 5px;

    /* CTA buttons */
    --cta-background: var(--color-white);
    --cta-text-color: var(--color-black);
    --cta-border: var(--border-width-small) solid var(--cta-text-color);
    --cta-border-radius: var(--border-radius-small);
    --cta-background-hover: var(--color-light-grey);
    --cta-text-color-hover: var(--cta-text-color);
    --cta-border-hover: var(--border-width-small) solid var(--color-light-grey);
    --cta-background-active: var(--color-light-grey);
    --cta-text-color-active: var(--cta-text-color);
    --cta-border-active: var(--border-width-small) solid var(--color-light-grey);

    --cta-primary-background: var(--color-black);
    --cta-primary-text-color: var(--color-white);
    --cta-primary-border: var(--border-width-small) solid var(--color-black);
    --cta-primary-border-radius: var(--border-radius-small);
    --cta-primary-background-hover: var(--color-light-grey);
    --cta-primary-text-color-hover: var(--color-black);
    --cta-primary-border-hover: var(--border-width-small) solid var(--color-light-grey);
    --cta-primary-background-active: var(--color-light-grey);
    --cta-primary-text-color-active: var(--cta-primary-text-color);
    --cta-primary-border-active: var(--border-width-small) solid var(--color-light-grey);

    /* Shadows */
    --drop-shadow: 0px 0px 20px rgba(0,0,0,0.25);
  }

  @font-face {
    font-family: "BebasNeue";
    src: local("BebasNeue"),
    url(${Woff}) format("woff"),
    url(${Woff2}) format("woff2");
  }

  html,
  body,
  .cm-app {
    height: 100%;
  }

  .cm-app > ${StyledLoading} {
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
  }

  .cm-app > ${StyledAlert} {
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    box-sizing: border-box;
    padding: var(--padding-large);

    @media screen and (min-width: 768px) {
      background: var(--color-background-image);
      width: 700px;
      border-radius: 12px;
    }
  }


  body {
    font-family: var(--font-family-text);
    background-color: var(--color-background-light);
    margin: 0;

    &[data-is-preview] {
      background-color: transparent;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-headline);
    font-weight: normal;
  }

  a {
    color: var(--color-background-dark);
  }
`;

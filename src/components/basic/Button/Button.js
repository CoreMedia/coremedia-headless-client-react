// @flow
import styled, { css } from 'styled-components';
import theme from 'styled-theming';

const buttonStyles = theme('name', {
  default: css`
    font-weight: 400;
    border: 2px solid;
    padding: 0.5em 1em;
    background: inherit;
  `,
  hkm: css`
    font-weight: 300;
    font-size: 0.8em;
    border: 1px solid #ea989d;
    padding: 5px 10px;
    color: #272727;
    background: linear-gradient(180deg, #fbe3e4, #fabfc0);
    text-transform: uppercase;
  `,
});

const Button = styled.button`
  ${buttonStyles};
  text-align: center;
  cursor: pointer;
`;
Button.displayName = 'Button';

Button.defaultProps = {
  theme: {
    name: 'default',
    breakpoints: {
      small: 480,
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
  },
};

export default Button;

// @flow
import styled from 'styled-components';
import theme from 'styled-theming';

const color = theme('name', {
  default: 'rgba(0, 108, 174, 1)',
  hkm: '#fabfc0',
});

const Bar = styled.hr.attrs({
  'aria-hidden': true,
})`
  position: relative;
  left: ${props => `${props.posX}px`};
  width: ${props => `${props.width}px`};
  margin: 0;
  border-width: 0 0 3px;
  border-style: none none solid;
  border-color: ${props => (props.width ? color : 'transparent')};
  transition: ${props => (props.posX && props.width ? 'all' : 'border-color')} 0.6s ease-out 0s;
`;
Bar.displayName = 'Bar';

/*Bar.propTypes = {
  posX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  theme: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};*/

Bar.defaultProps = {
  theme: {
    name: 'default',
  },
};

export default Bar;

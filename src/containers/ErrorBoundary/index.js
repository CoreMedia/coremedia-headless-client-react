// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import ErrorBox from './ErrorBox';
import Details from './Details';
import { H3 } from '../../components/basic/Heading';

type Props = {
  children: React.Node,
};

type State = {
  error: ?Error,
  errorInfo: ?Object,
};

class ErrorBoundary extends React.Component<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: Object) {
    this.setState(prevState => ({
      error: error,
      errorInfo: errorInfo,
    }));
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <ErrorBox>
          <H3>Something went wrong...</H3>
          <Details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </Details>
        </ErrorBox>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

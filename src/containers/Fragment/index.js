// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import { getFragment } from '../../backend';
import { getComponent, getConfig, parseParams } from './utils';

type Props = {
  id: string,
  show: string,
  view: string,
  params?: string,
};

type State = {
  data: ?Object,
  error: ?Error,
};

class Fragment extends React.Component<Props, State> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    params: PropTypes.string,
  };

  state = {
    data: null,
    error: null,
  };

  config = getConfig(this.props.show);
  params = this.props.params ? parseParams(this.props.params) : undefined;

  _getComponent = () => {
    const { createProps, module } = this.config;
    const { data } = this.state;
    if (!data) {
      return null;
    }
    const Component = getComponent(module, this.props.view);
    const props = createProps({ data, params: this.params });
    return <Component {...props} />;
  };

  async componentDidMount() {
    try {
      const data = await getFragment(this.config.queryName, this.props.id, this.config.viewName);
      this.setState(prevState => ({ data }));
    } catch (error) {
      this.setState(prevState => ({ error }));
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }
    return this._getComponent();
  }
}

export default Fragment;

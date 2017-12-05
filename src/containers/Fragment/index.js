// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import { getFragment } from '../../backend';
import { getComponent, getConfig, parseParams } from './utils';

type Props = {
  id: string,
  show: string,
  view: string,
  params: string,
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
    params: PropTypes.string.isRequired,
  };

  state = {
    data: null,
    error: null,
  };

  config = getConfig(this.props.show);
  params = parseParams(this.props.params);

  async componentDidMount() {
    try {
      const data = await getFragment(this.config.queryName, this.props.id, this.config.viewName);
      this.setState({ data });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { createProps, module } = this.config;
    const { data, error } = this.state;
    if (error) {
      throw error;
    }
    if (!data) {
      return null;
    }
    const Component = getComponent(module, this.props.view);
    const props = createProps({ data, params: this.params });
    return <Component {...props} />;
  }
}

export default Fragment;

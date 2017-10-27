import React from "react";
import {withAxios} from "react-axios";

import {getFragment} from "../backend/api";
import {HeroTeaser, SquareTeaser, WideTeaser} from "./components/Teaser";

const components = {
  teaser: {
    hero: HeroTeaser,
    square: SquareTeaser,
    wide: WideTeaser
  }
};

const getComponent = (show: string, view: string) => {
  return (components[show] || {})[view];
};

const Fragment = withAxios(
  class FragmentImpl extends React.Component {
    componentWillMount() {
      const component = getComponent(this.props.show, this.props.view) || {};
      getFragment(this.props.id, component.type, component.view, result => {
        this.setState({data: result.data, component: component});
      });
    }

    render() {
      const data = (this.state || {}).data;
      const brick = ((this.state || {}).component || {}).brick;
      if (data && brick) {
        const params = this.props.params ? JSON.parse(this.props.params) : {};
        return brick(data, params);
      } else {
        return '';
      }
    }
  }
);

export default Fragment;

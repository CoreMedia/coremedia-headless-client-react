// @flow
import React from 'react';

import Overlay from '..';

describe('Overlay Component', () => {
  describe('not fixed', () => {
    it('should render Overlay with Title, Text and CTA', () => {
      const wrapper = shallow(
        <Overlay
          fixed={false}
          width={70}
          height="auto"
          bottom="5%"
          text="Discover the new CoreMedia Headless Services."
          title="Content Management at a new Scale with CoreMedia CaaS"
          color="blue"
          ctaShow={true}
          ctaText="Learn more"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Title and Text', () => {
      const wrapper = shallow(
        <Overlay
          fixed={false}
          width={70}
          height="auto"
          bottom="5%"
          text="Discover the new CoreMedia Headless Services."
          title="Content Management at a new Scale with CoreMedia CaaS"
          color="blue"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Title and CTA', () => {
      const wrapper = shallow(
        <Overlay
          fixed={false}
          width={70}
          height="auto"
          bottom="5%"
          title="Content Management at a new Scale with CoreMedia CaaS"
          color="blue"
          ctaShow={true}
          ctaText="Learn more"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Text and CTA', () => {
      const wrapper = shallow(
        <Overlay
          fixed={false}
          width={70}
          height="auto"
          bottom="5%"
          text="Discover the new CoreMedia Headless Services."
          color="blue"
          ctaShow={true}
          ctaText="Learn more"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Title', () => {
      const wrapper = shallow(
        <Overlay
          fixed={false}
          width={70}
          height="auto"
          bottom="5%"
          title="Content Management at a new Scale with CoreMedia CaaS"
          color="blue"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Text', () => {
      const wrapper = shallow(
        <Overlay
          fixed={false}
          width={70}
          height="auto"
          bottom="5%"
          text="Discover the new CoreMedia Headless Services."
          color="blue"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with CTA', () => {
      const wrapper = shallow(
        <Overlay
          fixed={false}
          width={70}
          height="auto"
          bottom="5%"
          color="blue"
          ctaShow={true}
          ctaText="Learn more"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('fixed', () => {
    it('should render Overlay with Title, Text and CTA', () => {
      const wrapper = shallow(
        <Overlay
          width={70}
          height="auto"
          bottom="5%"
          text="Discover the new CoreMedia Headless Services."
          title="Content Management at a new Scale with CoreMedia CaaS"
          color="blue"
          ctaShow={true}
          ctaText="Learn more"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Title and Text', () => {
      const wrapper = shallow(
        <Overlay
          width={70}
          height="auto"
          bottom="5%"
          text="Discover the new CoreMedia Headless Services."
          title="Content Management at a new Scale with CoreMedia CaaS"
          color="blue"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Title and CTA', () => {
      const wrapper = shallow(
        <Overlay
          width={70}
          height="auto"
          bottom="5%"
          title="Content Management at a new Scale with CoreMedia CaaS"
          color="blue"
          ctaShow={true}
          ctaText="Learn more"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Text and CTA', () => {
      const wrapper = shallow(
        <Overlay
          width={70}
          height="auto"
          bottom="5%"
          text="Discover the new CoreMedia Headless Services."
          color="blue"
          ctaShow={true}
          ctaText="Learn more"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Title', () => {
      const wrapper = shallow(
        <Overlay
          width={70}
          height="auto"
          bottom="5%"
          title="Content Management at a new Scale with CoreMedia CaaS"
          color="blue"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with Text', () => {
      const wrapper = shallow(
        <Overlay
          width={70}
          height="auto"
          bottom="5%"
          text="Discover the new CoreMedia Headless Services."
          color="blue"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('should render Overlay with CTA', () => {
      const wrapper = shallow(
        <Overlay
          width={70}
          height="auto"
          bottom="5%"
          color="blue"
          ctaShow={true}
          ctaText="Learn more"
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});

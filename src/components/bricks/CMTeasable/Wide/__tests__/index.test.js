// @flow
import React from 'react';

import Wide from '..';

describe('WideTeaser Component', () => {
  it('should render WideTeaser with Link, Picture and CTA', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        text="Discover the new CoreMedia Headless Services."
        title="Content Management at a new Scale with CoreMedia CaaS"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link, Picture and CTA', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        text="Discover the new CoreMedia Headless Services."
        title="Content Management at a new Scale with CoreMedia CaaS"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link, Picture and CTA', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        title="Content Management at a new Scale with CoreMedia CaaS"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link, Picture and CTA', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        text="Discover the new CoreMedia Headless Services."
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link, Picture and CTA', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        text="Discover the new CoreMedia Headless Services."
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link, Picture and CTA', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        title="Content Management at a new Scale with CoreMedia CaaS"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link, Picture and CTA', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link and Picture', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link and CTA', () => {
    const wrapper = shallow(
      <Wide params={{ color: 'blue', ctaShow: true, url: '/caas.html' }} url="/caas.html" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link and CTA (custom Label)', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', ctaShow: true, ctaText: 'Label', url: '/caas.html' }}
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Link', () => {
    const wrapper = shallow(
      <Wide params={{ color: 'blue', url: '/caas.html' }} url="/caas.html" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser without CTA', () => {
    const wrapper = shallow(<Wide params={{ color: 'blue', ctaShow: true, url: '/caas.html' }} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Picture', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Picture (without params)', () => {
    const wrapper = shallow(
      <Wide pictureAlt="Globe" pictureLink="coremedia:///image/2656/data" pictureTitle="Globe" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render WideTeaser with Picture and CTA', () => {
    const wrapper = shallow(
      <Wide
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

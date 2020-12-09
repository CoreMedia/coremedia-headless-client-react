// @flow
import React from 'react';

import Square from '..';

describe('SquareTeaser Component', () => {
  it('should render SquareTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Square
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
  it('should render SquareTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Square
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
  it('should render SquareTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Square
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
  it('should render SquareTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Square
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
  it('should render SquareTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Square
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
  it('should render SquareTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Square
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
  it('should render SquareTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Square
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render SquareTeaser with Link and Picture', () => {
    const wrapper = shallow(
      <Square
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render SquareTeaser with Link and Overlay', () => {
    const wrapper = shallow(
      <Square params={{ color: 'blue', ctaShow: true, url: '/caas.html' }} url="/caas.html" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render SquareTeaser with Link', () => {
    const wrapper = shallow(
      <Square params={{ color: 'blue', url: '/caas.html' }} url="/caas.html" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render SquareTeaser with Overlay', () => {
    const wrapper = shallow(
      <Square params={{ color: 'blue', ctaShow: true, url: '/caas.html' }} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render SquareTeaser with Picture', () => {
    const wrapper = shallow(
      <Square
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render SquareTeaser with Picture (without params)', () => {
    const wrapper = shallow(
      <Square pictureAlt="Globe" pictureLink="coremedia:///image/2656/data" pictureTitle="Globe" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render SquareTeaser with Picture and Overlay', () => {
    const wrapper = shallow(
      <Square
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

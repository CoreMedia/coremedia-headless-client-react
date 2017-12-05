// @flow
import React from 'react';

import Hero from '..';

describe('HeroTeaser Component', () => {
  it('should render HeroTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Hero
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
  it('should render HeroTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Hero
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
  it('should render HeroTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Hero
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
  it('should render HeroTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Hero
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
  it('should render HeroTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Hero
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
  it('should render HeroTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Hero
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
  it('should render HeroTeaser with Link, Picture and Overlay', () => {
    const wrapper = shallow(
      <Hero
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render HeroTeaser with Link and Picture', () => {
    const wrapper = shallow(
      <Hero
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
        url="/caas.html"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render HeroTeaser with Link and Overlay', () => {
    const wrapper = shallow(
      <Hero params={{ color: 'blue', ctaShow: true, url: '/caas.html' }} url="/caas.html" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render HeroTeaser with Link', () => {
    const wrapper = shallow(
      <Hero params={{ color: 'blue', url: '/caas.html' }} url="/caas.html" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render HeroTeaser with Overlay', () => {
    const wrapper = shallow(<Hero params={{ color: 'blue', ctaShow: true, url: '/caas.html' }} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render HeroTeaser with Picture', () => {
    const wrapper = shallow(
      <Hero
        params={{ color: 'blue', url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render HeroTeaser with Picture (without params)', () => {
    const wrapper = shallow(
      <Hero pictureAlt="Globe" pictureLink="coremedia:///image/2656/data" pictureTitle="Globe" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render HeroTeaser with Picture and Overlay', () => {
    const wrapper = shallow(
      <Hero
        params={{ color: 'blue', ctaShow: true, url: '/caas.html' }}
        pictureAlt="Globe"
        pictureLink="coremedia:///image/2656/data"
        pictureTitle="Globe"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

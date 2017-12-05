// @flow
import React from 'react';

import Richtext from '..';

describe('Richtext Component', () => {
  it('should render HTML parsed to React Components', () => {
    const text = `<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><p>Paragraph</p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/><a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a></li></ul>`;
    const wrapper = shallow(<Richtext text={text} color="blue" />);
    expect(wrapper).toMatchSnapshot();
  });
});

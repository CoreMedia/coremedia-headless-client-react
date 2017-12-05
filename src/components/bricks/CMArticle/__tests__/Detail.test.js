// @flow
import React from 'react';

import { Detail } from '..';

describe('Detail Component', () => {
  it('should render Detail with Title, Picture, Abstract and Richtext', () => {
    const wrapper = shallow(
      <Detail
        pictureLink="coremedia:///image/2658/data"
        pictureTitle="Lego"
        pictureAlt="Lego"
        title="CoreMedia Content as a Service (CaaS)"
        text={`<p>CoreMedia is a Content Management System (CMS) which can manage your content from creation straight through to rendering. Our Content Application Engine (CAE) provides tools and a framework with which you can easily design a beautiful, consistent and fully-functional user experience.</p><p>The components of the CoreMedia system works gracefully together as an isolated system, but it is also flexible enough to be a small but crucial component in a larger ecosystem. This larger system can include commerce systems, brick-and-mortar backend systems, marketing data, user management and many more kinds of sub-systems.</p><p>One way to achieve this flexibility is to make content from our CMS available for another system, leaving you full freedom to design and render your content using the framework of your choice. We affectionately call this service the "Headless API".</p><p>Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere.</p><p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/></p><h2>How does it work?</h2><p>The Headless API defines a simple REST API to access content from the CoreMedia repository. On the server side the content is transformed via GraphQL queries before being returned to the client as JSON response. On the client side, simply parse the JSON response and process it as you please.</p><p>You can customize the GraphQL queries to tailor the returned JSON to your application's needs.</p><p>The first step is to define a schema, which maps from the content properties in the repository scheme to the attributes that you would like to extract. This can be done manually or with the help of a schema generator.</p><p>Then you define a set of GraphQL queries which will be matched against the schema.</p><p>The schema and query set are either deployed alongside the headless server or installed in the CoreMedia repository. The headless server can be started either by Spring Boot or as a Tomcat webapp.</p><p>On the client side, simply request the service's URLs and process the JSON response with whatever technology you prefer.</p><h2>Resources</h2><p>Interested in a deeper understanding of CaaS in CoreMedia? See what we’ve cooked up for you in our <a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a>.</p><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a>: Headless Server as source code, plus a React client as an example</li><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a>: Documentation on installing and customizing the Headless Server, plus documentation on the example React client</li></ul>`}
        teaserText="Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere."
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Title', () => {
    const wrapper = shallow(<Detail title="CoreMedia Content as a Service (CaaS)" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Title and Picture', () => {
    const wrapper = shallow(
      <Detail
        pictureLink="coremedia:///image/2658/data"
        pictureTitle="Lego"
        pictureAlt="Lego"
        title="CoreMedia Content as a Service (CaaS)"
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Title, Picture and Abstract', () => {
    const wrapper = shallow(
      <Detail
        pictureLink="coremedia:///image/2658/data"
        pictureTitle="Lego"
        pictureAlt="Lego"
        title="CoreMedia Content as a Service (CaaS)"
        teaserText="Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere."
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Title, Picture and Richtext', () => {
    const wrapper = shallow(
      <Detail
        pictureLink="coremedia:///image/2658/data"
        pictureTitle="Lego"
        pictureAlt="Lego"
        title="CoreMedia Content as a Service (CaaS)"
        text={`<p>CoreMedia is a Content Management System (CMS) which can manage your content from creation straight through to rendering. Our Content Application Engine (CAE) provides tools and a framework with which you can easily design a beautiful, consistent and fully-functional user experience.</p><p>The components of the CoreMedia system works gracefully together as an isolated system, but it is also flexible enough to be a small but crucial component in a larger ecosystem. This larger system can include commerce systems, brick-and-mortar backend systems, marketing data, user management and many more kinds of sub-systems.</p><p>One way to achieve this flexibility is to make content from our CMS available for another system, leaving you full freedom to design and render your content using the framework of your choice. We affectionately call this service the "Headless API".</p><p>Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere.</p><p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/></p><h2>How does it work?</h2><p>The Headless API defines a simple REST API to access content from the CoreMedia repository. On the server side the content is transformed via GraphQL queries before being returned to the client as JSON response. On the client side, simply parse the JSON response and process it as you please.</p><p>You can customize the GraphQL queries to tailor the returned JSON to your application's needs.</p><p>The first step is to define a schema, which maps from the content properties in the repository scheme to the attributes that you would like to extract. This can be done manually or with the help of a schema generator.</p><p>Then you define a set of GraphQL queries which will be matched against the schema.</p><p>The schema and query set are either deployed alongside the headless server or installed in the CoreMedia repository. The headless server can be started either by Spring Boot or as a Tomcat webapp.</p><p>On the client side, simply request the service's URLs and process the JSON response with whatever technology you prefer.</p><h2>Resources</h2><p>Interested in a deeper understanding of CaaS in CoreMedia? See what we’ve cooked up for you in our <a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a>.</p><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a>: Headless Server as source code, plus a React client as an example</li><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a>: Documentation on installing and customizing the Headless Server, plus documentation on the example React client</li></ul>`}
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Title and Abstract', () => {
    const wrapper = shallow(
      <Detail
        title="CoreMedia Content as a Service (CaaS)"
        teaserText="Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere."
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Title, Abstract and Richtext', () => {
    const wrapper = shallow(
      <Detail
        title="CoreMedia Content as a Service (CaaS)"
        text={`<p>CoreMedia is a Content Management System (CMS) which can manage your content from creation straight through to rendering. Our Content Application Engine (CAE) provides tools and a framework with which you can easily design a beautiful, consistent and fully-functional user experience.</p><p>The components of the CoreMedia system works gracefully together as an isolated system, but it is also flexible enough to be a small but crucial component in a larger ecosystem. This larger system can include commerce systems, brick-and-mortar backend systems, marketing data, user management and many more kinds of sub-systems.</p><p>One way to achieve this flexibility is to make content from our CMS available for another system, leaving you full freedom to design and render your content using the framework of your choice. We affectionately call this service the "Headless API".</p><p>Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere.</p><p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/></p><h2>How does it work?</h2><p>The Headless API defines a simple REST API to access content from the CoreMedia repository. On the server side the content is transformed via GraphQL queries before being returned to the client as JSON response. On the client side, simply parse the JSON response and process it as you please.</p><p>You can customize the GraphQL queries to tailor the returned JSON to your application's needs.</p><p>The first step is to define a schema, which maps from the content properties in the repository scheme to the attributes that you would like to extract. This can be done manually or with the help of a schema generator.</p><p>Then you define a set of GraphQL queries which will be matched against the schema.</p><p>The schema and query set are either deployed alongside the headless server or installed in the CoreMedia repository. The headless server can be started either by Spring Boot or as a Tomcat webapp.</p><p>On the client side, simply request the service's URLs and process the JSON response with whatever technology you prefer.</p><h2>Resources</h2><p>Interested in a deeper understanding of CaaS in CoreMedia? See what we’ve cooked up for you in our <a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a>.</p><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a>: Headless Server as source code, plus a React client as an example</li><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a>: Documentation on installing and customizing the Headless Server, plus documentation on the example React client</li></ul>`}
        teaserText="Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere."
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Title and Richtext', () => {
    const wrapper = shallow(
      <Detail
        title="CoreMedia Content as a Service (CaaS)"
        text={`<p>CoreMedia is a Content Management System (CMS) which can manage your content from creation straight through to rendering. Our Content Application Engine (CAE) provides tools and a framework with which you can easily design a beautiful, consistent and fully-functional user experience.</p><p>The components of the CoreMedia system works gracefully together as an isolated system, but it is also flexible enough to be a small but crucial component in a larger ecosystem. This larger system can include commerce systems, brick-and-mortar backend systems, marketing data, user management and many more kinds of sub-systems.</p><p>One way to achieve this flexibility is to make content from our CMS available for another system, leaving you full freedom to design and render your content using the framework of your choice. We affectionately call this service the "Headless API".</p><p>Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere.</p><p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/></p><h2>How does it work?</h2><p>The Headless API defines a simple REST API to access content from the CoreMedia repository. On the server side the content is transformed via GraphQL queries before being returned to the client as JSON response. On the client side, simply parse the JSON response and process it as you please.</p><p>You can customize the GraphQL queries to tailor the returned JSON to your application's needs.</p><p>The first step is to define a schema, which maps from the content properties in the repository scheme to the attributes that you would like to extract. This can be done manually or with the help of a schema generator.</p><p>Then you define a set of GraphQL queries which will be matched against the schema.</p><p>The schema and query set are either deployed alongside the headless server or installed in the CoreMedia repository. The headless server can be started either by Spring Boot or as a Tomcat webapp.</p><p>On the client side, simply request the service's URLs and process the JSON response with whatever technology you prefer.</p><h2>Resources</h2><p>Interested in a deeper understanding of CaaS in CoreMedia? See what we’ve cooked up for you in our <a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a>.</p><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a>: Headless Server as source code, plus a React client as an example</li><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a>: Documentation on installing and customizing the Headless Server, plus documentation on the example React client</li></ul>`}
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Picture', () => {
    const wrapper = shallow(
      <Detail
        pictureLink="coremedia:///image/2658/data"
        pictureTitle="Lego"
        pictureAlt="Lego"
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Picture and Abstract', () => {
    const wrapper = shallow(
      <Detail
        pictureLink="coremedia:///image/2658/data"
        pictureTitle="Lego"
        pictureAlt="Lego"
        teaserText="Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere."
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Picture, Abstract and Richtext', () => {
    const wrapper = shallow(
      <Detail
        pictureLink="coremedia:///image/2658/data"
        pictureTitle="Lego"
        pictureAlt="Lego"
        text={`<p>CoreMedia is a Content Management System (CMS) which can manage your content from creation straight through to rendering. Our Content Application Engine (CAE) provides tools and a framework with which you can easily design a beautiful, consistent and fully-functional user experience.</p><p>The components of the CoreMedia system works gracefully together as an isolated system, but it is also flexible enough to be a small but crucial component in a larger ecosystem. This larger system can include commerce systems, brick-and-mortar backend systems, marketing data, user management and many more kinds of sub-systems.</p><p>One way to achieve this flexibility is to make content from our CMS available for another system, leaving you full freedom to design and render your content using the framework of your choice. We affectionately call this service the "Headless API".</p><p>Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere.</p><p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/></p><h2>How does it work?</h2><p>The Headless API defines a simple REST API to access content from the CoreMedia repository. On the server side the content is transformed via GraphQL queries before being returned to the client as JSON response. On the client side, simply parse the JSON response and process it as you please.</p><p>You can customize the GraphQL queries to tailor the returned JSON to your application's needs.</p><p>The first step is to define a schema, which maps from the content properties in the repository scheme to the attributes that you would like to extract. This can be done manually or with the help of a schema generator.</p><p>Then you define a set of GraphQL queries which will be matched against the schema.</p><p>The schema and query set are either deployed alongside the headless server or installed in the CoreMedia repository. The headless server can be started either by Spring Boot or as a Tomcat webapp.</p><p>On the client side, simply request the service's URLs and process the JSON response with whatever technology you prefer.</p><h2>Resources</h2><p>Interested in a deeper understanding of CaaS in CoreMedia? See what we’ve cooked up for you in our <a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a>.</p><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a>: Headless Server as source code, plus a React client as an example</li><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a>: Documentation on installing and customizing the Headless Server, plus documentation on the example React client</li></ul>`}
        teaserText="Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere."
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Picture and Richtext', () => {
    const wrapper = shallow(
      <Detail
        pictureLink="coremedia:///image/2658/data"
        pictureTitle="Lego"
        pictureAlt="Lego"
        text={`<p>CoreMedia is a Content Management System (CMS) which can manage your content from creation straight through to rendering. Our Content Application Engine (CAE) provides tools and a framework with which you can easily design a beautiful, consistent and fully-functional user experience.</p><p>The components of the CoreMedia system works gracefully together as an isolated system, but it is also flexible enough to be a small but crucial component in a larger ecosystem. This larger system can include commerce systems, brick-and-mortar backend systems, marketing data, user management and many more kinds of sub-systems.</p><p>One way to achieve this flexibility is to make content from our CMS available for another system, leaving you full freedom to design and render your content using the framework of your choice. We affectionately call this service the "Headless API".</p><p>Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere.</p><p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/></p><h2>How does it work?</h2><p>The Headless API defines a simple REST API to access content from the CoreMedia repository. On the server side the content is transformed via GraphQL queries before being returned to the client as JSON response. On the client side, simply parse the JSON response and process it as you please.</p><p>You can customize the GraphQL queries to tailor the returned JSON to your application's needs.</p><p>The first step is to define a schema, which maps from the content properties in the repository scheme to the attributes that you would like to extract. This can be done manually or with the help of a schema generator.</p><p>Then you define a set of GraphQL queries which will be matched against the schema.</p><p>The schema and query set are either deployed alongside the headless server or installed in the CoreMedia repository. The headless server can be started either by Spring Boot or as a Tomcat webapp.</p><p>On the client side, simply request the service's URLs and process the JSON response with whatever technology you prefer.</p><h2>Resources</h2><p>Interested in a deeper understanding of CaaS in CoreMedia? See what we’ve cooked up for you in our <a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a>.</p><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a>: Headless Server as source code, plus a React client as an example</li><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a>: Documentation on installing and customizing the Headless Server, plus documentation on the example React client</li></ul>`}
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Abstract', () => {
    const wrapper = shallow(
      <Detail
        teaserText="Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere."
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail Abstract and Richtext', () => {
    const wrapper = shallow(
      <Detail
        text={`<p>CoreMedia is a Content Management System (CMS) which can manage your content from creation straight through to rendering. Our Content Application Engine (CAE) provides tools and a framework with which you can easily design a beautiful, consistent and fully-functional user experience.</p><p>The components of the CoreMedia system works gracefully together as an isolated system, but it is also flexible enough to be a small but crucial component in a larger ecosystem. This larger system can include commerce systems, brick-and-mortar backend systems, marketing data, user management and many more kinds of sub-systems.</p><p>One way to achieve this flexibility is to make content from our CMS available for another system, leaving you full freedom to design and render your content using the framework of your choice. We affectionately call this service the "Headless API".</p><p>Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere.</p><p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/></p><h2>How does it work?</h2><p>The Headless API defines a simple REST API to access content from the CoreMedia repository. On the server side the content is transformed via GraphQL queries before being returned to the client as JSON response. On the client side, simply parse the JSON response and process it as you please.</p><p>You can customize the GraphQL queries to tailor the returned JSON to your application's needs.</p><p>The first step is to define a schema, which maps from the content properties in the repository scheme to the attributes that you would like to extract. This can be done manually or with the help of a schema generator.</p><p>Then you define a set of GraphQL queries which will be matched against the schema.</p><p>The schema and query set are either deployed alongside the headless server or installed in the CoreMedia repository. The headless server can be started either by Spring Boot or as a Tomcat webapp.</p><p>On the client side, simply request the service's URLs and process the JSON response with whatever technology you prefer.</p><h2>Resources</h2><p>Interested in a deeper understanding of CaaS in CoreMedia? See what we’ve cooked up for you in our <a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a>.</p><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a>: Headless Server as source code, plus a React client as an example</li><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a>: Documentation on installing and customizing the Headless Server, plus documentation on the example React client</li></ul>`}
        teaserText="Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere."
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Detail with Richtext', () => {
    const wrapper = shallow(
      <Detail
        text={`<p>CoreMedia is a Content Management System (CMS) which can manage your content from creation straight through to rendering. Our Content Application Engine (CAE) provides tools and a framework with which you can easily design a beautiful, consistent and fully-functional user experience.</p><p>The components of the CoreMedia system works gracefully together as an isolated system, but it is also flexible enough to be a small but crucial component in a larger ecosystem. This larger system can include commerce systems, brick-and-mortar backend systems, marketing data, user management and many more kinds of sub-systems.</p><p>One way to achieve this flexibility is to make content from our CMS available for another system, leaving you full freedom to design and render your content using the framework of your choice. We affectionately call this service the "Headless API".</p><p>Using the Headless API you can generate ready-to-go HTML content fragments or dynamic Javascript modules. You can then easily insert these fragments into any webpage or single-page application. Use these fragments to seamlessly integrate, reuse, syndicate or publish your content from your CoreMedia CMS anywhere.</p><p><img cms-src="coremedia:///image/2662/data" alt="Scrum" class="float--left"/></p><h2>How does it work?</h2><p>The Headless API defines a simple REST API to access content from the CoreMedia repository. On the server side the content is transformed via GraphQL queries before being returned to the client as JSON response. On the client side, simply parse the JSON response and process it as you please.</p><p>You can customize the GraphQL queries to tailor the returned JSON to your application's needs.</p><p>The first step is to define a schema, which maps from the content properties in the repository scheme to the attributes that you would like to extract. This can be done manually or with the help of a schema generator.</p><p>Then you define a set of GraphQL queries which will be matched against the schema.</p><p>The schema and query set are either deployed alongside the headless server or installed in the CoreMedia repository. The headless server can be started either by Spring Boot or as a Tomcat webapp.</p><p>On the client side, simply request the service's URLs and process the JSON response with whatever technology you prefer.</p><h2>Resources</h2><p>Interested in a deeper understanding of CaaS in CoreMedia? See what we’ve cooked up for you in our <a href="#none" cms-href="coremedia:///page/home~2450">CoreMedia Labs</a>.</p><ul><li><a href="https://labs.coremedia.com/"><strong>Github project</strong></a>: Headless Server as source code, plus a React client as an example</li><li><a href="https://labs.coremedia.com/wiki"><strong>Technical wiki</strong></a>: Documentation on installing and customizing the Headless Server, plus documentation on the example React client</li></ul>`}
        params={{
          color: 'blue',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

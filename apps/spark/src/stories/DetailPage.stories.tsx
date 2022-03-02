import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import DetailedTeasable from "../components/Details/DetailedTeasable";
import { initializeDetail } from "../models/Detail/Detail";
import {
  createAuthor,
  createExternalProductTeaser,
  createImage,
  createTag,
  createTeasableWithOverlay,
} from "./helper/ModelHelper";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Detail Page",
  component: DetailedTeasable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof DetailedTeasable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DetailedTeasable> = (args) => <DetailedTeasable {...args} />;

export const Standard = Template.bind({});
export const WithoutAuthor = Template.bind({});
export const WithoutTags = Template.bind({});
export const WithEmbeddedProduct = Template.bind({});

Standard.args = {
  ...initializeDetail({
    ...createTeasableWithOverlay(),
    authors: [createAuthor()],
    related: null,
    media: [createImage()],
    title: "Detail Page",
    detailText: {
      text: '<div><p>Fashion is made to become unfashionable. Fashion is always of the time in which you live. It is not something standing alone. But the grand problem, the most important problem, is to rejuvenate women. To make women look young. This will change. They feel more joyous. Fashion fades, only style remains the same. In order to be irreplaceable one must always be different. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.</p><p>Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. A girl should be two things: classy and fabulous. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Fashion is made to become unfashionable. Fashion fades, only style remains the same.</p><p><a data-href="coremedia:///cap/content/20532" data-show="embed">White Bag Product Teaser</a></p><p>Fashion fades, only style remains the same. A girl should be two things: classy and fabulous. Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.</p></div>',
      textAsTree: {
        _type: "Element",
        name: "div",
        attributes: [],
        children: [
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Fashion is made to become unfashionable. Fashion is always of the time in which you live. It is not something standing alone. But the grand problem, the most important problem, is to rejuvenate women. To make women look young. This will change. They feel more joyous. Fashion fades, only style remains the same. In order to be irreplaceable one must always be different. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.",
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. A girl should be two things: classy and fabulous. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Fashion is made to become unfashionable. Fashion fades, only style remains the same.",
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Element",
                name: "a",
                attributes: [
                  {
                    _type: "Attribute",
                    name: "data-href",
                    value: "coremedia:///cap/content/20532",
                  },
                  {
                    _type: "Attribute",
                    name: "data-show",
                    value: "embed",
                  },
                ],
                children: [
                  {
                    _type: "Characters",
                    data: "White Bag Product Teaser",
                  },
                ],
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Fashion fades, only style remains the same. A girl should be two things: classy and fabulous. Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.",
              },
            ],
          },
        ],
      },
      textReferencedContent: [],
      __typename: "RichText",
    },
    pictures: [createImage()],

    extDisplayedDate: null,
    modificationDate: "2021-12-14T14:17:30Z[GMT]",
    subjectTaxonomy: [
      createTag("Jeans Summer Look"),
      createTag("Accessories"),
      createTag("Trends"),
      createTag("Women Casual"),
    ],

    __typename: "CMArticleImpl",
  }),
};

WithEmbeddedProduct.args = {
  ...initializeDetail({
    ...createTeasableWithOverlay(),
    authors: [createAuthor()],
    related: null,
    media: [createImage()],
    title: "Detail Page",
    detailText: {
      text: '<div><p>Fashion is made to become unfashionable. Fashion is always of the time in which you live. It is not something standing alone. But the grand problem, the most important problem, is to rejuvenate women. To make women look young. This will change. They feel more joyous. Fashion fades, only style remains the same. In order to be irreplaceable one must always be different. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.</p><p>Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. A girl should be two things: classy and fabulous. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Fashion is made to become unfashionable. Fashion fades, only style remains the same.</p><p><a data-href="coremedia:///cap/content/20532" data-show="embed">White Bag Product Teaser</a></p><p>Fashion fades, only style remains the same. A girl should be two things: classy and fabulous. Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.</p></div>',
      textAsTree: {
        _type: "Element",
        name: "div",
        attributes: [],
        children: [
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Fashion is made to become unfashionable. Fashion is always of the time in which you live. It is not something standing alone. But the grand problem, the most important problem, is to rejuvenate women. To make women look young. This will change. They feel more joyous. Fashion fades, only style remains the same. In order to be irreplaceable one must always be different. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.",
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. A girl should be two things: classy and fabulous. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Fashion is made to become unfashionable. Fashion fades, only style remains the same.",
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Element",
                name: "a",
                attributes: [
                  {
                    _type: "Attribute",
                    name: "data-href",
                    value: "coremedia:///cap/content/20532",
                  },
                  {
                    _type: "Attribute",
                    name: "data-show",
                    value: "embed",
                  },
                ],
                children: [
                  {
                    _type: "Characters",
                    data: "White Bag Product Teaser",
                  },
                ],
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Fashion fades, only style remains the same. A girl should be two things: classy and fabulous. Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.",
              },
            ],
          },
        ],
      },
      textReferencedContent: [createExternalProductTeaser()],
      __typename: "RichText",
    },
    pictures: [createImage()],

    extDisplayedDate: null,
    modificationDate: "2021-12-14T14:17:30Z[GMT]",
    subjectTaxonomy: [
      createTag("Jeans Summer Look"),
      createTag("Accessories"),
      createTag("Trends"),
      createTag("Women Casual"),
    ],

    __typename: "CMArticleImpl",
  }),
};

WithoutAuthor.args = {
  ...initializeDetail({
    ...createTeasableWithOverlay(),
    authors: [],
    related: null,
    media: [createImage()],
    title: "Detail Page",
    detailText: {
      text: '<div><p>Fashion is made to become unfashionable. Fashion is always of the time in which you live. It is not something standing alone. But the grand problem, the most important problem, is to rejuvenate women. To make women look young. This will change. They feel more joyous. Fashion fades, only style remains the same. In order to be irreplaceable one must always be different. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.</p><p>Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. A girl should be two things: classy and fabulous. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Fashion is made to become unfashionable. Fashion fades, only style remains the same.</p><p><a data-href="coremedia:///cap/content/20532" data-show="embed">White Bag Product Teaser</a></p><p>Fashion fades, only style remains the same. A girl should be two things: classy and fabulous. Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.</p></div>',
      textAsTree: {
        _type: "Element",
        name: "div",
        attributes: [],
        children: [
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Fashion is made to become unfashionable. Fashion is always of the time in which you live. It is not something standing alone. But the grand problem, the most important problem, is to rejuvenate women. To make women look young. This will change. They feel more joyous. Fashion fades, only style remains the same. In order to be irreplaceable one must always be different. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.",
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. A girl should be two things: classy and fabulous. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Fashion is made to become unfashionable. Fashion fades, only style remains the same.",
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Element",
                name: "a",
                attributes: [
                  {
                    _type: "Attribute",
                    name: "data-href",
                    value: "coremedia:///cap/content/20532",
                  },
                  {
                    _type: "Attribute",
                    name: "data-show",
                    value: "embed",
                  },
                ],
                children: [
                  {
                    _type: "Characters",
                    data: "White Bag Product Teaser",
                  },
                ],
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Fashion fades, only style remains the same. A girl should be two things: classy and fabulous. Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.",
              },
            ],
          },
        ],
      },
      textReferencedContent: [],
      __typename: "RichText",
    },
    pictures: [createImage()],

    extDisplayedDate: null,
    modificationDate: "2021-12-14T14:17:30Z[GMT]",
    subjectTaxonomy: [
      createTag("Jeans Summer Look"),
      createTag("Accessories"),
      createTag("Trends"),
      createTag("Women Casual"),
    ],

    __typename: "CMArticleImpl",
  }),
};

WithoutTags.args = {
  ...initializeDetail({
    ...createTeasableWithOverlay(),
    authors: [],
    related: null,
    media: [createImage()],
    title: "Detail Page",
    detailText: {
      text: '<div><p>Fashion is made to become unfashionable. Fashion is always of the time in which you live. It is not something standing alone. But the grand problem, the most important problem, is to rejuvenate women. To make women look young. This will change. They feel more joyous. Fashion fades, only style remains the same. In order to be irreplaceable one must always be different. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.</p><p>Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. A girl should be two things: classy and fabulous. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Fashion is made to become unfashionable. Fashion fades, only style remains the same.</p><p><a data-href="coremedia:///cap/content/20532" data-show="embed">White Bag Product Teaser</a></p><p>Fashion fades, only style remains the same. A girl should be two things: classy and fabulous. Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.</p></div>',
      textAsTree: {
        _type: "Element",
        name: "div",
        attributes: [],
        children: [
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Fashion is made to become unfashionable. Fashion is always of the time in which you live. It is not something standing alone. But the grand problem, the most important problem, is to rejuvenate women. To make women look young. This will change. They feel more joyous. Fashion fades, only style remains the same. In order to be irreplaceable one must always be different. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.",
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. A girl should be two things: classy and fabulous. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Fashion is made to become unfashionable. Fashion fades, only style remains the same.",
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Element",
                name: "a",
                attributes: [
                  {
                    _type: "Attribute",
                    name: "data-href",
                    value: "coremedia:///cap/content/20532",
                  },
                  {
                    _type: "Attribute",
                    name: "data-show",
                    value: "embed",
                  },
                ],
                children: [
                  {
                    _type: "Characters",
                    data: "White Bag Product Teaser",
                  },
                ],
              },
            ],
          },
          {
            _type: "Element",
            name: "p",
            attributes: [],
            children: [
              {
                _type: "Characters",
                data: "Fashion fades, only style remains the same. A girl should be two things: classy and fabulous. Some people think luxury is the opposite of poverty. It is not. It is the opposite of vulgarity. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future. Elegance is not the prerogative of those who have just escaped from adolescence, but of those who have already taken possession of their future.",
              },
            ],
          },
        ],
      },
      textReferencedContent: [],
      __typename: "RichText",
    },
    pictures: [createImage()],

    extDisplayedDate: null,
    modificationDate: "2021-12-14T14:17:30Z[GMT]",
    subjectTaxonomy: [],

    __typename: "CMArticleImpl",
  }),
};

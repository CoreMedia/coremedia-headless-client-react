import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Detail from "../components/Details/Detail";
import { createDetail } from "./helper/ModelHelper";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Detail Page",
  component: Detail,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Detail>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Detail> = (args) => <Detail {...args} />;

export const Standard = Template.bind({});
export const WithoutAuthor = Template.bind({});
export const WithoutTags = Template.bind({});
export const WithEmbeddedProduct = Template.bind({});

Standard.args = {
  ...{ ...createDetail("Detail"), structuredTextLinks: [] },
};

WithEmbeddedProduct.args = {
  ...createDetail("Detail"),
};

WithoutAuthor.args = {
  ...{ ...createDetail("Detail"), authors: [] },
};

WithoutTags.args = {
  ...{ ...createDetail("Detail"), authors: [], tags: [] },
};

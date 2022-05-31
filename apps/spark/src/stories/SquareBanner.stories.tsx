import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import SquareBannerContainer from "../components/SquareBanner/SquareBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

export default {
  title: "Square Banner",
  component: SquareBannerContainer,
} as ComponentMeta<typeof SquareBannerContainer>;

const Template: ComponentStory<typeof SquareBannerContainer> = (args) => <SquareBannerContainer {...args} />;

export const Standard = Template.bind({});
export const SixItems = Template.bind({});
export const MixedItems = Template.bind({});

Standard.args = {
  ...createSlot(),
};

SixItems.args = {
  ...createSlot("Slot", 6),
};

MixedItems.args = {
  ...{
    items: createMixedItemCollection(),
  },
};

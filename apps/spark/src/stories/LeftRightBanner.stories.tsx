import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import LeftRightBannerContainer from "../components/LeftRightBanner/LeftRightBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

export default {
  title: "LeftRight Banner",
  component: LeftRightBannerContainer,
} as ComponentMeta<typeof LeftRightBannerContainer>;

const Template: ComponentStory<typeof LeftRightBannerContainer> = (args) => <LeftRightBannerContainer {...args} />;

export const Standard = Template.bind({});
export const SixItems = Template.bind({});
export const MixedItems = Template.bind({});

Standard.args = {
  slot: createSlot(),
};

SixItems.args = {
  slot: createSlot("Slot", 6),
};

MixedItems.args = {
  slot: {
    items: createMixedItemCollection(),
  },
};

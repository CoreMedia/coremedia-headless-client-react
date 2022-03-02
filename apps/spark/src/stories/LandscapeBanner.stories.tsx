import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import LandscapeBannerContainer from "../components/LandscapeBanner/LandscapeBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

export default {
  title: "Landscape Banner",
  component: LandscapeBannerContainer,
} as ComponentMeta<typeof LandscapeBannerContainer>;

const Template: ComponentStory<typeof LandscapeBannerContainer> = (args) => <LandscapeBannerContainer {...args} />;

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

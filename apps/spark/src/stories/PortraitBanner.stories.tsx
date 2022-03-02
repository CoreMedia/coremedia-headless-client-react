import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import PortraitBannerContainer from "../components/PortraitBanner/PortraitBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

export default {
  title: "Portrait Banner",
  component: PortraitBannerContainer,
} as ComponentMeta<typeof PortraitBannerContainer>;

const Template: ComponentStory<typeof PortraitBannerContainer> = (args) => <PortraitBannerContainer {...args} />;

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

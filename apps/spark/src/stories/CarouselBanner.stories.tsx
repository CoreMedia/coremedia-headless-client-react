import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CarouselBannerContainer from "../components/CarouselBanner/CarouselBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

export default {
  title: "Carousel Banner",
  component: CarouselBannerContainer,
} as ComponentMeta<typeof CarouselBannerContainer>;

const Template: ComponentStory<typeof CarouselBannerContainer> = (args) => <CarouselBannerContainer {...args} />;

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
  items: createMixedItemCollection(),
};

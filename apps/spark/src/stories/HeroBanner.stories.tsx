import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import HeroBannerContainer from "../components/HeroBanner/HeroBannerContainer";
import {
  createMixedItemCollection,
  createSlot,
  createTeasableWithOverlay,
  createVideoWithOverlay,
} from "./helper/ModelHelper";

export default {
  title: "Hero Banner",
  component: HeroBannerContainer,
} as ComponentMeta<typeof HeroBannerContainer>;

const Template: ComponentStory<typeof HeroBannerContainer> = (args) => <HeroBannerContainer {...args} />;

export const Standard = Template.bind({});
export const MixedItems = Template.bind({});
export const TeaserOverlayEnabled = Template.bind({});
export const VideoHero = Template.bind({});

Standard.args = {
  ...createSlot(),
};

MixedItems.args = {
  items: createMixedItemCollection(),
};

TeaserOverlayEnabled.args = {
  items: [createTeasableWithOverlay()],
};

VideoHero.args = {
  items: [createVideoWithOverlay()],
};

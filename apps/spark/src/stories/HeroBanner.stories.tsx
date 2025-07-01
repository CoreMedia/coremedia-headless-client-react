import { Meta, StoryObj } from "@storybook/react-vite";

import HeroBannerContainer from "../components/HeroBanner/HeroBannerContainer";
import {
  createBannerWithOverlay,
  createMixedItemCollection,
  createSlot,
  createVideoWithOverlay,
} from "./helper/ModelHelper";

const meta: Meta<typeof HeroBannerContainer> = {
  title: "Hero Banner",
  component: HeroBannerContainer,
};
export default meta;

type Story = StoryObj<typeof HeroBannerContainer>;

export const Standard: Story = {
  args: {
    ...createSlot(),
  },
};

export const MixedItems: Story = {
  args: {
    items: createMixedItemCollection(),
  },
};

export const TeaserOverlayEnabled: Story = {
  args: {
    items: [createBannerWithOverlay()],
  },
};

export const VideoHero: Story = {
  args: {
    items: [createVideoWithOverlay()],
  },
};

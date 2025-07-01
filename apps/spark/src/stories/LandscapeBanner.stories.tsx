import { Meta, StoryObj } from "@storybook/react-vite";

import LandscapeBannerContainer from "../components/LandscapeBanner/LandscapeBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

const meta: Meta<typeof LandscapeBannerContainer> = {
  title: "Landscape Banner",
  component: LandscapeBannerContainer,
};
export default meta;

type Story = StoryObj<typeof LandscapeBannerContainer>;

export const Standard: Story = {
  args: {
    ...createSlot(),
  },
};

export const SixItems: Story = {
  args: {
    ...createSlot("Slot", 6),
  },
};

export const MixedItems: Story = {
  args: {
    ...createSlot(),
    items: createMixedItemCollection(),
  },
};

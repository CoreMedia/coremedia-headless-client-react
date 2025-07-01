import { Meta, StoryObj } from "@storybook/react-vite";

import LeftRightBannerContainer from "../components/LeftRightBanner/LeftRightBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

const meta: Meta<typeof LeftRightBannerContainer> = {
  title: "LeftRight Banner",
  component: LeftRightBannerContainer,
};
export default meta;

type Story = StoryObj<typeof LeftRightBannerContainer>;

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

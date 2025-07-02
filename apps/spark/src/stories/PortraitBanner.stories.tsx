import { Meta, StoryObj } from "@storybook/react-vite";

import PortraitBannerContainer from "../components/PortraitBanner/PortraitBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

const meta: Meta<typeof PortraitBannerContainer> = {
  title: "Portrait Banner",
  component: PortraitBannerContainer,
};
export default meta;

type Story = StoryObj<typeof PortraitBannerContainer>;

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

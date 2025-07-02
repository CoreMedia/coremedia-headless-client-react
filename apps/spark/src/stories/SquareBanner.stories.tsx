import { Meta, StoryObj } from "@storybook/react-vite";

import SquareBannerContainer from "../components/SquareBanner/SquareBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

const meta: Meta<typeof SquareBannerContainer> = {
  title: "Square Banner",
  component: SquareBannerContainer,
};
export default meta;

type Story = StoryObj<typeof SquareBannerContainer>;

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

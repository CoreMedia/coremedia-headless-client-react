import { Meta, StoryObj } from "@storybook/react-vite";

import CarouselBannerContainer from "../components/CarouselBanner/CarouselBannerContainer";
import { createMixedItemCollection, createSlot } from "./helper/ModelHelper";

const meta: Meta<typeof CarouselBannerContainer> = {
  title: "Carousel Banner",
  component: CarouselBannerContainer,
};
export default meta;

type Story = StoryObj<typeof CarouselBannerContainer>;

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

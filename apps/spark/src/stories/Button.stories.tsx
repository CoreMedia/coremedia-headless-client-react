import { Meta, StoryObj } from "@storybook/react-vite";

import Button from "../components/Button/Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const WithText: Story = {
  args: {
    linkTarget: "/",
    text: "Button Text",
  },
};

export const Standard: Story = {
  args: {
    linkTarget: "/",
  },
};

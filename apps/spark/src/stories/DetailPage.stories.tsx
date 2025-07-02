import { Meta, StoryObj } from "@storybook/react-vite";
import Detail from "../components/Details/Detail";
import { createDetail } from "./helper/ModelHelper";

const meta: Meta<typeof Detail> = {
  title: "Detail Page",
  component: Detail,
};
export default meta;

type Story = StoryObj<typeof Detail>;

export const Standard: Story = {
  args: {
    ...{ ...createDetail("Detail"), structuredTextLinks: [] },
  },
};

export const WithEmbeddedProduct: Story = {
  args: {
    ...createDetail("Detail"),
  },
};

export const WithoutAuthor: Story = {
  args: {
    ...{ ...createDetail("Detail"), authors: [] },
  },
};

export const WithoutTags: Story = {
  args: {
    ...{ ...createDetail("Detail"), authors: [], tags: [] },
  },
};

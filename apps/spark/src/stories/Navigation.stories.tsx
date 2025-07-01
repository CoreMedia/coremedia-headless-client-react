import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import NavigationMenu from "../components/Navigation/NavigationMenu";
import { StyledNavigation } from "../components/Navigation/Navigation";
import { createNavigationItem } from "./helper/ModelHelper";

const meta: Meta<typeof NavigationMenu> = {
  title: "NavigationMenu",
  component: NavigationMenu,
};
export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Standard: Story = {
  args: {
    ...createNavigationItem(),
    items: [
      {
        ...createNavigationItem("Text Only"),
        items: [
          createNavigationItem("Navigation", false, 4),
          createNavigationItem("Navigation", false, 4),
          createNavigationItem("Navigation", false, 4),
          createNavigationItem("Navigation", false, 4),
        ],
      },
      createNavigationItem("Without Images", false, 4),
      createNavigationItem("With Images", true, 5),
    ],
    maxDepth: 3,
    depth: 0,
    isTopLevel: true,
  },
  render: (args) => (
    <ul>
      <StyledNavigation>
        <NavigationMenu {...args} />
      </StyledNavigation>
    </ul>
  ),
};

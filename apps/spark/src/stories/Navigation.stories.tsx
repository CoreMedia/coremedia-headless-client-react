import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NavigationMenu from "../components/Navigation/NavigationMenu";
import { StyledNavigation } from "../components/Navigation/Navigation";
import { createNavigationItem } from "./helper/ModelHelper";

export default {
  title: "NavigationMenu",
  component: NavigationMenu,
} as ComponentMeta<typeof NavigationMenu>;

const Template: ComponentStory<typeof NavigationMenu> = (args) => (
  <ul>
    <StyledNavigation>
      <NavigationMenu {...args} />
    </StyledNavigation>
  </ul>
);

export const Standard = Template.bind({});
Standard.args = {
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
};

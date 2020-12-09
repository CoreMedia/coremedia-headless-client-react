import { defaultView } from "@coremedia/view-dispatcher";

export interface Fragment {
  viewName: string;
  title: string;
  viewParams?: Record<string, string>;
}

export const fragmentsByType: {
  [key: string]: Fragment | Array<Fragment>;
} = {
  CMChannel: {
    viewName: defaultView,
    title: "Full Page",
  },
  CMPicture: {
    viewName: "asPreview",
    title: "Picture Crops",
  },
  CMVideo: [
    {
      title: "Hero",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[hero]",
      },
    },
  ],
  CMArticle: [
    {
      title: "Default",
      viewName: "asFullPreview",
    },
    {
      title: "Hero",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[hero]",
      },
    },
    {
      title: "Portrait",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[portrait]",
      },
    },
    {
      title: "Landscape",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[landscape]",
      },
    },
    {
      title: "Square",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[square]",
      },
    },
    {
      title: "Left-Right",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[left-right]",
      },
    },
    {
      title: "Carousel",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[carousel]",
      },
    },
  ],
  CMTeasable: [
    {
      title: "Hero",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[hero]",
      },
    },
    {
      title: "Portrait",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[portrait]",
      },
    },
    {
      title: "Landscape",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[landscape]",
      },
    },
    {
      title: "Square",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[square]",
      },
    },
    {
      title: "Left-Right",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[left-right]",
      },
    },
    {
      title: "Carousel",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "asContainer[carousel]",
      },
    },
  ],
  CMPerson: [
    {
      title: "Default",
      viewName: "asFullPreview",
    },
  ],
  CMCollection: [
    {
      title: "Default",
      viewName: "asContainer",
    },
    {
      title: "Hero",
      viewName: "asContainer[hero]",
    },
    {
      title: "Portrait",
      viewName: "asContainer[portrait]",
    },
    {
      title: "Landscape",
      viewName: "asContainer[landscape]",
    },
    {
      title: "Square",
      viewName: "asContainer[square]",
    },
    {
      title: "Left-Right",
      viewName: "asContainer[left-right]",
    },
    {
      title: "Carousel",
      viewName: "asContainer[carousel]",
    },
  ],
};

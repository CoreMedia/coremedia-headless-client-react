import { defaultView } from "@coremedia-labs/view-dispatcher";

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
        containerView: "hero",
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
        containerView: "hero",
      },
    },
    {
      title: "Portrait",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "portrait",
      },
    },
    {
      title: "Landscape",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "landscape",
      },
    },
    {
      title: "Square",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "square",
      },
    },
    {
      title: "Left-Right",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "left-right",
      },
    },
    {
      title: "Carousel",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "carousel",
      },
    },
  ],
  CMTeasable: [
    {
      title: "Hero",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "hero",
      },
    },
    {
      title: "Portrait",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "portrait",
      },
    },
    {
      title: "Landscape",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "landscape",
      },
    },
    {
      title: "Square",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "square",
      },
    },
    {
      title: "Left-Right",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "left-right",
      },
    },
    {
      title: "Carousel",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "carousel",
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
      viewName: "asContainerPreview",
    },
    {
      title: "Hero",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "hero",
      },
    },
    {
      title: "Portrait",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "portrait",
      },
    },
    {
      title: "Landscape",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "landscape",
      },
    },
    {
      title: "Square",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "square",
      },
    },
    {
      title: "Left-Right",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "left-right",
      },
    },
    {
      title: "Carousel",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "carousel",
      },
    },
  ],
  CMHTML: {
    viewName: "asPreview",
    title: "Default",
  },
};

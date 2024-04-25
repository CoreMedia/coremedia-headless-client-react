import { defaultView } from "@coremedia-labs/view-dispatcher";

export interface Fragment {
  viewName: string;
  title: string;
  viewParams?: Record<string, string>;
}

export const fragmentsByType: {
  [key: string]: Fragment | Array<Fragment>;
} = {
  CMChannelImpl: {
    viewName: defaultView,
    title: "Full Page",
  },
  CMPictureImpl: {
    viewName: "asPreview",
    title: "Picture Crops",
  },
  CMVideoImpl: [
    {
      title: "Hero",
      viewName: "asContainerPreview",
      viewParams: {
        containerView: "hero",
      },
    },
  ],
  CMArticleImpl: [
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
  CMTeasableImpl: [
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
  CMPersonImpl: [
    {
      title: "Default",
      viewName: "asFullPreview",
    },
  ],
  CMCollectionImpl: [
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
  CMHTMLImpl: {
    viewName: "asPreview",
    title: "Default",
  },
};

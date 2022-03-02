import { Picture } from "@coremedia-labs/graphql-layer";
import Image_original from "../assets/image.jpg";
import AuhorImage_original from "../assets/elle-quinn-picture.jpeg";
import VideoFile from "../assets/video.mp4";
import { Teasable } from "@coremedia-labs/graphql-layer";
import { Video } from "@coremedia-labs/graphql-layer";
import { Slot } from "../../models/Grid/Slot";
import { ImageMap } from "@coremedia-labs/graphql-layer";
import { ProductTeaser } from "@coremedia-labs/graphql-layer";
import { ProductRef } from "@coremedia-labs/graphql-layer";
import { Person } from "@coremedia-labs/graphql-layer";
import { Tag } from "@coremedia-labs/graphql-layer";

export const createImage = (prefix = "Picture"): Picture => {
  return {
    __typename: "CMPictureImpl",
    title: prefix + " Title",
    alt: prefix + " alt",
    data: null,
    uriTemplate: Image_original,
    id: prefix + "_id",
  };
};

export const createAuthorPicture = (prefix = "Picture"): Picture => {
  return {
    __typename: "CMPictureImpl",
    title: prefix + " Elle Quinn",
    alt: prefix + " alt",
    data: null,
    uriTemplate: AuhorImage_original,
    id: prefix + "_id",
  };
};

export const createAuthor = (prefix = "Author"): Person => {
  return {
    ...createTeasable(),
    title: "Author",
    __typename: "CMPersonImpl",
    displayName: "",
    teaserText: {
      text: "<div><p>Fashion Journalist for Calista during the day, instagram fashion spy at night.</p></div>",
      plaintext: "<div>Fashion Journalist for Calista during the day, instagram fashion spy at night.</div>",
      __typename: "RichText",
    },
    firstName: "Elle",
    lastName: "Quinn",
    picture: createAuthorPicture(),
  };
};

export const createTag = (value = ""): Tag => {
  return {
    title: "",
    id: "2516",
    segment: "",
    navigationPath: [],
    __typename: "CMTaxonomyImpl",
    value: value,
  };
};

export const createTeasable = (prefix = "Banner"): Teasable => {
  return {
    __typename: "CMTeasableImpl",
    title: prefix + " Title",
    id: prefix + "_id",
    picture: createImage(),
    teaserTitle: prefix + " Teaser Title",
    teaserText: {
      __typename: "RichText",
      text: '<div><h1 class="align--center">Headline within teaserText</h1><p class="align--center">Center Text within teaserText</p></div>',
      plaintext: prefix + " Teaser Plain Text",
    },
    teaserOverlaySettings: null,
    authors: [],
    segment: "segment",
    navigationPath: [{ __typename: "CMChannelImpl", segment: "root", id: "root", title: "root" }],
    extDisplayedDate: null,
    modificationDate: "2021-12-07T13:55:57Z[GMT]",
    teaserTargets: [
      {
        __typename: "ExtendedTeaserTarget",
        callToActionEnabled: true,
        callToActionText: "",
        target: {
          __typename: "CMArticleImpl",
          id: "1250",

          navigationPath: [{ __typename: "CMChannelImpl", segment: "root", id: "root", title: "root" }],
          segment: "",
          title: "Accessories make the difference",
        },
      },
    ],
  };
};

export const createExternalProductTeaser = (prefix = "Banner"): ProductTeaser => {
  return {
    id: "20532",
    picture: createImage(),
    teaserText: {
      text: "<div><p>The perfect companion for your summer outfit</p></div>",
      __typename: "RichText",
      plaintext: "<div>The perfect companion for your summer outfit</div>",
    },
    teaserTitle: "White Bag",
    teaserOverlaySettings: {
      style: null,
      enabled: false,
      positionX: 0,
      positionY: 0,
      width: 50,
      __typename: "TeaserOverlaySettings",
    },
    authors: [],
    title: "",
    segment: "",
    navigationPath: [],
    __typename: "CMProductTeaserImpl",
    extDisplayedDate: null,
    modificationDate: "2021-12-07T14:01:47Z[GMT]",
    teaserTargets: null,
    productRef: createProductRef(),
    shopNowSetting: {
      shopNow: null,
    },
  };
};

export const createTeasableWithOverlay = (prefix = "Banner"): Teasable => {
  const teasable = createTeasable(prefix);
  teasable.teaserOverlaySettings = {
    __typename: "TeaserOverlaySettings",
    style: { color: "#FAFAFA", "text-cls": "cm-richtext--light-shadow" },
    enabled: true,
    positionX: 50,
    positionY: 0,
    width: 50,
  };
  return teasable;
};

export const createVideoWithOverlay = (prefix = "Video"): Video => {
  return {
    ...createTeasableWithOverlay(prefix),
    __typename: "CMVideoImpl",
    data: { __typename: "Blob", uri: VideoFile },
    alt: prefix + " alt",
    dataUrl: null,
    settings: null,
    timeLine: null,
    viewtype: null,
  };
};
export const createProductRef = (prefix = "Product Teaser"): ProductRef => {
  return {
    siteId: prefix + " siteId",
    storeId: prefix + " storeId",
    locale: "en-US",
    externalId: prefix + " externalId",
    product: {
      id: prefix + " id",
      siteId: prefix + " siteId",
      name: prefix + " name",
      shortDescription: "<div>Short Description</div>",
      offerPrice: 40,
      listPrice: 40,
      currency: "USD",
      locale: "en_US",
      seoSegment: prefix + " seo segment",
      externalId: prefix + " external id",
      shortId: prefix + " short id",
      category: {
        breadcrumb: [
          {
            name: "root",
            externalId: "root",
            __typename: "CategoryImpl",
          },
        ],
        __typename: "CategoryImpl",
      },
      thumbnailUrl: Image_original,
      augmentation: {
        picture: createImage(),
        __typename: "ProductAugmentationImpl",
      },
      __typename: "ProductImpl",
    },
    __typename: "ProductRef",
  };
};
export const createProductTeaser = (prefix = "Product Teaser"): ProductTeaser => {
  return {
    ...createTeasableWithOverlay(prefix),
    __typename: "CMProductTeaserImpl",
    shopNowSetting: {
      shopNow: null,
    },
    productRef: createProductRef(),
  };
};

export const createImagemap = (prefix = "Imagemap"): ImageMap => {
  return {
    ...createTeasableWithOverlay(prefix),
    __typename: "CMImageMapImpl",
    transformedHotZones: [
      {
        crops: [
          {
            name: "landscape_ratio16x9",
            coords: [
              {
                x: 28.583333333333332,
                y: 29.037037037037035,
                __typename: "Point",
              },
              {
                x: 37.666666666666664,
                y: 39.407407407407405,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "portrait_ratio2x3",
            coords: [
              {
                x: 31.333333333333332,
                y: 29.11111111111111,
                __typename: "Point",
              },
              {
                x: 55.666666666666664,
                y: 39.44444444444444,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "portrait_ratio1x1",
            coords: [
              {
                x: 37.5,
                y: 29.083333333333332,
                __typename: "Point",
              },
              {
                x: 53.75,
                y: 39.416666666666664,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "landscape_ratio8x3",
            coords: [
              {
                x: 26.583333333333332,
                y: 32.22222222222222,
                __typename: "Point",
              },
              {
                x: 35,
                y: 46.44444444444444,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "landscape_ratio32x9",
            coords: [
              {
                x: 26.583333333333332,
                y: 42.96296296296296,
                __typename: "Point",
              },
              {
                x: 35.08333333333333,
                y: 61.925925925925924,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "landscape_ratio4x3",
            coords: [
              {
                x: 38.08333333333333,
                y: 29.11111111111111,
                __typename: "Point",
              },
              {
                x: 50.25,
                y: 39.44444444444444,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "portrait_ratio9x16",
            coords: [
              {
                x: 27.833333333333332,
                y: 29.109375,
                __typename: "Point",
              },
              {
                x: 56.75,
                y: 39.421875,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
        ],
        points: [
          {
            x: 1191,
            y: 932,
            __typename: "Point",
          },
          {
            x: 1490,
            y: 1122,
            __typename: "Point",
          },
        ],
        alt: "",
        shape: "rect",
        target: "_blank",
        displayAsInlineOverlay: false,
        inlineOverlayTheme: "dark-on-light",
        linkedContent: {
          ...createTeasable(),
          productRef: null,
          shopNowSetting: null,
          __typename: "CMProductTeaserImpl",
        },
        __typename: "TransformedHotZone",
      },
      {
        crops: [
          {
            name: "landscape_ratio16x9",
            coords: [
              {
                x: 38.666666666666664,
                y: 73.48148148148148,
                __typename: "Point",
              },
              {
                x: 45.83333333333333,
                y: 98.37037037037037,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "portrait_ratio2x3",
            coords: [
              {
                x: 58.166666666666664,
                y: 73.55555555555556,
                __typename: "Point",
              },
              {
                x: 77.41666666666666,
                y: 98.38888888888889,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "portrait_ratio1x1",
            coords: [
              {
                x: 55.416666666666664,
                y: 73.5,
                __typename: "Point",
              },
              {
                x: 68.25,
                y: 98.41666666666666,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "landscape_ratio8x3",
            coords: [
              {
                x: 35.916666666666664,
                y: 94,
                __typename: "Point",
              },
              {
                x: 42.58333333333333,
                y: 128.66666666666666,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "landscape_ratio32x9",
            coords: [
              {
                x: 36,
                y: 125.03703703703702,
                __typename: "Point",
              },
              {
                x: 42.666666666666664,
                y: 171.25925925925924,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "landscape_ratio4x3",
            coords: [
              {
                x: 51.5,
                y: 73.55555555555556,
                __typename: "Point",
              },
              {
                x: 61.08333333333333,
                y: 98.33333333333333,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
          {
            name: "portrait_ratio9x16",
            coords: [
              {
                x: 59.666666666666664,
                y: 73.546875,
                __typename: "Point",
              },
              {
                x: 82.5,
                y: 98.390625,
                __typename: "Point",
              },
            ],
            __typename: "ImageMapCrop",
          },
        ],
        points: [
          {
            x: 1521,
            y: 1750,
            __typename: "Point",
          },
          {
            x: 1757,
            y: 2208,
            __typename: "Point",
          },
        ],
        alt: "",
        shape: "rect",
        target: "_blank",
        displayAsInlineOverlay: false,
        inlineOverlayTheme: "dark-on-light",
        linkedContent: {
          ...createTeasable(),
          productRef: null,
          shopNowSetting: null,
          __typename: "CMProductTeaserImpl",
        },
        __typename: "TransformedHotZone",
      },
    ],
    overlayConfiguration: {
      overlay: {
        displayPicture: true,
        displayTitle: true,
        displayShortText: true,
        displayDefaultPrice: true,
      },
    },
  };
};

export const createSlot = (prefix = "Slot", amountOfItems = 3): Slot => {
  const items = [];
  for (let i = 0; i < amountOfItems; i++) {
    items.push(createTeasable("Banner " + (i + 1)));
  }
  return { title: prefix + " Title", text: prefix + " Text", items: items };
};

export const createMixedItemCollection = (): Array<any> => {
  return [
    createTeasable(),
    createTeasableWithOverlay(),
    createVideoWithOverlay(),
    createImagemap(),
    createProductTeaser(),
  ];
};

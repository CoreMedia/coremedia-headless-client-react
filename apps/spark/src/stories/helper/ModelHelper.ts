import { Author } from "../../models/Banner/Author";
import { Banner } from "../../models/Banner/Banner";
import { Picture } from "../../models/Banner/Picture";
import { Tag } from "../../models/Banner/Tag";
import { Detail } from "../../models/Detail/Detail";
import { Slot } from "../../models/Grid/Slot";
import AuthorImage_original from "../assets/elle-quinn-picture.jpeg";
import Image_original from "../assets/image.jpg";
import VideoFile from "../assets/video.mp4";
import { Navigation } from "../../models/Navigation/Navigation";

export const createNavigationItem = (
  prefix = "Navigation",
  withImage?: boolean,
  amountOfItems?: number
): Navigation => {
  const items = [];
  if (amountOfItems) {
    for (let i = 0; i < amountOfItems; i++) {
      items.push(createNavigationItem(prefix, withImage));
    }
  }
  return { title: prefix + " Title", picture: withImage ? createPicture(prefix) : undefined, items: items, code: null };
};

const link = "/a/b/c";

export const createPicture = (prefix = "Picture"): Picture => {
  return {
    title: prefix + " Title",
    alt: prefix + " alt",
    data: null,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    uriTemplate: Image_original,
  };
};

const createAuthor = (prefix = "Author"): Author => {
  return {
    displayName: "Elle Quin",
    linkTarget: link,
    text: "<div><p>Fashion Journalist for Calista during the day, instagram fashion spy at night.</p></div>",
    picture: {
      title: prefix + " Title",
      alt: prefix + " alt",
      data: null,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uriTemplate: AuthorImage_original,
    },
  };
};

const createTag = (value = "Tag"): Tag => {
  return {
    name: value,
    linkTarget: link,
  };
};

export const createBanner = (prefix = "Banner", id?: string): Banner => {
  const banner: Banner = {
    title: prefix + " Title",
    text: `<div><h1 class="align--center">${prefix} Headline within teaserText</h1><p class="align--center">Center Text within teaserText</p></div>`,
    plaintext: prefix + " Teaser Plain Text",
    overlayConfiguration: undefined,
    overlayRequired: false,
    shopNowConfiguration: false,
    code: null,
    viewtype: null,
    picture: createPicture(),
    linkTarget: link,
  };
  if (id) {
    banner.metadata = { root: { id: id } };
  }
  return banner;
};

export const createBannerWithOverlay = (prefix = "Overlay Banner"): Banner => {
  return {
    ...createBanner(prefix),
    overlayRequired: true,
    overlayConfiguration: {
      style: { color: "#FAFAFA", "text-cls": "cm-richtext--light-shadow" },
      enabled: true,
      positionX: 50,
      positionY: 0,
      width: 50,
    },
  };
};

export const createVideoWithOverlay = (prefix = "Video"): Banner => {
  return {
    ...createBannerWithOverlay(prefix),
    video: { videoUrl: VideoFile },
  };
};

export const createProductTeaser = (prefix = "Product Teaser"): Banner => {
  return {
    ...createBanner(prefix),
    shopNowConfiguration: true,
    offerPrice: 40,
    listPrice: 40,
    currency: "USD",
    locale: "en_US",
    metadata: {
      root: { id: "20532" },
    },
  };
};

export const createImagemap = (prefix = "Imagemap"): Banner => {
  return {
    ...createBannerWithOverlay(prefix),
    hotzones: [
      [
        {
          name: "landscape_ratio8x3",
          position: { x: 33.166666666666664, y: 34.22222222222222 },
          rect: { height: 10.37037037037037, width: 9.1666666666666, x: 28.583333333333332, y: 29.037037037037035 },
          self: createBanner(),
          shape: "rect",
          displayAsInlineOverlay: false,
          inlineOverlayTheme: null,
        },
      ],
    ],
    imagemapOverlayConfiguration: {
      displayTitle: true,
      displayShortText: true,
      displayPicture: true,
      displayDefaultPrice: true,
      displayDiscountedPrice: true,
      displayOutOfStockLink: true,
    },
  };
};

const createPElement = () => {
  return {
    _type: "Element",
    name: "p",
    attributes: [],
    children: [
      {
        _type: "Characters",
        data: "I am not interested in the past, except as the road to the future. Beauty is perfect in its imperfections, so you just have to go with the imperfections. Age is something only in your head or a stereotype. Age means nothing when you are passionate about something. I like to be real. I don't like things to be staged or fussy. Dressing up. People just don't do it anymore. We have to change that.",
      },
    ],
  };
};

export const createDetail = (prefix = "Detail"): Detail => {
  return {
    title: prefix + " title",
    authors: [createAuthor()],
    readTime: 3,
    displayDate: "2021-12-14T14:17:30Z[GMT]",
    structuredText: {
      _type: "Element",
      name: "div",
      attributes: [],
      children: [
        createPElement(),
        createPElement(),
        {
          _type: "Element",
          name: "p",
          attributes: [],
          children: [
            {
              _type: "Element",
              name: "a",
              attributes: [
                {
                  _type: "Attribute",
                  name: "data-href",
                  value: "coremedia:///cap/content/20532",
                },
                {
                  _type: "Attribute",
                  name: "data-show",
                  value: "embed",
                },
              ],
              children: [
                {
                  _type: "Characters",
                  data: "White Bag Product Teaser",
                },
              ],
            },
          ],
        },
        createPElement(),
      ],
    },
    structuredTextLinks: [createBanner("Embedded 1", "20532")],
    media: [createPicture("Detail 1"), createPicture("Detail 2")],
    tags: [createTag("Red"), createTag("Green"), createTag("Yellow")],
  };
};

export const createSlot = (prefix = "Slot", amountOfItems = 3): Slot => {
  const items = [];
  for (let i = 0; i < amountOfItems; i++) {
    items.push(createBanner("Banner " + (i + 1)));
  }
  return { title: prefix + " Title", text: prefix + " Text", items: items };
};

export const createMixedItemCollection = (): Array<any> => {
  return [createBanner(), createBannerWithOverlay(), createVideoWithOverlay(), createImagemap(), createProductTeaser()];
};

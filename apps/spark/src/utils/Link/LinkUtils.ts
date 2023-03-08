import {
  Category,
  Product,
  ProductRef,
  CmLinkableImpl,
  CmDownload,
  CmProductTeaser,
  CmExternalChannel,
  CmTaxonomy,
  CmExternalLink,
  CmTeasable,
  CmLinkableFragment,
  CmPerson,
} from "@coremedia-labs/graphql-layer";
import qs, { StringifiableRecord } from "query-string";
import log from "loglevel";
import { getFQDN } from "../App/App";
import { LinkAttributes } from "../../components/Link/Link";

const hasDetailPage: Array<string> = ["CMArticleImpl", "CMVideoImpl", "CMProductImpl"];
const hasPage: Array<string> = ["CMChannelImpl", "CMExternalPageImpl"];

const makeAbsoluteAndAddParams = (path: string, params?: StringifiableRecord): string => {
  let link = getFQDN() + path;
  if (link && params) {
    link += "?" + qs.stringify(params);
  }
  return link;
};

export const formatSegmentForUrl = (segment: string | null | undefined): string => {
  if (!segment) {
    return "";
  }
  segment = segment.split(" ").join("-").replace("?", "");
  segment = segment.toLowerCase();
  return segment;
};

const createProductHref = (self: Product, rootSegment: string, params?: StringifiableRecord): LinkAttributes => {
  let path = "/";
  if (self.category?.breadcrumb) {
    path += `${rootSegment}/product/${self.category?.breadcrumb
      .map((item) => {
        return formatSegmentForUrl(item?.name);
      })
      .join("/")}/`;
    path += `${self.shortId}/`;
  }
  return {
    linkTarget: makeAbsoluteAndAddParams(path, params),
  };
};

const createCategoryHref = (self: Category, rootSegment: string, params?: StringifiableRecord): LinkAttributes => {
  let path = "/";
  if (self?.breadcrumb) {
    path = `/${rootSegment}/category/${self.breadcrumb
      .map((item) => {
        return formatSegmentForUrl(item?.name);
      })
      .join("/")}/`;
    path += self.shortId + "/";
  }
  return {
    linkTarget: makeAbsoluteAndAddParams(path, params),
  };
};

const createHref = (self: CmLinkableFragment, rootSegment: string, params?: StringifiableRecord): LinkAttributes => {
  let path: string | undefined | null = "/";
  let isExternalLink = false;
  let openInNewTab = false;
  if (self.__typename) {
    if (hasDetailPage.indexOf(self.__typename) >= 0) {
      self.navigationPath &&
        self.navigationPath.slice(0, self.navigationPath.length - 1).map((item) => {
          item && (path += `${formatSegmentForUrl(item.segment || item.title)}/`);
          return true;
        });
      path += `${formatSegmentForUrl(self.segment || self.title)}-${self.id}`;
    } else if (hasPage.indexOf(self.__typename) >= 0) {
      self.navigationPath &&
        self.navigationPath.map((item) => {
          item && (path += `${formatSegmentForUrl(item.segment || item.title)}/`);
          return true;
        });
    } else if (self.__typename === "CMDownloadImpl") {
      const download: CmDownload = self as CmDownload;
      isExternalLink = true;
      openInNewTab = true;
      path = download.data?.uri;
    } else if (self.__typename === "CMExternalLinkImpl") {
      const externalLink: CmExternalLink = self as CmExternalLink;
      isExternalLink = true;
      openInNewTab = externalLink.openInNewTab ? externalLink.openInNewTab : false;
      path = externalLink.url || "";
    } else if (self.__typename === "CMPersonImpl") {
      const person: CmPerson = self as CmPerson;
      path += `${rootSegment}/author/${formatSegmentForUrl(
        person.displayName || person.firstName + " " + person.lastName
      )}-${person.id}`;
    } else if (self.__typename === "CMProductTeaserImpl" || self.__typename === "CMExternalProductImpl") {
      const productTeaser: CmProductTeaser = self as CmProductTeaser;
      path =
        productTeaser.productRef &&
        productTeaser.productRef.product &&
        createProductHref(productTeaser.productRef.product, rootSegment).linkTarget;
    } else if (self.__typename === "CMExternalChannelImpl") {
      const externalChannel: CmExternalChannel = self as CmExternalChannel;
      path =
        externalChannel.categoryRef &&
        externalChannel.categoryRef.category &&
        createCategoryHref(externalChannel.categoryRef.category as Category, rootSegment).linkTarget;
    } else if (self.__typename === "CMTaxonomyImpl") {
      const tag: CmTaxonomy = self as CmTaxonomy;
      self.navigationPath &&
        self.navigationPath.slice(0, self.navigationPath.length - 1).map((item) => {
          item && (path += `${formatSegmentForUrl((item as CmTaxonomy).value)}/`);
          return true;
        });
      path = `/${rootSegment}/tag${path}`;
      path += `${formatSegmentForUrl(tag.value)}-${tag.id}`;
    } else if (self.__typename === "CMTeaserImpl") {
      const teaser: CmTeasable = self as CmTeasable;
      if (teaser.teaserTargets && teaser.teaserTargets[0]?.target) {
        const { linkTarget } = getLink(teaser.teaserTargets && teaser.teaserTargets[0]?.target, rootSegment);
        path = linkTarget;
      }
    } else if (
      self.__typename === "CMHTMLImpl" ||
      self.__typename === "CMCollectionImpl" ||
      self.__typename === "CMImageMapImpl" ||
      self.__typename === "CMProductListImpl" ||
      self.__typename === "CMSelectionRulesImpl"
    ) {
      //Do not build links for these items.
      path = null;
    } else {
      log.warn(`No linkbuilding for ${self.__typename} has been implemented yet`);
    }
  }
  return {
    linkTarget: (path && makeAbsoluteAndAddParams(path, params)) || undefined,
    externalLink: isExternalLink,
    openInNewTab: openInNewTab,
  };
};

export const getLink = (to: any, rootSegment: string, params?: StringifiableRecord): LinkAttributes => {
  let linkTarget: LinkAttributes = {};
  if (to) {
    if (to.__typename && to.__typename.startsWith("CM")) {
      const linkable = to as CmLinkableImpl;
      linkTarget = createHref(linkable, rootSegment, params);
    } else if (to.__typename === "CategoryImpl") {
      const linkable = to as Category;
      linkTarget = createCategoryHref(linkable, rootSegment, params);
    } else if (to.__typename === "ProductImpl") {
      const linkable = to as Product;
      linkTarget = createProductHref(linkable, rootSegment, params);
    } else if (to.__typename === "ProductRef") {
      const productRef = to as ProductRef;
      productRef.product && (linkTarget = createProductHref(productRef.product, rootSegment, params));
    } else if (typeof to === "string") {
      linkTarget.linkTarget = to;
    } else {
      log.debug("Ignoring unknown link target", to);
    }
  }
  return linkTarget;
};

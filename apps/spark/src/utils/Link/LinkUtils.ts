import { Product } from "../../queries/fragments/__generated__/Product";
import { Category } from "../../queries/fragments/Category";
import { Linkable } from "../../queries/fragments/__generated__/Linkable";
import { Person } from "../../queries/fragments/__generated__/Person";
import { ProductTeaser } from "../../queries/fragments/__generated__/ProductTeaser";
import { ExternalChannel } from "../../queries/fragments/__generated__/ExternalChannel";
import { getFQDN } from "../App/App";
import qs, { StringifiableRecord } from "query-string";

const hasDetailPage: Array<string> = ["CMArticle", "CMVideo", "CMProduct"];
const hasPage: Array<string> = ["CMChannel", "CMExternalPage"];

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
  segment = segment.split(" ").join("-");
  segment = segment.toLowerCase();
  return segment;
};

export const createProductHref = (self: Product, rootSegment?: string, params?: StringifiableRecord): string => {
  if (!self) {
    return "";
  }
  if (!rootSegment) {
    console.error("rootSegment is needed for link building, please specify");
    return "";
  }

  let requiresProductId = false;
  if (rootSegment.startsWith("sfra")) {
    requiresProductId = true;
  } else if (rootSegment.startsWith("sitegenesis")) {
    requiresProductId = true;
  } else if (rootSegment.startsWith("apparel")) {
    requiresProductId = true;
  } else if (rootSegment.startsWith("commerce")) {
    requiresProductId = true;
  }

  let path = "/";
  if (self.category?.breadcrumb) {
    path += `${rootSegment}/product/${self.category?.breadcrumb
      .map((item) => {
        return formatSegmentForUrl(item?.name);
      })
      .join("/")}/`;
    if (requiresProductId) {
      path += `${self.shortId}/`;
    } else if (self.seoSegment) {
      path += self.seoSegment;
    }
  }
  return makeAbsoluteAndAddParams(path, params);
};

export const createCategoryHref = (self: Category, rootSegment?: string, params?: StringifiableRecord): string => {
  if (!self) {
    return "";
  }
  if (!rootSegment) {
    console.error("rootSegment is needed for link building, please specify");
    return "";
  }
  let requiresCategoryDashes = false;
  let requiresCategoryId = false;
  if (rootSegment.startsWith("sfra")) {
    requiresCategoryDashes = true;
  } else if (rootSegment.startsWith("sitegenesis")) {
    requiresCategoryDashes = true;
  } else if (rootSegment.startsWith("apparel")) {
    requiresCategoryId = true;
  } else if (rootSegment.startsWith("commerce")) {
    requiresCategoryId = true;
  }
  let path = "/";
  if (self?.breadcrumb) {
    path = `/${rootSegment}/category/${self.breadcrumb
      .map((item) => {
        return formatSegmentForUrl(item?.name);
      })
      .join(requiresCategoryDashes ? "-" : "/")}/`;
    if (requiresCategoryId) {
      path += self.shortId + "/";
    }
  }
  return makeAbsoluteAndAddParams(path, params);
};

export const createHref = (self: Linkable, rootSegment?: string, params?: StringifiableRecord): string => {
  if (!self) {
    return "";
  }
  let path = "/";
  if (self.link?.type) {
    if (hasDetailPage.indexOf(self.link.type) >= 0) {
      self.navigationPath &&
        self.navigationPath.slice(0, self.navigationPath.length - 1).map((item) => {
          item && (path += `${formatSegmentForUrl(item.segment || item.title)}/`);
          return true;
        });
      path += `${formatSegmentForUrl(self.segment || self.title)}-${self.id}`;
    } else if (hasPage.indexOf(self.link?.type) >= 0) {
      self.navigationPath &&
        self.navigationPath.map((item) => {
          item && (path += `${formatSegmentForUrl(item.segment || item.title)}/`);
          return true;
        });
    } else if (self.link?.type === "CMPerson") {
      const person: Person = self as Person;
      self.navigationPath &&
        self.navigationPath.slice(0, self.navigationPath.length - 1).map((item) => {
          item && (path += `${formatSegmentForUrl(item.segment || item.title)}/`);
          return true;
        });
      path += `${formatSegmentForUrl(person.displayName || person.firstName + " " + person.lastName)}-${person.id}`;
    } else if (self.link?.type === "CMProductTeaser") {
      const productTeaser: ProductTeaser = self as ProductTeaser;
      path =
        (productTeaser.productRef &&
          productTeaser.productRef.product &&
          createProductHref(productTeaser.productRef.product as Product, rootSegment)) ||
        "";
    } else if (self.link?.type === "CMExternalChannel") {
      const externalChannel: ExternalChannel = self as ExternalChannel;
      path =
        (externalChannel.categoryRef &&
          externalChannel.categoryRef.category &&
          createCategoryHref(externalChannel.categoryRef.category as Category, rootSegment)) ||
        "";
    } else {
      console.debug(`No linkbuilding for ${self.link?.type} has been implemented yet`);
    }
  }
  return makeAbsoluteAndAddParams(path, params);
};

export const getLink = (to: any, rootSegment: string, params?: StringifiableRecord): string => {
  let linkTarget: string;
  if (to) {
    if (to?.link !== undefined && to.link?.type !== undefined) {
      const linkable = to as Linkable;
      linkTarget = createHref(linkable, rootSegment, params);
    } else if (to.__typename === "CategoryImpl") {
      const linkable = to as Category;
      linkTarget = createCategoryHref(linkable, rootSegment, params);
    } else if (to.__typename === "ProductImpl") {
      const linkable = to as Product;
      linkTarget = createProductHref(linkable, rootSegment, params);
    } else if (typeof to === "string") {
      linkTarget = to;
    } else {
      console.warn("Ignoring unknown link target", to);
      return "";
    }
  } else {
    console.warn("Cannot get link, no target is defined.");
    return "";
  }

  return linkTarget;
};

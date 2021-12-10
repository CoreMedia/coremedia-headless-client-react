import { Product } from "../../queries/fragments/__generated__/Product";
import { Category } from "../../queries/fragments/Category";
import { Linkable } from "../../queries/fragments/__generated__/Linkable";
import { Person } from "../../queries/fragments/__generated__/Person";
import { ProductTeaser } from "../../queries/fragments/__generated__/ProductTeaser";
import { ExternalChannel } from "../../queries/fragments/__generated__/ExternalChannel";
import { getFQDN } from "../App/App";
import qs, { StringifiableRecord } from "query-string";
import { getGlobalState } from "../App/GlobalState";
import { Tag } from "../../queries/fragments/__generated__/Tag";

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
  segment = segment.split(" ").join("-");
  segment = segment.toLowerCase();
  return segment;
};

export const createProductHref = (self: Product, params?: StringifiableRecord): string => {
  if (!self) {
    return "";
  }
  const { rootSegment } = getGlobalState();

  let path = "/";
  if (self.category?.breadcrumb) {
    path += `${rootSegment}/product/${self.category?.breadcrumb
      .map((item) => {
        return formatSegmentForUrl(item?.name);
      })
      .join("/")}/`;
    if (!getGlobalState().useSeo) {
      path += `${self.shortId}/`;
    } else if (self.seoSegment) {
      path += self.seoSegment;
    }
  }
  return makeAbsoluteAndAddParams(path, params);
};

export const createCategoryHref = (self: Category, params?: StringifiableRecord): string => {
  if (!self) {
    return "";
  }
  const { rootSegment } = getGlobalState();

  let path = "/";
  if (self?.breadcrumb) {
    path = `/${rootSegment}/category/${self.breadcrumb
      .map((item) => {
        return formatSegmentForUrl(item?.name);
      })
      .join("/")}/`;
    if (!getGlobalState().useSeo) {
      path += self.shortId + "/";
    }
  }
  return makeAbsoluteAndAddParams(path, params);
};

export const createHref = (self: Linkable, params?: StringifiableRecord): string => {
  if (!self) {
    return "";
  }
  let path = "/";
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
    } else if (self.__typename === "CMPersonImpl") {
      const person: Person = self as Person;
      self.navigationPath &&
        self.navigationPath.slice(0, self.navigationPath.length - 1).map((item) => {
          item && (path += `${formatSegmentForUrl(item.segment || item.title)}/`);
          return true;
        });
      path += `${formatSegmentForUrl(person.displayName || person.firstName + " " + person.lastName)}-${person.id}`;
    } else if (self.__typename === "CMProductTeaserImpl" || self.__typename === "CMExternalProductImpl") {
      const productTeaser: ProductTeaser = self as ProductTeaser;
      path =
        (productTeaser.productRef &&
          productTeaser.productRef.product &&
          createProductHref(productTeaser.productRef.product as Product)) ||
        "";
    } else if (self.__typename === "CMExternalChannelImpl") {
      const externalChannel: ExternalChannel = self as ExternalChannel;
      path =
        (externalChannel.categoryRef &&
          externalChannel.categoryRef.category &&
          createCategoryHref(externalChannel.categoryRef.category as Category)) ||
        "";
    } else if (self.__typename === "CMTaxonomyImpl") {
      const tag: Tag = self as Tag;
      self.navigationPath &&
        self.navigationPath.slice(0, self.navigationPath.length - 1).map((item) => {
          item && (path += `${formatSegmentForUrl((item as Tag).value)}/`);
          return true;
        });
      const { rootSegment } = getGlobalState();
      path = `/${rootSegment}/tag${path}`;
      path += `${formatSegmentForUrl(tag.value)}-${tag.id}`;
    } else {
      console.debug(`No linkbuilding for ${self.__typename} has been implemented yet`);
    }
  }
  return makeAbsoluteAndAddParams(path, params);
};

export const getLink = (to: any, params?: StringifiableRecord): string => {
  let linkTarget: string;
  if (to) {
    if (to.__typename && to.__typename.startsWith("CM")) {
      const linkable = to as Linkable;
      linkTarget = createHref(linkable, params);
    } else if (to.__typename === "CategoryImpl") {
      const linkable = to as Category;
      linkTarget = createCategoryHref(linkable, params);
    } else if (to.__typename === "ProductImpl") {
      const linkable = to as Product;
      linkTarget = createProductHref(linkable, params);
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

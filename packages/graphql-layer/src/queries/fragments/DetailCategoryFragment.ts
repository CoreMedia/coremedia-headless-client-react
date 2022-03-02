import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";
import { categoryFragment } from "./CategoryFragment";
import { productFragment } from "./ProductFragment";
import { pageGridFragment } from "./PageGridFragment";

export const detailCategoryFragment = gql`
  fragment DetailCategory on Category {
    ...Category
    products {
      ...Product
    }
    breadcrumb {
      externalId
    }
    shortDescription
    longDescription
    children {
      ...Category
      products {
        ...Product
      }
    }
    augmentation {
      grid {
        ...PageGrid
      }
      content {
        id
      }
    }
  }
  ${pictureFragment}
  ${productTeaserFragment}
  ${categoryFragment}
  ${productFragment}
  ${pageGridFragment}
  ${categoryFragment}
`;

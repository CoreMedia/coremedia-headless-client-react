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
    shortDescription
    longDescription
    children {
      ...Category
      products {
        ...Product
      }
    }
    grid {
      ...PageGrid
    }
  }
  ${pictureFragment}
  ${productTeaserFragment}
  ${categoryFragment}
  ${productFragment}
  ${pageGridFragment}
  ${categoryFragment}
`;

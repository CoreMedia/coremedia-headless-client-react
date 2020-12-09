import { gql, useQuery, QueryResult } from "@apollo/client";
import { RootQuery, RootQueryVariables } from "./__generated__/RootQuery";
import { teasableFragment } from "./fragments/TeasableFragment";
import { navigationFragment } from "./fragments/NavigationFragment";
import { collectionFragment } from "./fragments/CollectionFragment";
import { categoryFragment } from "./fragments/CategoryFragment";
import { externalChannelFragment } from "./fragments/ExternalChannelFragment";
import { pageGridPlacementFragment } from "./fragments/PageGridPlacementFragment";
import { linkableWithLocaleFragment } from "./fragments/LinkableWithLocaleFragment";
import { CMProductFragment } from "./fragments/CMProductFragment";

const ROOT_QUERY = gql`
  query RootQuery($rootSegment: String!) {
    content {
      pageByPath(path: $rootSegment) {
        grid {
          id
          placements(names: ["header", "footer", "footer-navigation"]) {
            ...PageGridPlacement
          }
        }
        id
        localizedVariants {
          ...LinkableWithLocale
        }
        ...Teasable
        ...Navigation
        ... on CMExternalChannel {
          category {
            children {
              ...Category
              children {
                ...Category
                children {
                  ...Category
                  children {
                    ...Category
                    children {
                      ...Category
                    }
                  }
                }
              }
            }
          }
        }
        children {
          ...Teasable
          ...Navigation
          ...Collection
          ...ExternalChannel
          ...CMProduct
          ... on CMExternalChannel {
            category {
              children {
                ...Category
                children {
                  ...Category
                  children {
                    ...Category
                    children {
                      ...Category
                      children {
                        ...Category
                      }
                    }
                  }
                }
              }
            }
          }
          ... on CMNavigation {
            children {
              ...Teasable
              ...Navigation
              ...Collection
              ...ExternalChannel
              ...CMProduct
              ... on CMNavigation {
                children {
                  ...Teasable
                  ...Navigation
                  ...Collection
                  ...ExternalChannel
                  ...CMProduct
                  ... on CMNavigation {
                    children {
                      ...Teasable
                      ...Navigation
                      ...Collection
                      ...ExternalChannel
                      ...CMProduct
                      ... on CMNavigation {
                        children {
                          ...Teasable
                          ...Navigation
                          ...Collection
                          ...ExternalChannel
                          ...CMProduct
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${teasableFragment}
  ${linkableWithLocaleFragment}
  ${navigationFragment}
  ${collectionFragment}
  ${categoryFragment}
  ${externalChannelFragment}
  ${pageGridPlacementFragment}
  ${CMProductFragment}
`;

export default (rootSegment: string): QueryResult<RootQuery> => {
  return useQuery<RootQuery, RootQueryVariables>(ROOT_QUERY, {
    variables: { rootSegment },
  });
};

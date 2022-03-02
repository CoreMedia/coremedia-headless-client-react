import { gql, QueryResult, useQuery } from "@apollo/client";
import { RootQuery as Query, RootQueryVariables } from "./__generated__/RootQuery";
import { teasableFragment } from "./fragments/TeasableFragment";
import { navigationFragment } from "./fragments/NavigationFragment";
import { collectionFragment } from "./fragments/CollectionFragment";
import { categoryFragment } from "./fragments/CategoryFragment";
import { externalChannelFragment } from "./fragments/ExternalChannelFragment";
import { pageGridPlacementFragment } from "./fragments/PageGridPlacementFragment";
import { linkableWithLocaleFragment } from "./fragments/LinkableWithLocaleFragment";
import { CMProductFragment } from "./fragments/CMProductFragment";
import { externalLinkFragment } from "./fragments/ExternalLinkFragment";
import { externalChannelForNavigationFragment } from "./fragments/navigation/ExternalChannelForNavigationFragment";
import { teasableForNavigationFragment } from "./fragments/navigation/TeasableForNavigationFragment";
import { CMProductForNavigationFragment } from "./fragments/navigation/CMProductForNavigationFragment";
import { collectionForNavigationFragment } from "./fragments/navigation/CollectionForNavigationFragment";

export const ROOT_QUERY = gql`
  query RootQuery($rootSegment: String!) {
    content {
      site(rootSegment: $rootSegment) {
        id
      }
      pageByPath(path: $rootSegment) {
        grid {
          id
          placements(names: ["header", "footer", "footer-navigation"]) {
            ...PageGridPlacement
          }
        }
        localizedVariants {
          ...LinkableWithLocale
        }
        ...TeasableForNavigation
        ... on CMExternalChannel {
          categoryRef {
            category {
              children {
                ...Category
                children {
                  ...Category
                }
              }
            }
          }
        }
        children {
          ...TeasableForNavigation
          ...ExternalChannelForNavigation
          ...CollectionForNavigation
          ...CMProductForNavigation
          ...ExternalLink
          ... on CMCollection {
            items {
              ...TeasableForNavigation
              ...ExternalChannelForNavigation
              ...CMProductForNavigation
              ...ExternalLink
              ...ProductRef
              ...ExternalProduct
              ... on CMCollection {
                items {
                  ...TeasableForNavigation
                  ...ExternalChannelForNavigation
                  ...CMProductForNavigation
                  ...ExternalLink
                  ...ProductRef
                  ...ExternalProduct
                }
              }
            }
          }
          ... on CMExternalChannel {
            categoryRef {
              category {
                children {
                  ...Category
                  children {
                    ...Category
                  }
                }
              }
            }
          }
          ... on CMNavigation {
            children {
              ...TeasableForNavigation
              ...ExternalChannelForNavigation
              ...CollectionForNavigation
              ...CMProductForNavigation
              ...ExternalLink
              ... on CMNavigation {
                children {
                  ...TeasableForNavigation
                  ...ExternalChannelForNavigation
                  ...CollectionForNavigation
                  ...CMProductForNavigation
                  ...ExternalLink
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
  ${externalLinkFragment}
  ${externalChannelForNavigationFragment}
  ${teasableForNavigationFragment}
  ${CMProductForNavigationFragment}
  ${collectionForNavigationFragment}
`;

export const RootQuery = (rootSegment: string): QueryResult<Query> => {
  return useQuery<Query, RootQueryVariables>(ROOT_QUERY, {
    variables: { rootSegment },
  });
};

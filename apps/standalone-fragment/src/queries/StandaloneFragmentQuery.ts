import { gql, useQuery, QueryResult } from "@apollo/client";
import { StandaloneFragmentQuery, StandaloneFragmentQueryVariables } from "./__generated__/StandaloneFragmentQuery";

const FRAGMENT_PREVIEW_QUERY = gql`
  query StandaloneFragmentQuery($contentId: String!) {
    content {
      content(id: $contentId) {
        ...StandaloneTeasable
      }
    }
  }
  fragment StandaloneTeasable on CMTeasable {
    id
    teaserText {
      plaintext: text(view: "plainFirstParagraph")
    }
    teaserTitle
    picture {
      ...StandalonePicture
    }
  }
  fragment StandalonePicture on CMPicture {
    id
    alt
    uriTemplate
  }
`;

export default (contentId: string): QueryResult<StandaloneFragmentQuery> => {
  return useQuery<StandaloneFragmentQuery, StandaloneFragmentQueryVariables>(FRAGMENT_PREVIEW_QUERY, {
    variables: { contentId },
  });
};

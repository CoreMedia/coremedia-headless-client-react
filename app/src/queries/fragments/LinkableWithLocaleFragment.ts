import { gql } from "@apollo/client";
import { linkableFragment } from "./LinkableFragment";

export const linkableWithLocaleFragment = gql`
  fragment LinkableWithLocale on CMLinkable {
    ...Linkable
    locale
  }
  ${linkableFragment}
`;

import { gql } from "@apollo/client";
import { detailTeasableFragment } from "./DetailTeasableFragment";
import { personFragment } from "./PersonFragment";

export const detailPersonFragment = gql`
  fragment DetailPerson on CMPerson {
    ...DetailTeasable
    ...Person
    jobTitle
    organization
    eMail
  }

  ${detailTeasableFragment}
  ${personFragment}
`;

import React from "react";
import { useTranslation } from "react-i18next";
import { DetailAuthor } from "../../models/Detail/DetailAuthor";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import LandscapeBannerContainer from "../LandscapeBanner/LandscapeBannerContainer";
import PersonWithInfo from "../Person/PersonWithInfo";
import RichText from "../RichText/RichText";
import { Article, StyledDetail, Text } from "./Detail";

const DetailPerson: React.FC<DetailAuthor> = ({
  structuredText,
  picture,
  displayName,
  jobTitle,
  organization,
  eMail,
  related,
  metadata = {},
}) => {
  const { t } = useTranslation();

  return (
    <StyledDetail {...metaDataElement(metadata.root)}>
      <Article>
        <PersonWithInfo
          picture={picture}
          displayName={displayName}
          jobTitle={jobTitle}
          organization={organization}
          eMail={eMail}
        />
        {structuredText && (
          <Text {...metaDataProperty(metadata.properties?.structuredText)}>
            <RichText text={structuredText} />
          </Text>
        )}
      </Article>
      {related && related.length > 0 && (
        <section {...metaDataProperty(metadata.properties?.related)}>
          <LandscapeBannerContainer title={t("DetailPage.related")} items={related} />
        </section>
      )}
    </StyledDetail>
  );
};
export default DetailPerson;

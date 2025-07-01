import React from "react";
import styled from "styled-components";
import { convert, ZonedDateTime } from "@js-joda/core";
import "@js-joda/timezone/dist/js-joda-timezone-10-year-range";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import { useSiteContextState } from "../../context/SiteContextProvider";

interface Props {
  date: string | undefined;
}

export const Time = styled.time``;

const Date: React.FC<Props> = ({ date }) => {
  const { siteLocale } = useSiteContextState();

  let parsedDate: string | undefined = "";
  if (date !== undefined) {
    const zonedDateTime = ZonedDateTime.parse(date);
    const jsDate: Date = convert(zonedDateTime).toDate();
    parsedDate = jsDate.toLocaleDateString(siteLocale);
  }
  return (
    <Time dateTime={parsedDate} {...metaDataProperty("properties.extDisplayedDate")}>
      {parsedDate}
    </Time>
  );
};

export default Date;

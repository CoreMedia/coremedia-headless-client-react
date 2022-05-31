import React from "react";
import { convert, ZonedDateTime } from "@js-joda/core";
import styled from "styled-components";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import "@js-joda/timezone";

interface Props {
  date: string | undefined;
}

export const Time = styled.time``;

const Date: React.FC<Props> = ({ date }) => {
  let parsedDate: string | undefined = "";
  if (date !== undefined) {
    const zonedDateTime = ZonedDateTime.parse(date);
    const jsDate: Date = convert(zonedDateTime).toDate();
    parsedDate = jsDate.toLocaleDateString("en-US");
  }
  return (
    <Time dateTime={parsedDate} {...metaDataProperty("properties.extDisplayedDate")}>
      {parsedDate}
    </Time>
  );
};

export default Date;

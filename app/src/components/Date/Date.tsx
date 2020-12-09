import React from "react";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import { convert, ZonedDateTime } from "@js-joda/core";
import "@js-joda/timezone";

interface Props {
  date: string | undefined;
}

const Date: React.FC<Props> = ({ date }) => {
  let parsedDate: string | undefined = "";
  if (date !== undefined) {
    const zonedDateTime = ZonedDateTime.parse(date);
    const jsDate: Date = convert(zonedDateTime).toDate();

    const options = {
      //weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      //hour: "numeric",
      //minute: "2-digit",
    };

    parsedDate = jsDate.toLocaleDateString("en-US", options);
  }
  return (
    <time className={"cm-date"} dateTime={parsedDate} {...metaDataProperty("properties.extDisplayedDate")}>
      {parsedDate}
    </time>
  );
};

export default Date;

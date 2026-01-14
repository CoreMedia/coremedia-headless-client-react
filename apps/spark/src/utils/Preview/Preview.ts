import { ZonedDateTime, DateTimeFormatter, convert } from "@js-joda/core";
import log from "loglevel";

/**
 * Checks for preview mode based on `VITE_PREVIEW` or `mode` === "development"
 * @return boolean preview mode
 */
export const isPreview = (): boolean => {
  return (
    import.meta.env.VITE_PREVIEW === "true" ||
    (import.meta.env.DEV && import.meta.env.VITE_PREVIEW !== "false") ||
    false
  );
};

/**
 * Extract the previewDate from URL path either as ISOString or as deprecated string formatted by Studio
 * @param queryParams the query params of "react-router-dom"
 * @return previewDate or undefined
 */
export const getPreviewDate = (queryParams: string) => {
  try {
    // new ISO format
    const previewDateISO = new URLSearchParams(queryParams).get("previewDateISO");
    let previewDate = previewDateISO ? new Date(previewDateISO) : undefined;

    // deprecated Studio Date format
    if (!previewDate) {
      const previewDateStudio = new URLSearchParams(queryParams).get("previewDate");
      if (previewDateStudio) {
        const STUDIO_FORMAT = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm VV");
        const zonedDateTime = ZonedDateTime.parse(previewDateStudio, STUDIO_FORMAT);
        previewDate = convert(zonedDateTime).toDate();
      }
    }
    if (isPreview() && previewDate) {
      return previewDate;
    }
  } catch (error) {
    log.error("Ignore previewDate:", error);
  }
  return undefined;
};

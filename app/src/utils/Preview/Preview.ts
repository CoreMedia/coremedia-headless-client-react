/**
 * Checks for preview mode based on `REACT_APP_PREVIEW` or `NODE_ENV` === "development"
 * @return boolean preview mode
 */
export const isPreview = (): boolean => {
  return process.env.REACT_APP_PREVIEW === "true" || process.env.NODE_ENV === "development";
};

/**
 * Extract the previewDate from URL path
 * @param pathname the URL path of "react-router-dom"
 * @return string preview date
 */
export const getPreviewDate = (pathname: string): string | undefined => {
  let previewDate;
  if (isPreview() && pathname.startsWith("/preview/")) {
    const pathElements = pathname.split("/") || [];
    previewDate = pathElements.pop() || "";
    if (
      pathElements.pop() === "preview" ||
      previewDate === "" ||
      (previewDate !== "" && isNaN(Date.parse(previewDate)))
    ) {
      previewDate = undefined;
    }
  }
  return previewDate;
};

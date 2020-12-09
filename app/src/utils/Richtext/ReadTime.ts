export const readTimeInMinutes = (text: string | null): number | null => {
  if (!text) {
    return null;
  }
  text = text.replace(/(^\s*)|(\s*$)/gi, "");
  text = text.replace(/[ ]{2,}/gi, " ");
  text = text.replace(/\n /, "\n");
  const words = text.split(" ").length;
  return Math.ceil(words / 130);
};

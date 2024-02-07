import { t } from "i18next";
import { Tag } from "../../models/Banner/Tag";

/**
 * Returns a localized label for the current locale from the translation labels.
 * (see: translation.json)
 *
 * @param key translation key
 * @param prefix optional prefix used for lookup
 * @param fallback optional translation fallback
 */
export const getLocalizedLabel = (key: string, prefix?: string, fallback?: string): string => {
  const lookupKey = prefix ? prefix + "." + key : key;
  return t(lookupKey) || (fallback ? fallback : lookupKey);
};

/**
 * Returns the localized tag label for the given tag and locale from the tags translation map.
 *
 * @param tag the tag
 * @param locale target locale
 */
export const getLocalizedTagLabel = (tag: Tag, locale: Intl.Locale): string | undefined => {
  let name: string | undefined = tag.name;
  if (tag.translations) {
    name = tag.translations[locale.baseName] || tag.translations[locale.language] || name;
  }
  return name;
};

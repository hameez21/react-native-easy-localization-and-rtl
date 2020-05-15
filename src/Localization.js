import LocalizedStrings from "react-native-localization";
export const i18n = new LocalizedStrings({ en: {} });

/** @description Sets the object for language translations.
 * @param {object} localizationObject the object containing languages and words.
 *
 */
export const setLocalization = localizationObject => {
  i18n.setContent(localizationObject);
};

/** @description Sets the current language of the app.
 * @param {string} language language in this format 'en'.
 *
 */
export const setLanguage = language => {
  i18n.setLanguage(language);
};

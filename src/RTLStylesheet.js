import LocalizedStrings from "react-native-localization";
import { StyleSheet } from "react-native";

const RTLLang = ["ar", "ur", "fa"];

export default class StyleSheetFactory {
  /** @description get the RTL styles for the app.
   * @param {LocalizedStrings} LocalizedStrings  object containing languages and words.
   *
   */
  static getSheet(i18n) {
    let isRTL = RTLLang.includes(i18n.getLanguage());
    return StyleSheet.create({
      containerColumn: {
        alignItems: isRTL ? "flex-end" : "flex-start",
      },
      containerRow: {
        flexDirection: isRTL ? "row-reverse" : "row",
      },
      text: {
        textAlign: isRTL ? "right" : "left",
      },
      flipHorizontal: {
        transform: isRTL ? [{ rotateY: "180deg" }] : [],
      },
    });
  }
  /** @description get the RTL state of current lanuage for the app.
   * @param {LocalizedStrings} LocalizedStrings  object containing languages and words.
   *
   */

  static isRTL(i18n) {
    return RTLLang.includes(i18n.getLanguage);
  }
}

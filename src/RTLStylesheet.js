import { i18n } from "./Localization";
import { StyleSheet } from "react-native";

const RTLLang = ["ar", "ur", "fa"];

export default class StyleSheetFactory {
  static getSheet() {
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
    });
  }
  static isRTL() {
    return RTLLang.includes(i18n.getLanguage);
  }
}

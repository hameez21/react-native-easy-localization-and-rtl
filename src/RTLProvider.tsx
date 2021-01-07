import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import LocalizedStrings from "react-native-localization";
import { RTLLang } from "./constants";
import { RTLContext } from "./RTLContext";

type Props = {
  children: React.Component;
};
type State = {
  language: string;
  isRtl: boolean;
  setLanguage: (lang: string) => void;
  RtlStyles: object;
};

export default class RTLProvider extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      language: RTLProvider.localizedString
        ? RTLProvider.localizedString.getLanguage()
        : "",
      isRtl: false,
      setLanguage: this.setLanguage,
      RtlStyles: this.getSheet(false),
    };
  }

  getSheet(isRTL) {
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
      containerColumnInverse: {
        alignItems: !isRTL ? "flex-end" : "flex-start",
      },
      containerRowInverse: {
        flexDirection: !isRTL ? "row-reverse" : "row",
      },
      textInverse: {
        textAlign: !isRTL ? "right" : "left",
      },
      flipHorizontal: {
        transform: isRTL ? [{ rotateY: "180deg" }] : [],
      },
    });
  }

  setLanguage = (lang) => {
    this.setState({
      language: lang,
      isRtl: RTLLang.includes(lang),
      RtlStyles: this.getSheet(RTLLang.includes(lang)),
    });
    RTLProvider.localizedString.setLanguage(lang);
  };
  static localizedString: LocalizedStrings = {};
  static setLocalizedString(localizedString) {
    RTLProvider.localizedString = localizedString;
  }

  render() {
    const {
      props: { children },
    } = this;

    return (
      <RTLContext.Provider value={this.state}>{children}</RTLContext.Provider>
    );
  }
}

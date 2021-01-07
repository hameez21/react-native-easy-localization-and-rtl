import LocalizedStrings from "react-native-localization";
import RTLProvider from "./RTLProvider";
import React from "react";
import { RTLConsumer, RTLContext } from "./RTLContext";

type State = {
  language: string;
  isRtl: boolean;
  setLanguage: (lang: string) => void;
  RtlStyles: {
    containerColumn: object;
    containerRow: object;
    text: object;
    containerColumnInverse: object;
    containerRowInverse: object;
    textInverse: object;
    flipHorizontal: object;
  };
};

export function LocalizationString(jsonObject) {
  const obj = new LocalizedStrings(jsonObject);
  RTLProvider.setLocalizedString(obj);
  return RTLProvider.localizedString;
}

export function initializeRTL(localizedString) {
  RTLProvider.setLocalizedString(localizedString);
}

export function useRtlContext(): State {
  const context = React.useContext(RTLContext);
  if (context === null) {
    throw Error(
      "Please make sure RTLProvider is available at the top of the app"
    );
  }
  return context;
}

export { RTLProvider };

export function withRtl<T>(WrappedComponent: React.ComponentType<T>) {
  return React.forwardRef((props: T, ref: React.Ref<T>) => (
    <RTLConsumer>
      {({
        language,
        isRtl,
        RtlStyles,
        setLanguage,
      }: {
        language: string;
        isRtl: boolean;
        RtlStyles: {
          containerColumn: object;
          containerRow: object;
          text: object;
          containerColumnInverse: object;
          containerRowInverse: object;
          textInverse: object;
          flipHorizontal: object;
        };
        setLanguage: (lang: string) => void;
      }) => (
        <WrappedComponent
          {...props}
          language={language}
          isRtl={isRtl}
          RtlStyles={RtlStyles}
          setLanguage={setLanguage}
          localizedString={RTLProvider.localizedString}
          ref={ref}
        />
      )}
    </RTLConsumer>
  ));
}

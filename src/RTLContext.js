import React from "react";

const context = {
  language: "",
  isRTL: false,
  setLanguage: () => {},
};

export const RTLContext = React.createContext(context);
export const RTLConsumer = RTLContext.Consumer;

# React Native Easy Localization and RTL

This library is for creating multi-Language supported apps easily on android and ios using react native without any reloads.
It helps to change language and layout easily using predefined styles.

**Lets build an RTL layout stylesheet library for ease of use**

# Getting Started

`yarn add react-native-localization react-native-easy-localization-and-rtl`

`npm i --save react-native-localization react-native-easy-localization-and-rtl`

This Library use react-native-localization.

# Installation

```
#react-native >= 0.60
cd ios && pod install && cd ..

#react-native < 0.60
react-native link react-native-localization
```

**for manual installation guide https://github.com/stefalda/ReactNativeLocalization**

# Usage

```js
import { RTLProvider } from "react-native-easy-localization-and-rtl";
// wrap your app in this provider
<RTLProvider>
  <App />
</RTLProvider>;
```

### Setting up Language Object

**There are two ways u can setup the Language Object**

**1. Initializing RTLProvider with your own version of Localized String (Recommended)**
Using **react-native-localization** lib you can create the localized strings and pass it in this library.

```js
//LocalizedConstants.js

import { initializeRTL } from "react-native-easy-localization-and-rtl";
import LocalizedStrings from "react-native-localization";

const localizedString = new LocalizedStrings({
  en: {
    region: "Select Your Region",
    loginMsg: " Kindly enter email address and password to Login",
    noAccount: "Don’t have an account? Click Sign Up button",
    forgotPassword: "Forgot Password",
    login: "Login",
    signup: "Sign up",
    email: "Email Address",
    password: "Password",
    addPhoto: "Add Photo",
    name: "Name and Surname",
  },
  ar: {
    region: "حدد منطقتك",
    loginMsg: "يرجى إدخال عنوان البريد الإلكتروني وكلمة المرور لتسجيل الدخول",
    noAccount: "ليس لديك حساب؟ انقر فوق زر التسجيل",
    forgotPassword: "هل نسيت كلمة المرور",
    login: "تسجيل الدخول",
    signup: "سجل",
  },
});

initializeRTL(localizedString);

export { localizedString };
```

**2. Directly Initializing**
This will have some problems with intellisense (I am working on its fix)

```js
//LocalizedConstants.js
import { LocalizationString } from "react-native-easy-localization-and-rtl";
const strings = LocalizationString({
  en: {
    region: "Select Your Region",
    loginMsg: " Kindly enter email address and password to Login",
    noAccount: "Don’t have an account? Click Sign Up button",
    forgotPassword: "Forgot Password",
    login: "Login",
    signup: "Sign up",
    email: "Email Address",
    password: "Password",
    addPhoto: "Add Photo",
    name: "Name and Surname",
    helloWorld: "Hello World",
  },
  ar: {
    region: "حدد منطقتك",
    loginMsg: "يرجى إدخال عنوان البريد الإلكتروني وكلمة المرور لتسجيل الدخول",
    noAccount: "ليس لديك حساب؟ انقر فوق زر التسجيل",
    forgotPassword: "هل نسيت كلمة المرور",
    login: "تسجيل الدخول",
    signup: "سجل",
  },
});

export { strings };
```

### Using High Order Class Component

**for localized string object you can use either the one passed in props or the object that u created**

```js

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {withRtl} from "react-native-easy-localization-and-rtl"
//If you want to use localized object directly both are same instances so will always be same
import {strings} from './LocalizedConstants.js'


class App extends Component {

  componentDidMount(){
    console.log('Currently Active Language',this.props.language)
    console.log('Currently Active Layout',this.props.isRtl)
    console.log('Currently Active Styles',this.props.RtlStyles)


  }

  onPress=()=>{
    this.props.setLanguage('ar')
  }

  render() {
    return (
      <View style={{...this.props.RtlStyles.containerColumn}}>
        <Text style={{...this.props.RtlStyles.text}} onPress={onPress}>{this.props.localizedString.name} </Text>
        <Text>{strings.name} </Text>
      </View>
    )
  }
}

export withRtl(App)


```

### Using in Functional Component

```js
import React from "react";
import { View, Text } from "react-native";
import { useRtlContext } from "react-native-easy-localization-and-rtl";

export default function App() {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  return (
    <View style={{ ...RtlStyles.containerColumn }}>
      <Text
        style={{ ...this.props.RtlStyles.text }}
        onPress={() => {
          setLanguage("ar");
        }}
      >
        {strings.name}
      </Text>
    </View>
  );
}
```

## Available Style Object

**RtlStyles**
containerColumn
containerRow  
text
containerColumnInverse
containerRowInverse
textInverse
flipHorizontal

# APIs

## All Functions

### LocalizedStrings functions

**Note: Dont use setLanguage directly on localizedString object**

- setLanguage(languageCode) - to force manually a particular language
- getLanguage() - to get the current displayed language
- getInterfaceLanguage() - to get the current device interface language
- formatString() - to format the passed string replacing its placeholders with the other arguments strings
- setContent(languageObject) - overwrites the current language obj

**for further details visit https://github.com/stefalda/ReactNativeLocalization**

### RTL functions

- getSheet(LocalizedStrings) - get stylesheet for the current language
- isRTL(LocalizedStrings) - get RTL status : boolean

## Examples

### Format String Examples

```js
  en:{
    bread:"bread",
    butter:"butter",
    question:"I'd like {0} and {1}, or just {0}"
  }
  ...
  strings.formatString(strings.question, strings.bread, strings.butter)
```

### Overwrite Locale

You might have default localized in the build but then download the latest localization strings from a server. Use setContent to overwrite the whole object. NOTE that this will remove all other localizations if used.

```js
strings.setContent({
  en: {
    how: "How do you want your egg todajsie?",
    boiledEgg: "Boiled eggsie",
    softBoiledEgg: "Soft-boiled egg",
    choice: "How to choose the egg",
  },
});
```

You can also only overwrite a specific language using

```
strings.setContent(Object.assign({},strings.getContent(),
{
  en:{
    how:"How do you want your egg todajsie?",
    boiledEgg:"Boiled eggsie",
    softBoiledEgg:"Soft-boiled egg",
    choice:"How to choose the egg"
  }
}));
```

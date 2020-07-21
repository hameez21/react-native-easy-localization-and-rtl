# React Native Easy Localization and RTL

This library is for creating multi-Language supported apps easily on android and ios using react native.
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
import { LocalizedStrings, RTL } from "react-native-easy-localization-and-rtl";
```

```js
//Set your texts and translations here

const i18n = new LocalizedStrings({
  en: {
    Hello: 'Hello User',
    Desc: 'See how easy it is to implement localization and RTL Support',
  },
  ar: {
    Hello: 'مرحبًا بالمستخدم',
    Desc: 'شاهد مدى سهولة تنفيذ التوطين والدعم من اليمين إلى اليسار',
  },
  es: {
    Hello: 'Hola usuaria',
    Desc:
      'Vea lo fácil que es implementar la localización y el soporte de derecha a izquierda',
  },
});

//Set State is must to rerender UI for the change layout redux can also be used similarly
changeLanguage = (lang) => {
    i18n.setLanguage(lang);

    this.setState({lang});
  };

//redux action, sample code using thunk as middleware
export const setLanguage(lang) => {
return async dispatch => {
i18n.setLanguage(lang)
dispatch({
    type:SET_LANG
    payload:lang
})
}
}

render() {
    const RTLStyles = RTL.getSheet(i18n);
    return (
      <SafeAreaView>
        <View
          style={[{height: '100%', width: '100%'}, RTLStyles.containerColumn]}>
          <Text style={[{fontSize: 18}, RTLStyles.text]}>{i18n.Hello}</Text>

          <View
            style={{
              flex: 1,
              width: '50%',
              marginBottom: 20,
              backgroundColor: 'red',
            }}></View>
          <View
            style={{
              flex: 1,
              width: '50%',
              marginBottom: 20,
              backgroundColor: 'red',
            }}></View>
          <View
            style={{
              flex: 1,
              width: '50%',
              marginBottom: 20,
              backgroundColor: 'red',
            }}></View>
          <View
            style={{
              flex: 1,
              width: '50%',
              marginBottom: 20,
              backgroundColor: 'red',
            }}></View>
          <View
            style={[{width: '100%', height: '20%'}, RTLStyles.containerRow]}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: '100%',
                marginHorizontal: 8,
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.changeLanguage('en');
              }}>
              <Text>en</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                height: '100%',
                marginHorizontal: 8,
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.changeLanguage('ar');
              }}>
              <Text>ar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                marginHorizontal: 8,
                backgroundColor: 'green',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.changeLanguage('es');
              }}>
              <Text>es</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

```

# APIs

## All Functions

### LocalizedStrings functions

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
  i18n.formatString(strings.question, strings.bread, strings.butter)
```

### Overwrite Locale

You might have default localized in the build but then download the latest localization strings from a server. Use setContent to overwrite the whole object. NOTE that this will remove all other localizations if used.

```js
i18n.setContent({
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
i18n.setContent(Object.assign({},strings.getContent(),
{
  en:{
    how:"How do you want your egg todajsie?",
    boiledEgg:"Boiled eggsie",
    softBoiledEgg:"Soft-boiled egg",
    choice:"How to choose the egg"
  }
}));
```

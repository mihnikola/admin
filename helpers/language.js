import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLanguageValue = async () => {
  try {
    return await AsyncStorage.getItem("languageValue");
  } catch (e) {
    // error reading value
  }
};

export const setLanguageValue = async (value) => {
  try {
    return await AsyncStorage.setItem("languageValue", value);
  } catch (e) {
    // saving error
  }
};

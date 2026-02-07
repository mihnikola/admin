import AsyncStorage from "@react-native-async-storage/async-storage";

export const getExpoTokenStorage = async () => {
  try {
    return await AsyncStorage.getItem("tokenExpo");
  } catch (e) {
    // error reading value
  }
};
export const saveExpoTokenStorage = async (value) => {
  try {
    return await AsyncStorage.setItem("tokenExpo", value);
  } catch (e) {
    // saving error
  }
};
export const removeExpoTokenStorage = async () => {
  try {
    return await AsyncStorage.removeItem("tokenExpo");
  } catch (e) {
    // saving error
  }
};

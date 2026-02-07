import AsyncStorage from "@react-native-async-storage/async-storage";

export const getInitialToken = async () => {
  try {
    return await AsyncStorage.getItem("initialToken");
  } catch (e) {
    // geting error
  }
};
export const storeInitialToken = async (value) => {
  try {
    return await AsyncStorage.setItem("initialToken", value);
  } catch (e) {
    // saving error
  }
};

export const removeInitialToken = async () => {
  try {
    await AsyncStorage.removeItem("initialToken");
  } catch (e) {
    // saving error
  }
};

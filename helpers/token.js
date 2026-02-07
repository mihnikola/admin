import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorage = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (e) {
    // error reading value
  }
};
export const saveStorage = async (value) => {
  try {
    return await AsyncStorage.setItem("token", value);
  } catch (e) {
    // saving error
  }
};

export const removeStorage = async () => {
  try {
    return await AsyncStorage.removeItem("token");
  } catch (e) {
    // saving error
  }
};

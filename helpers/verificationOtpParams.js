import AsyncStorage from "@react-native-async-storage/async-storage";

export const getOtpParamsStorage = async () => {
  try {
    return await AsyncStorage.getItem("otpParams");
  } catch (e) {
    // error reading value
  }
};
export const saveOtpParamsStorage = async (value) => {
    console.log("saveOtpParamsStorage++",value)
  try {
    return await AsyncStorage.setItem("otpParams", JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const removeOtpParamsStorage = async () => {
  try {
    return await AsyncStorage.removeItem("otpParams");
  } catch (e) {
    // saving error
  }
};

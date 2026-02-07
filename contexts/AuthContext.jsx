import { get, getData, post } from "@/api/apiService";
import { getStorage, removeStorage, saveStorage } from "@/helpers/token";
import { removeOtpParamsStorage, saveOtpParamsStorage } from "@/helpers/verificationOtpParams";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import NotificationService from "@/services/NotificationService";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalization } from "./LocalizationContext";


// Create the context with a default value of false
export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [initialToken, setInitialToken] = useState(null);
  const [isToken, setIsToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessage, setIsMessage] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [verificationData, setVerificationData] = useState(null);

  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const { localization } = useLocalization();

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get(`/users/${isToken}`);
      if (response.status === 200) {
        setUserData(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setError(localization.SERVER_RESPONSE.error);
      }
      setIsLoading(false);
    }
  };
  const getTokenData = async () => {
    setIsLoading(true);
    await getStorage().then((res) => {
      if (res) {
        setIsToken(res);
      } else {
        setIsToken(null);
      }
      setIsLoading(false);
    });
  };



  const removeTokenData = async () => {
    await removeStorage().then((res) => {
      if (res) {
        setIsToken(null);
      }
    });
  };

  const logoutHandler = async () => {
    console.log("logoutHandler prvo");

    try {
      //ovde mora da se obrise iz collection firebase njegov token
      const x = await removeStorage();
      setIsMessage(false);
      setIsToken(null);
      setIsLoading(false);
      router.push('/(z_auth)');
    } catch (error) {
      setError(error);
    }
  };


  const logoutFirebase = async () => {
    console.log("logoutFirebase prvo");
    setIsLoading(true);
    await removeOtpParamsStorage();
    try {
      if (isToken) {
        console.log("logoutFirebase++ pre poziva");

        const response = await post("admin/users/logout", { token: isToken });
        console.log("logoutFirebase++", response);
        if (response.status === 200) {
          logoutHandler();
        }
      } else {
        console.log("nema tokena");
      }
    } catch (error) {

      setError(error);
    }
  };

  const onPressHandler = (data) => {
    if (data === "1") {
      router.push("/(tabs)/(04_settings)/infoUserProfile");
    }
    if (data === "2") {
      router.push("/(tabs)/(04_settings)/languageChange");
    }
    if (data === "100") {
      router.push("/(tabs)/(04_settings)/infoApp");
    }
    if (data === "200") {
      router.push("/(tabs)/(04_settings)/infoPrivacy");
    }
    if (data === "900") {
      router.push("/(tabs)/(04_settings)/infoHelpCenter");
    }
    if (data === "6") {
      setIsMessage(true);
    }
  };
  useEffect(() => {
    getInitialTokenData();
    getTokenData();
  }, []);

  //initial Token screen
  const addInitialTokenData = async () => {
    const valueToStore = { name: "John Doe", age: 30 };
    await AsyncStorage.setItem("initialToken", JSON.stringify(valueToStore));
    setInitialToken(valueToStore);
  };
  const getInitialTokenData = async () => {
    await AsyncStorage.getItem("initialToken").then((res) => {
      if (res) {
        setInitialToken(res);
      }
      setIsLoading(false);
    });
  };


  const verificationOTPCode = async () => {
    setIsLoading(true);
    const { email, password } = verificationData;
    console.log("verificationOTPCode sendOTPviaLogin", email, password)
    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email },
      });

      console.log("verificationOTPCode+++", response)
      if (response.status === 200) {
        await saveOtpParamsStorage(verificationData);
        setIsLoading(false);
        setIsMessage(false);
        router.push("/(tabs)/(04_settings)/otpCode");

      }
      if (response.status === 500) {
        setIsLoading(false);
        setError(response.message);
      }
      if (response.status === 404) {
        setIsLoading(false);
        setError(response.message);
      }
    } catch (err) {
      setIsLoading(false);
      setError(localization.SERVER_RESPONSE.error);
    }
  };

  const loginAdmin = async (email, password) => {
    const expoToken = await NotificationService.getFCMToken();

    if (!email || !password) {
      setIsMessage(true);
      setError(localization.LOGIN.error);
      return;
    }
    setStatus(null);
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await post("/admin/users/login", { email, password, fcmToken: expoToken });
      console.log("responseData", responseData)
      if (responseData.status === 202) {
        setIsMessage(true);
        setError(localization.LOGIN.errorFields);
      }
      if (responseData.status === 606) {
        setIsMessage(true);
        setVerificationData({ email, password });
        setStatus(responseData.status);
        setMessage(localization.LOGIN.isVerified);
      }
      if (responseData.status === 200) {
        saveStorage(responseData.token);
        saveToken(responseData.userId, expoToken);
      }
    } catch (err) {
      console.log("errerrerrerr", err)

      // if (err.message.includes("404")) {
      //   setIsMessage(true);

      //   setError(localization.SERVER_RESPONSE.notFound);
      // } else {
      //   setIsMessage(true);

      //   setError(localization.SERVER_RESPONSE.error);
      // }
      // setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const saveToken = async (userId, expoToken) => {
    if (!expoToken) {
      setIsLoading(false);
      return;
    }
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
      });
      console.log("saveToken", responseData)
      if (responseData.status === 200) {
        setIsMessage(true);
        setSuccess(localization.LOGIN.success);

      } else {
        setIsMessage(true);
        setError(
          `${localization.LOGIN.errorToken} ${responseData?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.log("saveToken err", err)
      setIsMessage(true);

      setError(`${localization.LOGIN.errorToken} ${err.message || err}`);
    } finally {
      await getTokenData();

    }
  };
  const removeInitialTokenData = async () => {
    await AsyncStorage.removeItem("initialToken");
  }
  return (
    <AuthContext.Provider
      value={{
        getInitialTokenData,
        removeInitialTokenData,
        addInitialTokenData,
        initialToken,
        isLoading,
        getTokenData,
        removeTokenData,
        isToken,
        logoutFirebase,
        onPressHandler,
        setIsMessage,
        isMessage,
        userData,
        fetchUserData,
        error,
        loginAdmin,
        success,
        status,
        verificationOTPCode,
        message,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

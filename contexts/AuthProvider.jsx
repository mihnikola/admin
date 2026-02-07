import { createContext, useContext, useEffect, useState } from "react";
import { post } from "../api/apiService";
import {
  getExpoTokenStorage,
  getStorage,
  removeStorage
} from "./../helpers/index";

// Create the context with a default value of false
export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [isToken, setIsToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessage, setIsMessage] = useState(false);

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);

  //   const fetchUserData = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await get(`/users/${isToken}`);
  //       if (response.status === 200) {
  //         setUserData(response.data);
  //         setIsLoading(false);
  //       }
  //     } catch (err) {
  //       if (err.message.includes("404")) {
  //         setError(`Not found endpoint`);
  //       } else {
  //         setError(`Something Went Wrong, Please Try Again`);
  //       }
  //       setIsLoading(false);
  //     }
  //   };
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
    try {
      const x = await removeStorage();
      setIsMessage(false);
      setIsToken(null);
      setIsLoading(false);
    } catch (error) {
      console.error("logoutHandler error ", error);
    }
  };

  useEffect(() => {
    getTokenData();
  }, []);

  const saveToken = async (userId) => {
    setIsLoading(true);
    const expoToken = await getExpoTokenStorage();

    if (!expoToken) {
      setIsLoading(false);
      return;
    }

    try {
      const responseData = await post("admin/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
      });
      if (responseData.status === 200) {
        setIsLoading(false);
        setIsMessage(true);
        setSuccess("Login Successful!");
      } else {
        setIsLoading(false);
        setIsMessage(true);

        setError(
          `Failed to save token: ${responseData?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setIsLoading(false);
      setIsMessage(true);

      setError(`Error saving token: ${err.message || err}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        getTokenData,
        removeTokenData,
        isToken,
        setIsMessage,
        isMessage,
        error,
        login,
        logoutHandler,
        success,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

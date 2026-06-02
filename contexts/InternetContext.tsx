import { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const InternetContext = createContext(true);

export function InternetProvider({ children }) {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {

    // 1️⃣ odmah pri startu aplikacije — jednom proveri internet
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected === true);
    });

    // 2️⃣ prijavi se na real-time promene interneta
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected === true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <InternetContext.Provider value={isConnected}>
      {children}
    </InternetContext.Provider>
  );
}

export function useInternetStatus() {
  return useContext(InternetContext);
}

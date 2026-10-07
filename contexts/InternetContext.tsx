import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

// Tip za Context stanje
interface InternetContextType {
  isConnected: boolean;          // Povezan na WiFi/Mobile
  isInternetReachable: boolean;  // Imas stvarni prolaz na internet
  isOnline: boolean;             // isConnected && isInternetReachable
  checkConnection: () => Promise<boolean>; // Ručna provera na zahtev
}

const InternetContext = createContext<InternetContextType>({
  isConnected: true,
  isInternetReachable: true,
  isOnline: true,
  checkConnection: async () => true,
});

export function InternetProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState({
    isConnected: true,
    isInternetReachable: true,
  });

  // Pomoćna funkcija za obradu NetInfo stanja
  const handleNetInfoChange = (state: NetInfoState) => {
    setStatus({
      // Ako je isConnected null/undefined, tretiramo kao false
      isConnected: Boolean(state.isConnected),
      // isInternetReachable može biti null dok traje provera. 
      // U tom slučaju se oslanjamo na isConnected da ne blokiramo UI odmah.
      isInternetReachable: state.isInternetReachable ?? Boolean(state.isConnected),
    });
  };

  useEffect(() => {
    // 1️⃣ Inicijalna provera na startu
    NetInfo.fetch().then(handleNetInfoChange);

    // 2️⃣ Slušanje promena u realnom vremenu
    const unsubscribe = NetInfo.addEventListener(handleNetInfoChange);

    return () => unsubscribe();
  }, []);

  // 3️⃣ Proaktivna brza provera (korisno pre slanja rezervacija/formi)
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const state = await NetInfo.fetch();
      if (!state.isConnected) return false;

      // Brzi ping (timeout 3s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch("https://clients3.google.com/generate_204", {
        method: "HEAD",
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);
      const hasAccess = response.status === 204 || response.ok;
      
      setStatus({
        isConnected: true,
        isInternetReachable: hasAccess,
      });

      return hasAccess;
    } catch {
      setStatus((prev) => ({ ...prev, isInternetReachable: false }));
      return false;
    }
  }, []);

  const isOnline = status.isConnected && status.isInternetReachable;

  return (
    <InternetContext.Provider
      value={{
        isConnected: status.isConnected,
        isInternetReachable: status.isInternetReachable,
        isOnline,
        checkConnection,
      }}
    >
      {children}
    </InternetContext.Provider>
  );
}

export function useInternetStatus() {
  return useContext(InternetContext);
}
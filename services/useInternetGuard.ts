import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export default function useInternetGuard() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // 1. Inicijalna provera pri montiranju hook-a
    NetInfo.fetch().then((state) => {
      const hasAccess = Boolean(state.isConnected && (state.isInternetReachable ?? true));
      setIsOnline(hasAccess);
    });

    // 2. Pretplata na promene mreže u realnom vremenu
    const unsubscribe = NetInfo.addEventListener((state) => {
      // isInternetReachable može biti null dok traju inicijalna testiranja.
      // U tom slučaju se privremeno oslanjamo na isConnected.
      const hasAccess = Boolean(state.isConnected && (state.isInternetReachable ?? true));
      setIsOnline(hasAccess);
    });

    return () => unsubscribe();
  }, []);

  return isOnline;
}
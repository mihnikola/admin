import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import NotificationService from "./NotificationService";

export default function useNotifications() {
  const router = useRouter();
  const segments = useSegments();
  const isRouterReady = segments.length > 0; 

  
  useEffect(() => {
    if (!isRouterReady) return;


    const onClick = (data?: any) => {
      if (!data?.url) return;
     
      router.push({
        pathname: "/(reservation_notification)/",
        params: {
          itemId: data?.url,
          notification: 1,
        },
      });
    };

    NotificationService.initializeListeners(onClick);

    return () => {
      NotificationService.cleanup();
    };
  }, [isRouterReady]);
}

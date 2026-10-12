// import { useRouter, useSegments } from "expo-router";
// import { useEffect } from "react";
// import NotificationService from "./NotificationService";
// import { useAuth } from "@/contexts/AuthContext";

// export default function useNotifications() {
//   const router = useRouter();
//   const segments = useSegments();
//   const isRouterReady = segments.length > 0;
//   const { isToken } = useAuth();

//   useEffect(() => {
//     if (!isRouterReady) return;

//     const onClick = (data?: any) => {
//       if (!data?.url) return;

//       router.push({
//         pathname: "/(reservation_notification)/",
//         params: {
//           itemId: data.url,
//           notification: 1,
//         },
//       });
//     };

//     if (isToken) {
//       NotificationService.initializeListeners(onClick);

//       return () => {
//         NotificationService.cleanup();
//       };
//     }
//   }, [isRouterReady, isToken]);
// }



import { useRouter, useSegments } from "expo-router";
import { useEffect, useRef } from "react";
import NotificationService from "./NotificationService";
import { useAuth } from "@/contexts/AuthContext";

export default function useNotifications() {
  const router = useRouter();
  const segments = useSegments();
  const isRouterReady = segments.length > 0;
  const { isToken } = useAuth();

  // Flag da sprečimo duplu navigaciju u kratkom roku
  const isNavigating = useRef(false);

  useEffect(() => {
    if (!isRouterReady) return;

    const onClick = (data?: any) => {
      if (!data?.url) return;

      // Ako je navigacija već u toku, ignoriši ovaj klik
      if (isNavigating.current) return;
      isNavigating.current = true;

      router.push({
        pathname: "/(reservation_notification)/",
        params: {
          itemId: data.url,
          notification: 1,
        },
      });

      // Otključavamo ponovo nakon 1 sekunde
      setTimeout(() => {
        isNavigating.current = false;
      }, 1000);
    };

    if (isToken) {
      NotificationService.initializeListeners(onClick);

      return () => {
        NotificationService.cleanup();
      };
    }
  }, [isRouterReady, isToken]);
}
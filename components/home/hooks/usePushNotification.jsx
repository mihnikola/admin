// import { saveExpoTokenStorage } from "@/helpers/expoToken";
// import Constants from "expo-constants";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import { router } from "expo-router";
// import { useCallback, useEffect } from "react";
// import { Platform } from "react-native";

// export function usePushNotifications() {
//   const redirectReservation = useCallback((response) => {
//     // Your existing redirect logic
//     const reservationIdValue =
//       response?.notification?.request?.content?.data?.url;

//     if (reservationIdValue) {
//       router.push({
//         pathname: "/(tabs)/(03_calendar)/cancelReservation",
//         params: {
//           itemId: reservationIdValue,
//           check: true,
//           pushNotification: true,
//         },
//       });
//     }
//   }, []);

//   // This is the function we will expose
//   const registerForPushNotifications = useCallback(async () => {
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     if (!Device.isDevice) {
//       alert("Must use physical device for Push Notifications");
//       return;
//     }

//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     // if (finalStatus !== "granted") {
//     //     alert("Permission not granted to get push token!");
//     //     return;
//     // }

//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ??
//       Constants?.easConfig?.projectId;

//     if (!projectId) {
//       alert("Project ID not found");
//       return;
//     }

//     try {
//       // const token = await Notifications.getDevicePushTokenAsync({ projectId });
//       const token = await Notifications.getDevicePushTokenAsync();
//       if (token) {
//         console.log("saveExpoTokenStorage",token)
//         saveExpoTokenStorage(token?.data);
//       }
//     } catch (e) {
//       alert(`Error getting push token: ${e}`);
//     }
//   }, []);

//   useEffect(() => {
//     Notifications.getLastNotificationResponseAsync().then((response) => {
//       if (response) {
//         redirectReservation(response);
//       }
//     });

//     const notificationListener =
//       Notifications.addNotificationReceivedListener(redirectReservation);
//     const responseListener =
//       Notifications.addNotificationResponseReceivedListener(
//         redirectReservation
//       );

//     return () => {
//       notificationListener.remove();
//       responseListener.remove();
//     };
//   }, [redirectReservation]);

//   return { registerForPushNotifications };
// }

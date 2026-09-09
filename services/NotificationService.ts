// import { put } from "@/api/apiService";
// import {
//   deleteToken,
//   getInitialNotification,
//   getMessaging,
//   getToken,
//   onMessage,
//   onNotificationOpenedApp,
//   onTokenRefresh,
// } from "@react-native-firebase/messaging";
// import * as Notifications from "expo-notifications";

// export class NotificationService {
//   deviceToken: string = "";
//   subscriptions: Array<() => void> = [];
//   hasReceivedForeground = false;
//   hasHandledInitial = false; // ⚡ Ključni flag – sprečava pogrešne triggere

//   constructor() {
//     this.setForegroundHandler();
//   }

//   setForegroundHandler() {
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });
//   }

//   async requestPermission() {
//     const { status } = await Notifications.requestPermissionsAsync();
//     return status === "granted";
//   }

//   async getFCMToken() {
//     const messaging = getMessaging();

//     try {
//       await deleteToken(messaging);

//       console.log("🗑️ Stari FCM token obrisan");

//       const newToken = await getToken(messaging);

//       console.log("🆕 NOVI FCM TOKEN:", newToken);

//       return newToken;
//     } catch (error) {
//       console.log("❌ FCM regenerate error:", error);
//     }
//   }

//   // FOREGROUND
//   listenToForegroundMessages() {
//     const unsub = onMessage(getMessaging(), async (remoteMessage) => {
//       console.log("📩 Foreground FCM received:", remoteMessage);

//       const title =
//         remoteMessage.notification?.title ||
//         remoteMessage.data?.title ||
//         "Nova poruka";
//       const body =
//         remoteMessage.notification?.body || remoteMessage.data?.body || "";

//       // ⚡ OVDE UZIMAŠ DATA IZ FIREBASE PORUKE
//       // const dataValue = remoteMessage.data || { url: "6a8b7583864824feca583510" };
//       const dataValue = remoteMessage.data;
//       // const dataValue = { url: "6a8b7583864824feca583510" };

//       try {
//         await Notifications.scheduleNotificationAsync({
//           content: {
//             title: title,
//             body: body,
//             data: dataValue, // ⚡ OVDE PROSLEĐUJEŠ DATA U LOKALNU NOTIFIKACIJU
//           },
//           trigger: null,
//         });

//         this.hasReceivedForeground = true;
//       } catch (error) {
//         console.log(
//           "Error scheduling local notification in foreground:",
//           error,
//         );
//       }
//     });

//     this.subscriptions.push(unsub);
//   }

//   // KILLED STATE — SAMO JEDNOM
//   async handleKilledState(callback: (data: any) => void) {
//     if (this.hasHandledInitial) return;

//     const initial = await getInitialNotification(getMessaging());
//     if (initial?.data) {
//       console.log("🚀 App opened from KILLED:", initial.data);
//       this.hasHandledInitial = true;
//       callback(initial.data);
//     }
//   }

//   // BACKGROUND STATE
//   listenToBackgroundOpens(callback: (data: any) => void) {
//     const unsub = onNotificationOpenedApp(getMessaging(), (msg) => {
//       if (!msg?.data) return;

//       // Firebase GARANTUJE: ovo se okida SAMO iz BACKGROUNDA
//       console.log("📨 App opened from BACKGROUND:", msg.data);

//       callback(msg.data);
//     });

//     this.subscriptions.push(unsub);
//   }

//   listenToTokenRefresh() {
//     const messaging = getMessaging();

//     const unsub = onTokenRefresh(messaging, async (token) => {
//       console.log("🔄 Novi FCM token:", token);

//       this.deviceToken = token;

//       try {
//         const responseData = await put("/admin/users/upgradeToken", {
//           tokenData: token,
//         });

//         console.log("Novi FCM token response ", responseData);
//       } catch (err) {
//         console.log("Greška pri čuvanju novog tokena:", err);
//       }
//     });

//     this.subscriptions.push(unsub);
//   }

//   initializeListeners(onClick: (data?: any) => void) {
//     // 1) Permissions + token

//     this.requestPermission();
//     // 2) Prvo postavi refresh listener
//     this.listenToTokenRefresh();

//     // 3) Onda uzmi trenutni token
//     this.getFCMToken();

//     // 2) KILLED state
//     this.handleKilledState(onClick);

//     // 3) BACKGROUND state (ne meša se sa killed!)
//     this.listenToBackgroundOpens(onClick);

//     // 4) FOREGROUND FCM → lokalne notifikacije
//     this.listenToForegroundMessages();

//     // 5) CLICK NA LOKALNU notifikaciju
//     const clickListener = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         if (!this.hasReceivedForeground) return;

//         const data = response.notification.request.content.data;
//         console.log("👉 Foreground notification clicked:", data);

//         onClick(data);
//         this.hasReceivedForeground = false;
//       },
//     );

//     this.subscriptions.push(() => clickListener.remove());
//   }

//   cleanup() {
//     this.subscriptions.forEach((u) => {
//       try {
//         u();
//       } catch {}
//     });
//     this.subscriptions = [];
//   }
// }

// export default new NotificationService();





import { put } from "@/api/apiService";
import {
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
} from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

export class NotificationService {
  deviceToken: string = "";
  subscriptions: Array<() => void> = [];
  hasReceivedForeground = false;
  hasHandledInitial = false;

  constructor() {
    this.setForegroundHandler();
  }

  setForegroundHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }

  async requestPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }

  async getFCMToken() {
    const messaging = getMessaging();

    try {
      // Nema potrebe za deleteToken svaki put
      const newToken = await getToken(messaging);
      console.log("🆕 FCM TOKEN:", newToken);
      this.deviceToken = newToken;
      return newToken;
    } catch (error) {
      console.log("❌ FCM get error:", error);
    }
  }

  // FOREGROUND
  listenToForegroundMessages() {
    const unsub = onMessage(getMessaging(), async (remoteMessage) => {
      console.log("📩 Foreground FCM received:", remoteMessage);

      const title =
        remoteMessage.notification?.title ||
        remoteMessage.data?.title ||
        "Nova poruka";
      const body =
        remoteMessage.notification?.body || remoteMessage.data?.body || "";
      const dataValue = remoteMessage.data;

      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: body,
            data: dataValue,
          },
          trigger: null,
        });

        this.hasReceivedForeground = true;
      } catch (error) {
        console.log("Error scheduling local notification in foreground:", error);
      }
    });

    this.subscriptions.push(unsub);
  }

  // KILLED STATE
  async handleKilledState(callback?: (data: any) => void) {
    if (this.hasHandledInitial) return;

    const initial = await getInitialNotification(getMessaging());
    if (initial?.data) {
      console.log("🚀 App opened from KILLED:", initial.data);
      this.hasHandledInitial = true;
      if (typeof callback === "function") {
        callback(initial.data);
      }
    }
  }

  // BACKGROUND STATE
  listenToBackgroundOpens(callback?: (data: any) => void) {
    const unsub = onNotificationOpenedApp(getMessaging(), (msg) => {
      if (!msg?.data) return;

      console.log("📨 App opened from BACKGROUND:", msg.data);

      // PROVERA DA LI JE CALLBACK DEFINISAN SPREČAVA CRASH
      if (typeof callback === "function") {
        callback(msg.data);
      } else {
        console.warn("⚠️ Callback for background open is not provided!");
      }
    });

    this.subscriptions.push(unsub);
  }

  listenToTokenRefresh() {
    const messaging = getMessaging();

    const unsub = onTokenRefresh(messaging, async (token) => {
      console.log("🔄 Novi FCM token:", token);
      this.deviceToken = token;

      try {
        await put("/admin/users/upgradeToken", { tokenData: token });
      } catch (err) {
        console.log("Greška pri čuvanju novog tokena:", err);
      }
    });

    this.subscriptions.push(unsub);
  }

  initializeListeners(onClick?: (data?: any) => void) {
    this.requestPermission();
    this.listenToTokenRefresh();
    this.getFCMToken();

    // Registracija klikova sa bezbednom proverom callback-a
    this.handleKilledState(onClick);
    this.listenToBackgroundOpens(onClick);
    this.listenToForegroundMessages();

    // CLICK NA LOKALNU (FOREGROUND) NOTIFIKACIJU
    const clickListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (!this.hasReceivedForeground) return;

        const data = response.notification.request.content.data;
        console.log("👉 Foreground notification clicked:", data);

        if (typeof onClick === "function") {
          onClick(data);
        }
        this.hasReceivedForeground = false;
      }
    );

    this.subscriptions.push(() => clickListener.remove());
  }

  cleanup() {
    this.subscriptions.forEach((u) => {
      try {
        u();
      } catch {}
    });
    this.subscriptions = [];
  }
}

export default new NotificationService();

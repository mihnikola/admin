
import { getInitialNotification, getMessaging, getToken, onMessage, onNotificationOpenedApp } from '@react-native-firebase/messaging';
import * as Notifications from "expo-notifications";


export class NotificationService {
  deviceToken: string = "";
  subscriptions: Array<() => void> = [];
  hasReceivedForeground = false;
  hasHandledInitial = false; // ⚡ Ključni flag – sprečava pogrešne triggere

  
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
    if (this.deviceToken) return this.deviceToken;

    try {
      // const token = await messaging().getToken();
      const token = await getToken(getMessaging());

      if (token) {
        this.deviceToken = token;
        // setTimeout(async () => {
          // console.log("token getToken",token)
          // await saveExpoTokenStorage(token);
        // }, 1000);
     
      }
    } catch (err) {
      console.log("Error getting FCM token", err);
    }

    return this.deviceToken;
  }

  // FOREGROUND
  listenToForegroundMessages() {
    const unsub = onMessage(getMessaging(),async (remoteMessage) => {
      console.log("📩 Foreground FCM:", remoteMessage);

      await Notifications.scheduleNotificationAsync({
        content: {
          title:
            remoteMessage.notification?.title ??
            remoteMessage.data?.title ??
            "Notification",
          body:
            remoteMessage.notification?.body ??
            remoteMessage.data?.body ??
            "",
          data: remoteMessage.data,
        },
        trigger: null,
      });

      this.hasReceivedForeground = true;
    });

    this.subscriptions.push(unsub);
  }

  // KILLED STATE — SAMO JEDNOM
  async handleKilledState(callback: (data: any) => void) {
    if (this.hasHandledInitial) return;

    const initial = await getInitialNotification(getMessaging());
    if (initial?.data) {
      console.log("🚀 App opened from KILLED:", initial.data);
      this.hasHandledInitial = true;
      callback(initial.data);
    }
  }

  // BACKGROUND STATE
  listenToBackgroundOpens(callback: (data: any) => void) {
    const unsub = onNotificationOpenedApp(getMessaging(),(msg) => {
      if (!msg?.data) return;

      // Firebase GARANTUJE: ovo se okida SAMO iz BACKGROUNDA
      console.log("📨 App opened from BACKGROUND:", msg.data);

      callback(msg.data);
    });

    this.subscriptions.push(unsub);
  }

  initializeListeners(onClick: (data?: any) => void) {
    // 1) Permissions + token

    this.requestPermission();
    this.getFCMToken();

    // 2) KILLED state
    this.handleKilledState(onClick);

    // 3) BACKGROUND state (ne meša se sa killed!)
    this.listenToBackgroundOpens(onClick);

    // 4) FOREGROUND FCM → lokalne notifikacije
    this.listenToForegroundMessages();

    // 5) CLICK NA LOKALNU notifikaciju
    const clickListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (!this.hasReceivedForeground) return;

        const data = response.notification.request.content.data;
        console.log("👉 Foreground notification clicked:", data);

        onClick(data);
        this.hasReceivedForeground = false;
      }
    );

    this.subscriptions.push(() => clickListener.remove());

    // 6) Token refresh
    // this.listenToTokenRefresh();
  }

  // listenToTokenRefresh() {
  //   const unsub = messaging().onTokenRefresh((token) => {
  //     setTimeout(async () => {
  //       await saveExpoTokenStorage(token);
  //     }, 1000);

  //     this.deviceToken = token;
  //     console.log("🔄 New FCM token:", token);
  //   });

  //   this.subscriptions.push(unsub);
  // }

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

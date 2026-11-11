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
        shouldShowBanner: true,
        shouldShowList: true,
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


  listenToForegroundMessages() {
    const unsub = onMessage(getMessaging(), async (remoteMessage) => {
      console.log("📩 Foreground FCM:", remoteMessage);

      // Izvlačimo naslov i tekst bilo da su u 'notification' ili 'data' bloku
      const title =
        remoteMessage.notification?.title ||
        remoteMessage.data?.title ||
        "Notification";

      const body =
        remoteMessage.notification?.body ||
        remoteMessage.data?.body ||
        "";
      if (!title || !body) {
        console.log("⚠️ Ignorišem notifikaciju jer nema ni naslova ni teksta.");
        return;
      }
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: body,
            data: remoteMessage.data,
            // sound: "default",
          },
          trigger: null,
        });
        this.hasReceivedForeground = true;

        console.log("✅ Lokalna foreground notifikacija uspešno prikazana!");
      } catch (error) {
        console.log("❌ Greška pri prikazivanju foreground notifikacije:", error);
      }
    });

    this.subscriptions.push(unsub);
  }




  // KILLED STATE — SAMO JEDNOM
  async handleKilledState(callback: (data: any) => void) {
    if (this.hasHandledInitial) return;

    const initial = await getInitialNotification(getMessaging());
    if (initial?.data && initial.data.url) {
      console.log(
        "🚀 App opened from KILLED sa validnim podacima:",
        initial.data,
      );
      this.hasHandledInitial = true;
      callback(initial.data);
    } else {
      this.hasHandledInitial = true; // Obeleži kao rešeno čak i ako je prazno
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

  async initializeListeners(onClick: (data?: any) => void) {
    // this.requestPermission();
    const permissionGranted = await this.requestPermission();
    if (!permissionGranted) return;
    await this.getFCMToken();
    // this.listenToTokenRefresh();

    this.handleKilledState(onClick);
    this.listenToBackgroundOpens(onClick);
    this.listenToForegroundMessages();
    //ovo si obrisao
    // CLICK NA LOKALNU (FOREGROUND) NOTIFIKACIJU
    const clickListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (!this.hasReceivedForeground) return;

        const data = response.notification.request.content.data;
        console.log("👉 Foreground notification clicked:", data);
        onClick(data);
        this.hasReceivedForeground = false;

      },
    );

    this.subscriptions.push(() => clickListener.remove());
  }

  cleanup() {
    this.subscriptions.forEach((u) => {
      try {
        u();
      } catch { }
    });
    this.subscriptions = [];
  }
}

export default new NotificationService();

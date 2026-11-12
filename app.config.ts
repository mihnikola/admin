import { ExpoConfig, ConfigContext } from "@expo/config";

<<<<<<< HEAD
const APP_VERSION = '1.1.6';
=======
const APP_VERSION = '1.1.5';
>>>>>>> 8409d2eeaa4639611b5871a0a02bda3aa83ffe03

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Barber Admin",
  slug: "fta-barber-admin-app",
  version: APP_VERSION,
  orientation: "portrait",
  icon: "./assets/images/admin.png",
  scheme: "adminbarberdemo",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "fta.admin.app",
    googleServicesFile:
      process.env.GOOGLE_SERVICES_PLIST || "./firebase/GoogleService-Info.plist",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON || "./firebase/google-services.json",
    package: "fta.admin.app",
  },
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/messaging",
    "expo-router",
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/admin.png",
        "resizeMode": "contain",
        "backgroundColor": "#000000",
        "dark": {
          "backgroundColor": "#000000",
          "image": "./assets/images/admin.png",
        },
        "imageWidth": 200,

      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          // Firebase Apple SDK is SPM-only. Static frameworks embed a copy of
          // those packages in each RNFB pod and fail pod install with duplicate symbols.
          useFrameworks: "dynamic",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: "fcd5681e-4fac-41b4-9334-d272ee972954",
    },
    API_KEY_MAP: "AIzaSyD5_HYUYyAb5m7n4bih0WSKyQCYsBOAK9w",
  },
  owner: "fusion-tech-agency",
  updates: {
    url: "https://u.expo.dev/fcd5681e-4fac-41b4-9334-d272ee972954",
  },
  runtimeVersion: APP_VERSION,
});

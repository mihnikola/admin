import { ExpoConfig, ConfigContext } from "@expo/config";

const APP_VERSION = '1.0.7'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Barber Admin",
  slug: "fta-barber-admin-app",
  version: APP_VERSION,
  orientation: "portrait",
  icon: "./assets/images/admin.png",
  scheme: "adminbarberdemo",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/admin.png",
    backgroundColor: "#000000",
  },
  newArchEnabled: true,
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
        image: "./assets/images/admin.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
          forceStaticLinking: ["RNFBApp", "RNFBMessaging"],
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

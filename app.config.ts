import { ExpoConfig, ConfigContext } from "@expo/config";

const APP_VERSION = "1.0.3";
const BRAND_BACKGROUND_COLOR = "#6e412a"; // Unificirana boja pozadine salona

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "fta-barber-admin-app",
  slug: "fta-barber-admin-app",
  version: APP_VERSION,
  orientation: "portrait",
  icon: "./assets/images/logoFrizer.png",
  scheme: "adminbarberdemo",
  
  // 1. ZAKLJUČAVANJE LIGHT MODA (Sprečava OS da ubacuje crnu temu)
  userInterfaceStyle: "light",
  backgroundColor: BRAND_BACKGROUND_COLOR,

  splash: {
    image: "./assets/images/logoFrizer.png",
    resizeMode: "contain",
    backgroundColor: BRAND_BACKGROUND_COLOR,
  },
  newArchEnabled: true,
  
  ios: {
    supportsTablet: true,
    userInterfaceStyle: "light",
    backgroundColor: BRAND_BACKGROUND_COLOR,
  },
  
  android: {
    userInterfaceStyle: "light",
    backgroundColor: BRAND_BACKGROUND_COLOR, // Natativni Android background pri preusmeravanjima
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
        image: "./assets/images/logoFrizer.png",
        imageWidth: 200,
        resizeMode: "contain",
        // 2. UNIFICIRANA POZADINA ZA SPLASH (Uklonjen 'dark' blok koji je izazivao konflikt)
        backgroundColor: BRAND_BACKGROUND_COLOR,
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
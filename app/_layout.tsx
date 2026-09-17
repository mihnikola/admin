import AppInitialized from "@/components/wrapper/AppInitialized";
import NoInternetModal from "@/shared-components/InternetModal";
import useInternetGuard from "@/services/useInternetGuard";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ColorsBarber } from "@/constants/Colors";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";

// SplashScreen.preventAutoHideAsync();

const BarberTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: ColorsBarber.light.background,
  },
};

export default function RootLayout() {
  const isConnected = useInternetGuard();
  const [loaded, error] = useFonts({
    "OldStandard-Regular": require("@/assets/fonts/OldStandardTT-Regular.ttf"),
    "OldStandard-Bold": require("@/assets/fonts/OldStandardTT-Bold.ttf"),
    "OldStandard-Italic": require("@/assets/fonts/OldStandardTT-Italic.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }
  return (
    <ThemeProvider value={BarberTheme}>
      <AppInitialized>
        <NoInternetModal visible={!isConnected} />

        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: ColorsBarber.light.background,
            },
            contentStyle: {
              backgroundColor: ColorsBarber.light.background, // Fiksira pozadinu celog Stack-a
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "",
              headerShown: false,
              headerStyle: {
                backgroundColor: ColorsBarber.light.background,
              },
              animation: "none",
            }}
          />
          <Stack.Screen
            name="introScreen"
            options={{
              title: "",
              headerShown: true,
              headerStyle: {
                backgroundColor: ColorsBarber.light.background,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="(tabs)"
            options={{
              title: "",
              headerShown: false,
              animation: "none", // Onemogućava crni blic tokom preusmeravanja na tabove
            }}
          />
          <Stack.Screen
            name="(z_auth)"
            options={{
              title: "",
              headerShown: false,
            }}
          />
        </Stack>
      </AppInitialized>
    </ThemeProvider>
  );
}

import AppInitialized from "@/components/wrapper/AppInitialized";
import NoInternetModal from "@/shared-components/InternetModal";
import useInternetGuard from "@/services/useInternetGuard";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isConnected = useInternetGuard();

  return (
    <AppInitialized>
      <NoInternetModal visible={!isConnected} />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{ title: "", headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="introScreen"
          options={{
            title: "",
            headerShown: true,
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            title: "",
            headerShown: false,
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
  );
}

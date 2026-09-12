import { Stack } from "expo-router";
import { ColorsBarber } from "@/constants/Colors";
export default function RootLayoutHome() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="calendar"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="locations"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: ColorsBarber.light.background,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="requirements"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function RootLayoutHome() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="calendar"
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
        name="locations"
        options={{
          title: "",
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

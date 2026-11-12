import {  Stack } from "expo-router";

export default function RootLayoutBarbers() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen name="clients" options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="client"
        options={{
          title: "",
          headerShown: false,

        }}
      />
    </Stack>
  );
}

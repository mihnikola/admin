import { Stack } from "expo-router";

export default function RootLayoutAddReservation() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="addServiceItem"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="confirmReservation"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}

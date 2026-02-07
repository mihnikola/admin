import { Stack } from "expo-router";

export default function RootLayoutReservationNotification() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

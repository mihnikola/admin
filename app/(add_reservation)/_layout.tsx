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
    </Stack>
  );
}

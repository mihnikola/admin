import { Stack } from "expo-router";

const headerOptions = {
  headerShown: true,
  title: "",
  headerStyle: {
    backgroundColor: "black",
  },
  headerTintColor: "white",
};

export default function RootLayoutBarbers() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="changeLanguage" options={headerOptions} />
      <Stack.Screen name="managerReservation" options={headerOptions} />
      <Stack.Screen name="serviceManager" options={headerOptions} />
      <Stack.Screen name="locationManager" options={headerOptions} />
      <Stack.Screen name="absentManager" options={headerOptions} />
      <Stack.Screen name="timeManagement" options={headerOptions} />
      <Stack.Screen name="locationManagement" options={headerOptions} />
      <Stack.Screen name="addServices" options={headerOptions} />
      <Stack.Screen name="addBarbers" options={headerOptions} />
      <Stack.Screen name="barbers" options={headerOptions} />
      <Stack.Screen name="barbersLocations" options={headerOptions} />
      <Stack.Screen name="barbersServices" options={headerOptions} />
      <Stack.Screen name="locationBarbers" options={headerOptions} />
      <Stack.Screen name="servicesBarbers" options={headerOptions} />
      <Stack.Screen name="addLocation" options={headerOptions} />
    </Stack>
  );
}

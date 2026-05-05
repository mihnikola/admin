import { Stack } from "expo-router";

const headerOptions = {
  headerShown: true,
  title: "",
  headerStyle: {
    backgroundColor: "black",
  },
  headerTintColor: "white",
};
const headerOptionsFalse = {
  headerShown: false,
};

export default function RootLayoutBarbers() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="changeLanguage" options={headerOptions} />
      <Stack.Screen name="managerReservation" options={headerOptions} />

      <Stack.Screen name="serviceManager" options={headerOptionsFalse} />
      <Stack.Screen name="locationManager" options={headerOptionsFalse} />

      <Stack.Screen name="absentManager" options={headerOptions} />
      <Stack.Screen name="timeManagement" options={headerOptions} />

      <Stack.Screen name="locationManagement" options={headerOptionsFalse} />

      <Stack.Screen name="addServices" options={headerOptions} />
      <Stack.Screen name="addBarbers" options={headerOptions} />
      <Stack.Screen name="barbers" options={headerOptionsFalse} />
      <Stack.Screen name="barbersLocations" options={headerOptionsFalse} />
      <Stack.Screen name="barbersServices" options={headerOptionsFalse} />
      <Stack.Screen name="locationBarbers" options={headerOptionsFalse} />
      <Stack.Screen name="servicesBarbers" options={headerOptionsFalse} />
      <Stack.Screen name="addLocation" options={headerOptions} />
    </Stack>
  );
}

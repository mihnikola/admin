import { ColorsBarber } from "@/constants/Colors";
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
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: ColorsBarber.light.background, // Fiksira pozadinu same tranzicije
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="changeLanguage" options={headerOptionsFalse} />
      <Stack.Screen name="managerReservation" options={headerOptionsFalse} />

      <Stack.Screen name="serviceManager" options={headerOptionsFalse} />
      <Stack.Screen name="locationManager" options={headerOptionsFalse} />

      <Stack.Screen name="absentManager" options={headerOptionsFalse} />
      <Stack.Screen name="absenceManagerList" options={headerOptionsFalse} />
      <Stack.Screen name="timeManagement" options={headerOptionsFalse} />

      <Stack.Screen name="locationManagement" options={headerOptionsFalse} />

      <Stack.Screen name="addServices" options={headerOptionsFalse} />
      <Stack.Screen name="addBarbers" options={headerOptionsFalse} />
      <Stack.Screen name="barbers" options={headerOptionsFalse} />
      <Stack.Screen name="barbersLocations" options={headerOptionsFalse} />
      <Stack.Screen name="barbersServices" options={headerOptionsFalse} />
      <Stack.Screen name="locationBarbers" options={headerOptionsFalse} />
      <Stack.Screen name="servicesBarbers" options={headerOptionsFalse} />
      <Stack.Screen name="addLocation" options={headerOptionsFalse} />
      <Stack.Screen name="addCategory" options={headerOptionsFalse} />
      <Stack.Screen name="getCategories" options={headerOptionsFalse} />
    </Stack>
  );
}

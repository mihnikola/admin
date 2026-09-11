import { ColorsBarber } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function RootLayoutBarbers() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen name="clients" options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="client"
        options={{
          title: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: ColorsBarber.light.background,
          },
          headerTintColor: ColorsBarber.light.textColor,
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack>
  );
}
function CustomBackButton() {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color={ColorsBarber.light.textColor} />
    </TouchableOpacity>
  );
}

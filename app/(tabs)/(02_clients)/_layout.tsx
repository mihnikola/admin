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
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack>
  );
}
function CustomBackButton() {
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ paddingLeft: 5 }}>
      <View style={{ marginTop: 50 }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );
}

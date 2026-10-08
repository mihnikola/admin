import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ColorsBarber } from "@/constants/Colors";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SplashScreen, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  const { localization } = useLocalization();
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: ColorsBarber.dark.textColor,
          tabBarInactiveTintColor: ColorsBarber.dark.inActiveTextColor,
          tabBarStyle: {
            backgroundColor: ColorsBarber.dark.background,
          },
          tabBarLabelStyle: {
            fontFamily: "OldStandard-Regular",
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="(01_home)"
          options={{
            title: localization.TABS.HOME,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                size={28}
                name="home"
                color={
                  focused
                    ? ColorsBarber.dark.textColor
                    : ColorsBarber.dark.inActiveTextColor
                }
              />
            ),
          }}
        />

        <Tabs.Screen
          name="(02_clients)"
          options={{
            title: localization.TABS.CLIENTS,

            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                size={28}
                name="group" // Fix za iOS (umesto settings.fill)
                color={
                  focused
                    ? ColorsBarber.dark.textColor
                    : ColorsBarber.dark.inActiveTextColor
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(03_settings)"
          options={{
            title: localization.TABS.SETTINGS,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                size={28}
                name="settings" // Fix za iOS (umesto settings.fill)
                color={
                  focused
                    ? ColorsBarber.dark.textColor
                    : ColorsBarber.dark.inActiveTextColor
                }
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
});

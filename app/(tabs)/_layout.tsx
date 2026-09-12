import { IconSymbol } from "@/components/ui/IconSymbol";
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
        tabBarActiveTintColor: ColorsBarber.light.textColor,
        tabBarInactiveTintColor: ColorsBarber.light.inActiveTextColor,
        tabBarStyle: {
          backgroundColor: ColorsBarber.light.background,
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
            <IconSymbol
              size={28}
              name="house.fill"
              color={
                focused
                  ? ColorsBarber.light.textColor
                  : ColorsBarber.light.inActiveTextColor
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
            <IconSymbol
              size={28}
              name="group.fill"
              color={
                focused
                  ? ColorsBarber.light.textColor
                  : ColorsBarber.light.inActiveTextColor
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
            <IconSymbol
              size={28}
              name={"settings.fill"} // Menja ikonicu na osnovu fokusa
              color={
                focused
                  ? ColorsBarber.light.textColor
                  : ColorsBarber.light.inActiveTextColor
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
    backgroundColor: ColorsBarber.light.background,
  },
});
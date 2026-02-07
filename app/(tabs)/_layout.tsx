import { IconSymbol } from "@/components/ui/IconSymbol";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Tabs } from "expo-router";
import React from "react";


export default function TabLayout() {
    const { localization } = useLocalization();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black", // Set the background color to black
        },
      }}
    >
      <Tabs.Screen
        name="(01_home)"
        options={{
          title: localization.TABS.HOME,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(02_clients)"
        options={{
          title: localization.TABS.CLIENTS,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="group.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(03_settings)"
        options={{
          title: localization.TABS.SETTINGS,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="settings.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

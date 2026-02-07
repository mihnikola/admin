import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useRootNavigationState } from "expo-router";
import React, { useEffect } from "react";
import { Image, View } from "react-native";

const SplashScreen = () => {
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return; // 🚨 wait until router is ready

    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      router.replace(token ? "/(tabs)/(01_home)" : "/(z_auth)");
    };

    checkToken();
  }, [navigationState]);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("@/assets/images/admin.png")}
        style={{ resizeMode: "contain", width: 500 }}
      />
    </View>
  );
};

export default SplashScreen;

import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";

import getStartedIcon from "@/assets/images/arrowImg.png";
import { useLocalization } from "@/contexts/LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const CustomButton = ({ flatListRef, flatListIndex, dataLength }) => {
  const { localization } = useLocalization();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });
  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          AsyncStorage.setItem("initialToken", "true");
          router.replace("(tabs)");
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          {localization.HOME.startBtn}
        </Animated.Text>
        <Animated.Image
          source={getStartedIcon}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    width: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    position: "absolute",
  },
});
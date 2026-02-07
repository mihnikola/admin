// /hooks/useSlideAnimations.js
import { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export function useSlideAnimations() {
  const slideAnim = useRef(new Animated.Value(-height)).current;
  const slideAnimBook = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnimBook, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 400);
  }, [slideAnim, slideAnimBook]);

  return { slideAnim, slideAnimBook };
}
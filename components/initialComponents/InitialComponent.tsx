import React, { useEffect } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../Custom/Custom";
import Pagination from "../Pagination/Pagination";
import useInitialData from "./useInitialData";

const InitialComponent = () => {
  const { getInitialData, initialData } = useInitialData();

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef(null);
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  useEffect(() => {
    getInitialData();
  }, []);




  const onViewableItemsChanged = ({ viewableItems }) => {
    if (
      viewableItems[0]?.index === 0 ||
      viewableItems[0]?.index > 0 ||
      viewableItems[0]?.index < 3
    ) {
      flatListIndex.value = viewableItems[0]?.index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({ item, index }) => {
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP
      );
      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH * 1.1,
        height: SCREEN_WIDTH * 1.1,
        borderRadius: 50,
        transform: [{ translateY: translateYAnimation }],
      };
    });
    const textAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP
      );

      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
      };
    });
    return (
      <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
        <Animated.Image
          source={{ uri: item.image }}
          style={imageAnimationStyle}
        />
        <Animated.View style={textAnimationStyle}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
        </Animated.View>
      </View>
    );
  };



  if (initialData?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.FlatList
          ref={flatListRef}
          onScroll={onScroll}
          data={initialData}
          renderItem={({ item, index }) => {
            return <RenderItem item={item} index={index} />;
          }}
          keyExtractor={(item) => item._id}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 300,
            viewAreaCoveragePercentThreshold: 10,
          }}
        />
        <View style={styles.bottomContainer}>
          <Pagination data={initialData} x={x} screenWidth={SCREEN_WIDTH} />
          <CustomButton
            flatListRef={flatListRef}
            flatListIndex={flatListIndex}
            dataLength={initialData?.length}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default InitialComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  itemContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  itemTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  itemText: {
    textAlign: "center",
    marginHorizontal: 35,
    color: "white",
    lineHeight: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
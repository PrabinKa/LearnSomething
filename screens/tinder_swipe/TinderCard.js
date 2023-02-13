import { View, Text, Image, Dimensions, Animated } from "react-native";
import React, { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import TinderChoice from "./TinderChoice";

const { height, width } = Dimensions.get("window");

const TinderCard = ({ item, isFirst, index, swipe, ...rest }) => {
  //   console.warn(swipe)

  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg']
  })

  const loveOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const hateOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const reactSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: "absolute",
            left: 10,
            top: 20,
            opacity: loveOpacity,
            transform: [{ rotate: "-30deg" }],
          }}
        >
          <TinderChoice title={"Love"} />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            right: 10,
            top: 20,
            opacity: hateOpacity,
            transform: [{ rotate: "30deg" }],
          }}
        >
          <TinderChoice title={"Hate"} />
        </Animated.View>
      </>
    );
  }, [swipe, isFirst]);
  return (
    <Animated.View
      key={index}
      style={[
        {
          position: "absolute",
          top: 30,
          width: width * 0.9,
          height: height * 0.7,
          alignSelf: "center",
          borderRadius: 10,
        },
        isFirst && { transform: [...swipe.getTranslateTransform(), {rotate: rotate}] },
      ]}
      {...rest}
    >
      <Image
        source={item.image}
        style={{ height: "100%", width: "100%", borderRadius: 10 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.5)"]}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            position: "absolute",
            right: 20,
            bottom: 20,
            color: "white",
            fontSize: 30,
            fontWeight: "400",
          }}
        >
          {item.title}
        </Text>
      </LinearGradient>
      {isFirst && reactSelection()}
    </Animated.View>
  );
};

export default TinderCard;

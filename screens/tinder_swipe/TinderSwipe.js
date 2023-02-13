import {
  View,
  Text,
  StatusBar,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { tinderData } from "../../constants/Constants";
import TinderCard from "./TinderCard";

const TinderSwipe = () => {
  const [data, setData] = useState(tinderData);

  useEffect(() => {
    if (!data.length) {
      setData(tinderData);
    }
  }, [data]);

  const swipe = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => {
      // console.warn("dx" + dx + "dy" + dy);
      swipe.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      // console.warn("release:" + "dx" + dx + "dy" + dy)
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;

      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: { x: 500 * dx, y: dy },
          useNativeDriver: true,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeCard = useCallback(() => {
    setData((prev) => prev.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleReact = useCallback(
    (direction) => {
      Animated.timing(swipe, {
        toValue: { x: direction * 500, y: 0 },
        useNativeDriver: true,
      }).start(removeCard);
    },
    [removeCard]
  );
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {data
        .map((item, index) => {
          let isFirst = index === 0;
          let dragHandler = isFirst ? panResponder.panHandlers : {};
          return (
            <TinderCard
              item={item}
              index={index}
              isFirst={isFirst}
              swipe={swipe}
              {...dragHandler}
            />
          );
        })
        .reverse()}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          height: 100,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleReact(1)}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            elevation: 5,
          }}
        >
          <Image
            source={require("../../assets/heart.png")}
            style={{ height: 40, width: 40, tintColor: "#FF033E" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReact(-1)}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            elevation: 5,
          }}
        >
          <Image
            source={require("../../assets/close.png")}
            style={{ height: 30, width: 30, tintColor: "#000" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TinderSwipe;

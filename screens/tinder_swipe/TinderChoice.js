import { View, Text } from "react-native";
import React from "react";

const TinderChoice = ({ title }) => {
  return (
    <View
      style={{
        borderColor: title == "Love" ? "#FF033E" : "#000",
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 3,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "400",
          color: title == "Love" ? "#FF033E" : "#000",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default TinderChoice;

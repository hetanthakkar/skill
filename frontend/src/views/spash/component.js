import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useFonts,
  PermanentMarker_400Regular,
} from "@expo-google-fonts/permanent-marker";

import { screenHeight } from "../../helpers";

const CarItem = (props) => {
  let [fontLoaded] = useFonts({
    PermanentMarker_400Regular,
  });

  if (fontLoaded) {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../../assets/splash.png")}
      >
        <Text
          style={{
            marginTop: screenHeight * 40,
            textAlign: "center",
            fontSize: 45,
            fontFamily: "PermanentMarker_400Regular",
          }}
        >
          Skillify
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login Screen")}
          style={{
            backgroundColor: "#171A20CC",
            padding: 12,
            // height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "75%",
            width: "70%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: "500",
              textTransform: "uppercase",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Signup")}
          style={{
            backgroundColor: "#171A20CC",
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "7%",
            width: "70%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "500",
              textTransform: "uppercase",
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  } else {
    return <View></View>;
  }
};

export default CarItem;

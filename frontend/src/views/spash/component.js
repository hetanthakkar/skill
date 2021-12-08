import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./style";

const CarItem = (props) => {
  return (
    <ScrollView style={styles.carContainer}>
      <ImageBackground
        source={require("../../../assets/spash.jpeg")}
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Login Screen")}
        style={{
          backgroundColor: "#171A20CC",
          padding: 12,
          // height: 40,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "180%",
          width: "75%",
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
          marginTop: "5%",
          width: "75%",
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
    </ScrollView>
  );
};

export default CarItem;

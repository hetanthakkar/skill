import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/MaterialIcons";
import { screenHeight } from "../../helpers/dimensions";
import styles from "./styles";
const App = () => {
  const [height, setHeight] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme == "dark" ? "#141519" : "white",
      }}
    >
      <TouchableOpacity style={{ marginTop: screenHeight * 2 }}>
        <UserAvatar
          bgColor="#F0F0F0"
          name="Hetan Thakkar"
          size={100}
          textColor="#F04E99"
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: -20,
          alignSelf: "center",
          marginLeft: -60,
          backgroundColor: "white",
          borderRadius: 8,
          padding: 5,
        }}
      >
        <View style={{ flexDirection: "row", padding: 4 }}>
          <Icon
            size={15}
            style={{ marginRight: 2 }}
            name="edit"
            color="black"
          />
          <Text style={{ fontWeight: "bold", fontSize: 13, color: "black" }}>
            Edit
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "700",
          fontSize: 16,
          marginTop: screenHeight * 1,
          color: theme == "dark" ? "white" : "black",
        }}
      >
        Hetan Thakkar
      </Text>

      <View style={styles.modalView}>
        <Icon
          size={40}
          // style={{ alignSelf: "center" }}
          color="#4630EB"
          name="location-on"
        />
        <Text style={styles.modalTextTitle}>
          Device Location is not enabled
        </Text>
        <Text style={styles.modalTextSubtitle}>
          Please enable device location.It help us serve better by using your
          acurate address
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              size={15}
              style={{ marginRight: 7 }}
              color="grey"
              name="my-location"
            />
            <Text style={styles.textStyle1}>Enable Device Location</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              size={15}
              style={{ marginRight: 5 }}
              color="grey"
              name="search"
            />
            <Text style={styles.textStyle1}>Enter Location Manually</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholderTextColor="#69707D"
        placeholder="Enter about yourself !!"
        onContentSizeChange={(event) => {
          setHeight(event.nativeEvent.contentSize.height);
        }}
        multiline={true}
        style={{
          backgroundColor: "white",
          fontSize: 22,
          borderWidth: 2,
          width: "80%",
          alignSelf: "center",
          // marginLeft: '4%',
          marginTop: screenHeight * 1,
          borderRadius: 10,
          padding: 12,
          height: Math.max(screenHeight * 12, height),
        }}
        maxLength={80}
      />
      <TouchableOpacity style={styles.submit}>
        <Text style={styles.submitText}>Start Learning!</Text>
      </TouchableOpacity>
    </View>
  );
};
export default App;

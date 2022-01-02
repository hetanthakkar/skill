import React, { Component } from "react";
import { changeTheme, addInfo } from "../../actions";
import {
  View,
  Text,
  BackHandler,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import Icon from "./icons";
import * as Font from "expo-font";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
const mainColor = "#045DE9";
const { width } = Dimensions.get("window");
var screenHeight = Math.round(Dimensions.get("window").height) / 100;
var screenWidth = Math.round(Dimensions.get("window").width) / 100;

class Home extends React.Component {
  state = {
    size: { width, height: 150 },
    fontsLoaded: false,
  };
  loadFonts() {
    return Font.loadAsync({
      "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    });
  }

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    await this.loadFonts();
    await this.setState({ fontsLoaded: true });
    const token = await AsyncStorage.getItem("token");
    // console.log("tokeeen is", token);
    fetch("http://192.168.2.4:3000/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((result) => result.json())
      .then(async (data) => {
        await this.props.saveInfo(data);
      })
      .catch((err) => console.log(err));
  };
  handleBackButton = () => {
    this.props.navigation.navigate("Signup");
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaView
          key={this.props.user}
          style={{
            flex: 1,
            backgroundColor: "#141519",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: this.props.theme == "dark" ? "#141519" : "white",
            }}
          >
            <View
              style={[
                styles.headerContainer,
                {
                  backgroundColor:
                    this.props.theme == "dark" ? "#141519" : "white",
                },
              ]}
            >
              <View style={[styles.userImg]}>
                <Image
                  style={styles.imgSty}
                  source={{ uri: this.props.user.profilePhoto }}
                />
              </View>
              <View
                style={{
                  padding: 10,
                  marginTop: screenHeight * 2,
                  marginLeft: screenWidth * 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: this.props.theme == "light" ? "#141519" : "#F1EEFc",
                    fontWeight: "bold",
                  }}
                >
                  {this.props.user.name}
                </Text>
                <Text
                  style={{
                    color: this.props.theme == "light" ? "#141519" : "#F1EEFc",
                    fontFamily: "Poppins-bold",
                    marginTop: screenHeight * 1,
                    fontSize: 18,
                    opacity: 0.85,
                  }}
                >
                  {this.props.user.email}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins-bold",
                    color: this.props.theme == "light" ? "#141519" : "white",
                    marginTop: screenHeight * 1,
                    fontSize: 16,
                    opacity: 0.8,
                  }}
                >
                  Role: {this.props.user.role}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.transferbox,
                {
                  backgroundColor:
                    this.props.theme == "dark" ? "#1E1E1E" : "white",
                  shadowColor:
                    this.props.theme == "dark" ? "lightgrey" : "black",
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                }}
              >
                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Map")}
                  >
                    <LinearGradient
                      colors={["#09C6F9", "#045DE9"]}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradsty}
                    >
                      <View style={{ padding: 5, alignItems: "center" }}>
                        <View style={styles.transfer}>
                          <Icon family="FontAwesome" name="group" size={20} />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        flexWrap: "wrap",
                        textAlign: "center",
                        alignSelf: "center",
                        paddingTop: 10,
                        fontSize: 12,
                        fontFamily: "Poppins-Medium",
                        color:
                          this.props.theme == "light" ? "#141519" : "white",
                      }}
                    >
                      Discuss
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Chat")}
                  >
                    <LinearGradient
                      colors={["#09C6F9", "#045DE9"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradsty}
                    >
                      <View style={{ padding: 5, alignItems: "center" }}>
                        <View style={styles.transfer}>
                          <Icon
                            family="MaterialIcons"
                            name="meeting-room"
                            size={23}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        textAlign: "center",
                        paddingTop: 10,
                        fontSize: 14,
                        fontFamily: "Poppins-Medium",
                        color:
                          this.props.theme == "light" ? "#141519" : "white",
                      }}
                    >
                      Rooms
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={async () => {
                      this.props.navigation.navigate("ChatList");
                    }}
                  >
                    <LinearGradient
                      colors={["#09C6F9", "#045DE9"]}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradsty}
                    >
                      <View style={{ padding: 5, alignItems: "center" }}>
                        <View style={styles.transfer}>
                          <Icon
                            family="MaterialIcons"
                            name="chat-bubble-outline"
                            size={22}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        flexWrap: "wrap",
                        textAlign: "center",
                        alignSelf: "center",
                        paddingTop: 10,
                        fontSize: 14,
                        fontFamily: "Poppins-Medium",
                        color:
                          this.props.theme == "light" ? "#141519" : "white",
                      }}
                    >
                      Chats
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Map")}
                  >
                    <LinearGradient
                      colors={["#09C6F9", "#045DE9"]}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradsty}
                    >
                      <View style={{ padding: 5, alignItems: "center" }}>
                        <View style={styles.transfer}>
                          <Icon
                            family="Ionicons"
                            name="md-map-sharp"
                            size={20}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        flexWrap: "wrap",
                        textAlign: "center",
                        alignSelf: "center",
                        paddingTop: 10,
                        fontSize: 12,
                        fontFamily: "Poppins-Medium",
                        color:
                          this.props.theme == "light" ? "#141519" : "white",
                      }}
                    >
                      Nearby
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                marginTop: 12,
                flexWrap: "wrap",
                backgroundColor:
                  this.props.theme == "dark" ? "#141519" : "white",
              }}
            >
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="Fontisto"
                      name="react"
                      size={20}
                      color={this.props.theme == "dark" ? "#045DE9" : "#045DE9"}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Coding
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="Fontisto"
                      name="angularjs"
                      size={20}
                      color="#045DE9"
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Digital Marketing
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="Fontisto"
                      name="vuejs"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Music
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="Fontisto"
                      name="java"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Singing
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="Fontisto"
                      name="python"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Designing
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="MaterialCommunityIcons"
                      name="language-kotlin"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Photography
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="FontAwesome"
                      name="html5"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Academics
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="MaterialCommunityIcons"
                      name="language-javascript"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Language
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="MaterialCommunityIcons"
                      name="language-php"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Painting
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="Fontisto"
                      name="nodejs"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Cooking
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="Fontisto"
                      name="unity"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Designing
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="MaterialCommunityIcons"
                      name="robot"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    ML/AI
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="MaterialCommunityIcons"
                      name="language-swift"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Buisness
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shoppingbody}>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "white",
                        borderRadius: 20,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Icon
                      family="MaterialCommunityIcons"
                      name="dots-horizontal"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 13,
                      color: this.props.theme == "light" ? "#141519" : "white",
                    }}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return <View></View>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.themeReducer.theme,
    user: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (value) => dispatch(changeTheme(value)),
    saveInfo: (value) => dispatch(addInfo(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

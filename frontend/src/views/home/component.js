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
    fetch("http://192.168.2.6:3000/getUser", {
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
        console.log("data is fuck", data);
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
            backgroundColor: "white",
            flexDirection: "row",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <ScrollView
            style={{
              backgroundColor: this.props.theme == "dark" ? "#141519" : "white",
            }}
          >
            <LinearGradient
              colors={
                this.props.theme == "dark"
                  ? ["#141519", "#141519"]
                  : ["white", "white"]
              }
              style={styles.linerSty}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}
                style={{
                  flex: 1,
                  marginTop: screenHeight * 5,
                  marginLeft: screenWidth * 2,
                  //   marginRight: "6%",
                }}
              >
                {/*Donute Button Image */}
              </TouchableOpacity>

              <View style={styles.headerContainer}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.userImg}>
                    <Image
                      style={styles.imgSty}
                      source={{ uri: this.props.user.profilePhoto }}
                    />
                  </View>

                  <View
                    style={{
                      padding: 10,
                      marginLeft: "4%",
                      marginTop: screenHeight * 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color:
                          this.props.theme == "light" ? "#141519" : "#F1EEFc",
                        fontWeight: "bold",
                      }}
                    >
                      {this.props.user.name}
                    </Text>
                    <Text
                      style={{
                        color:
                          this.props.theme == "light" ? "#141519" : "#F1EEFc",
                        fontFamily: "Poppins-bold",
                        marginTop: screenHeight * 1,
                        fontSize: 18,
                      }}
                    >
                      {this.props.user.email}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins-bold",
                        color:
                          this.props.theme == "light" ? "#141519" : "white",
                        marginTop: screenHeight * 1,
                        fontSize: 16,
                      }}
                    >
                      Role: {this.props.user.role}
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
            <View
              style={[
                styles.transferbox,
                {
                  backgroundColor:
                    this.props.theme == "dark" ? "#141519" : "white",
                  marginTop: -75,
                  borderColor:
                    this.props.theme == "light" ? "#141519" : "white",
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    flex: 0.25,
                    margin: 10,
                    marginLeft: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Linear1")}
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
                            family="MaterialCommunityIcons"
                            name="teach"
                            size={20}
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
                      Teach
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.25, margin: 10, marginLeft: 20 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Chat")}
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
                            family="FontAwesome5"
                            name="chalkboard-teacher"
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
                      Learn
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={async () => {
                      await AsyncStorage.removeItem("token");
                      this.props.navigation.navigate("Splash Screen");
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
                          <Icon family="AntDesign" name="wallet" size={22} />
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
                      Transactions
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
                          <Icon family="Feather" name="map" size={20} />
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
                      Around Me
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginTop: 15,
                flexWrap: "wrap",
                backgroundColor:
                  this.props.theme == "dark" ? "#141519" : "white",
              }}
            >
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialIcons"
                      name="code"
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
                    Coding
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="cash-multiple"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialIcons"
                      name="music-note"
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
                    Musical Instrument
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialIcons"
                      name="mic"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="FontAwesome"
                      name="edit"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="image"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="FontAwesome"
                      name="list-alt"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="translate"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="draw"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="chef-hat"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="FontAwesome"
                      name="edit"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="image"
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
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="currency-inr"
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
                  <View style={styles.shoppingtxt1}>
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

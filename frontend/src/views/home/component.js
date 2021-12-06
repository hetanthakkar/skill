import React, { Component } from "react";
import {
  View,
  Text,
  BackHandler,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import Icon from "./icons";
import * as Font from "expo-font";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
const mainColor = "#045DE9";
const bgcolor = "#F1EEFc";
const { width } = Dimensions.get("window");
var screenHeight = Math.round(Dimensions.get("window").height) / 100;
var screenWidth = Math.round(Dimensions.get("window").width) / 100;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: { width, height: 150 },
      fontsLoaded: false,
    };
  }

  loadFonts() {
    return Font.loadAsync({
      "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    });
  }
  _renderBannerItems(rowData) {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 5 }}
        onPress={() => this.props.navigation.navigate("Giftcard")}
      >
        <Image
          source={rowData.item.img}
          style={{ width: 350, height: 120, resizeMode: "stretch" }}
        />
      </TouchableOpacity>
    );
  }
  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    await this.loadFonts();
    this.setState({ fontsLoaded: true });
  }
  handleBackButton = () => {
    this.props.navigation.navigate("Signup");
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: bgcolor,
            flexDirection: "row",
            // marginTop: "20%",
          }}
        >
          <StatusBar animated={true} backgroundColor="#045DE9" hidden={false} />
          <ScrollView>
            <LinearGradient
              // colors={["#fc0f84", "#020cab"]}
              colors={["#09C6F9", "#045DE9"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
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
                      source={require("../../../assets/dp.jpeg")}
                    />
                  </View>

                  <View
                    style={{
                      padding: 10,
                      marginLeft: "4%",
                      marginTop: screenHeight * 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#FFF",
                        // fontFamily: "Poppins-Light",
                      }}
                    >
                      Hetan
                    </Text>
                    <Text style={{ color: "#FFF" }}>
                      hetanthakkar1@gmail.com
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 40 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Notifi")}
                  >
                    <Icon
                      family="FontAwesome"
                      name="bell-o"
                      size={23}
                      color="#FFF"
                    />
                    <Text style={styles.notifisty}>2</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            <View style={[styles.transferbox, { marginTop: -75 }]}>
              <View style={styles.balance}>
                <Text style={styles.curSty}>Current Balance</Text>
                <Text style={styles.balSty}>$ 1200</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <View style={{ flex: 0.25, margin: 10, marginLeft: 20 }}>
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
                    <Text style={styles.paytypesty}>Teach</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Settings")}
                  >
                    <LinearGradient
                      // colors={["#fc0f84", "#020cab"]}
                      colors={["#09C6F9", "#045DE9"]}
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
                    <Text style={styles.paytypesty}>Learn</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Transaction")
                    }
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
                    <Text style={styles.paytypesty}>Transaction</Text>
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
                    <Text style={styles.paytypesty}>Around Me</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                // flex: 1,
                marginVertical: 15,
                flexWrap: "wrap",
                // justifyContent: "space-evenly",
                // alignSelf: "center",
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
                  <Text style={styles.shoptxt}>Coding</Text>
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
                  <Text style={styles.shoptxt}>Digital Marketing</Text>
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
                  <Text style={styles.shoptxt}>Musical Instrument</Text>
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
                  <Text style={styles.shoptxt}>Singing</Text>
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
                  <Text style={styles.shoptxt}>Designing</Text>
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
                  <Text style={styles.shoptxt}>Photography</Text>
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
                  <Text style={styles.shoptxt}>Academics</Text>
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
                  <Text style={styles.shoptxt}>Language</Text>
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
                  <Text style={styles.shoptxt}>Painting</Text>
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
                  <Text style={styles.shoptxt}>Cooking</Text>
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
                  <Text style={styles.shoptxt}>Designing</Text>
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
                  <Text style={styles.shoptxt}>Photography</Text>
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
                  <Text style={styles.shoptxt}>Buisness</Text>
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
                  <Text style={styles.shoptxt}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    marginTop: -screenHeight * 33,
    // marginLeft: "3%",
    // // marginVertical: 1,
    marginLeft: screenWidth * 5,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
  },
  notifisty: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    fontSize: 8,
    textAlign: "center",
    width: 15,
    padding: 2,
    marginTop: -30,
    marginLeft: 10,
    margin: 5,
  },
  linerSty: {
    flex: 0.1,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    height: 180,
  },
  imgSty: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  userImg: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    borderColor: "#FFF",
    borderWidth: 3,
    marginLeft: screenWidth * -2.5,
    marginTop: screenHeight * 4,
    overflow: "hidden",
  },
  curSty: {
    color: "gray",
    // fontFamily: "Poppins-Medium",
  },
  balSty: {
    color: "#fcad50",
    // fontFamily: "Poppins-Bold",
    fontSize: 17,
  },
  balance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 10,
    padding: 10,
  },
  transfer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  gradsty: {
    borderRadius: 10,
    paddingVertical: 5,
  },
  paytypesty: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 10,
    color: "#000",
    // fontFamily: "Poppins-Medium",
  },
  transferbox: {
    flex: 0.2,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "lightgrey",
    shadowOffset: { width: -0.5, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  shoppingCotainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  shoppingbody: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
  },
  shoppingtxt: {
    backgroundColor: "#FFF",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
  },

  shoppingtxt1: {
    backgroundColor: "#FFF",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    marginRight: 15,
    marginLeft: 10,
  },
  shoptxt: {
    fontFamily: "Poppins-Regular",
    // marginLeft: 2,
    fontSize: 13,
  },
  notifiheader: {
    flex: 0.2,
    backgroundColor: "#fff",
    margin: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    elevation: 10,
    shadowColor: "lightgrey",
    shadowOffset: { width: -0.5, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  userimg: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../home";
import Settings from "../settings";
import Search from "../search";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

const App = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: props.theme == "dark" ? "white" : "black",
        tabBarInactiveTintColor: props.theme == "dark" ? "white" : "black",
        tabBarStyle: {
          borderTopWidth: 0.3,
          elevation: 0,
          borderTopRadius: 20,
          backgroundColor: props.theme == "dark" ? "#141519" : "white",
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={({ route }) => ({
          headerShown: false,
          headerTintColor: props.theme == "dark" ? "white" : "black",
          headerTitleStyle: { fontSize: 18, padding: 5 },
          headerStyle: {
            backgroundColor: props.theme == "dark" ? "#121419" : "white",
            borderBottomWidth: 0,
            elevation: 0,
          },
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => ({
          headerTitle: "Settings",
          headerTintColor: props.theme == "dark" ? "white" : "black",
          headerTitleStyle: { fontSize: 18, padding: 5 },
          headerStyle: {
            backgroundColor: props.theme == "dark" ? "#121419" : "white",
            borderBottomWidth: 0,
            elevation: 0,
          },
        })}
      />
    </Tab.Navigator>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(App);

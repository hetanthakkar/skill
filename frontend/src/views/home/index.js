import React from "react";
import { Provider } from "react-redux";
import Signup from "./component";
import ChatList from "../chatList";
import store from "../../store";
import Map from "../MapScreen";
import Splash from "../splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from "react-redux";

const Stack = createNativeStackNavigator();

const App = (props) => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{
            headerTintColor: props.theme == "dark" ? "white" : "black",
            headerStyle: {
              backgroundColor: props.theme == "dark" ? "#121419" : "white",
            },
          }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerTintColor: props.theme == "dark" ? "white" : "black",
            headerStyle: {
              backgroundColor: props.theme == "dark" ? "#121419" : "white",
            },
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerTintColor: props.theme == "dark" ? "white" : "black",
            headerStyle: {
              backgroundColor: props.theme == "dark" ? "#121419" : "white",
            },
          }}
        />
      </Stack.Navigator>
    </Provider>
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

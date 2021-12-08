import React from "react";
import { ActivityIndicator, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "./views/spash";
import Signup from "./views/signup";
import SignupCont from "./views/singupCont";
import SignupDetail from "./views/detailSignup";
import Home from "./views/home";
import Login from "./views/login";
import { View } from "react-native";
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

function App(props) {
  const [user, setUser] = React.useState(0);
  React.useEffect(async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);
    if (token) setUser(token);
    else setUser(-1);
  }, []);

  const renderScreens = () => {
    if (user !== 0 && user !== -1) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                title: "Step 3/3",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
            <Stack.Screen
              name="Splash Screen"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login Screen"
              component={Login}
              options={{
                headerShown: false,
                headerTintColor: "white",
                title: "Login Screen",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                title: "Step 1/3",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
            <Stack.Screen
              name="Signup Cont"
              component={SignupCont}
              options={{
                title: "Step 2/3",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
            <Stack.Screen
              name="Signup Detail"
              component={SignupDetail}
              options={{
                title: "Step 3/3",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (user === -1) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash Screen"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login Screen"
              component={Login}
              options={{
                headerTintColor: "white",
                title: "Login Screen",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                title: "Step 1/3",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
            <Stack.Screen
              name="Signup Cont"
              component={SignupCont}
              options={{
                title: "Step 2/3",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
            <Stack.Screen
              name="Signup Detail"
              component={SignupDetail}
              options={{
                title: "Step 3/3",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#141519" },
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                // title: "Step 3/3",
                // headerTintColor: "white",
                // headerStyle: { backgroundColor: "#141519" },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (user === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  };
  return (
    <View style={{ flex: 1 }} key={user}>
      {renderScreens()}
    </View>
  );
}

export default App;

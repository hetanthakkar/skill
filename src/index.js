import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./views/spash";
import Signup from "./views/signup";
import SignupCont from "./views/singupCont";
import SignupDetail from "./views/detailSignup";
import Home from "./views/home";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Splash Screen"
          component={Splash}
          options={{
            headerShown: false,
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
        />  */}
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

export default App;

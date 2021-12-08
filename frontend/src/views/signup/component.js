import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import TextInput from "../../component/input";
import { changeTheme } from "../../actions";
import Anim from "../../../assets/animation";
import { SocialIcon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import { nameRegex, mailRegex } from "../../helpers";
import { screenHeight, screenWidth } from "../../helpers";
import { isSmallDevice, isLargeIosDevice } from "../../helpers";
import styles from "./styles";

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "This field is required!";
  }
  if (!values.password) {
    errors.password = "This field is required!";
  }
  if (!mailRegex.test(values.email)) {
    errors.email = "Enter valid email address";
  }
  if (!nameRegex.test(values.name)) {
    errors.name = "Please fill the proper name";
  }
  if (values.password != undefined && values.password.length < 5) {
    errors.password = "Password should atleast have 5 characters";
  }
  return errors;
};

const myFields = ({
  label,
  theme,
  meta: { error, touched, dirty, visited, active },
  input: { onChange, ...restInput },
}) => {
  const icon = () => {
    if (!dirty && !visited) return "keyboard";
    if (error != undefined && touched) return "error";
    if (error == undefined) return "check";
    else return "keyboard";
  };
  const iconColor = () => {
    if (error != null && touched == true) return "red";
    if (error == undefined && visited) return "green";
    else return "white";
  };
  return (
    <TextInput
      containerWidth={screenWidth * 95}
      color={theme == "dark" ? "white" : "black"}
      error={error != null && touched == true ? error : null}
      secureTextEntry={label == "Password"}
      onChangeText={onChange}
      label={label}
      labelColor={theme == "dark" ? "white" : "black"}
      rightIcon={icon()}
      rightIconColor={iconColor()}
      rightIconSize={error != null && touched == true ? 23 : 20}
      rightIconType="materialicon"
      labelActiveColor={theme == "dark" ? "white" : "black"}
      {...restInput}
    />
  );
};

let Form = (props) => {
  const signInWithGoogleAsync = async () => {
    await Google.logInAsync({
      androidClientId:
        "943496437066-l8d6v20hh6ouj5d5pniet05q7pl4ceh9.apps.googleusercontent.com",
      iosClientId:
        "943496437066-sdrk3mek3l962grlk6i2d9jks7bkhl5h.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    }).then((result) => {
      fetch("http://192.168.2.6:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.givenName + " " + result.user.familyName,
          profilePhoto: result.user.photoUrl,
          password: result.idToken,
        }),
      })
        .then((result) => result.json())
        .then(async (data) => {
          if (data == "saved") {
            await AsyncStorage.setItem("token", result.idToken);
            props.navigation.navigate("Signup Cont");
          }
        })
        .catch((err) => console.log("errror is", err));
    });
  };
  const [scrollHeight, setScrollHeight] = React.useState(0);

  const submit = () => {
    props.navigation.navigate("Signup Cont");
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScrollHeight(contentHeight);
  };

  const getMarginTop = () => {
    const values = [props.email, props.name, props.password];
    const arr = values.map((value) => {
      return value ? 1 : 0;
    });
    const add = (accumulator, a) => {
      return accumulator + a;
    };
    const sum = arr.reduce(add, 0);

    switch (sum) {
      case 0: {
        if (isLargeIosDevice) {
          return screenHeight * 5;
        } else if (isSmallDevice) {
          return screenHeight * 5;
        } else return screenHeight * 5;
      }

      case 1: {
        if (isLargeIosDevice) {
          return screenHeight * 3;
        } else if (isSmallDevice) {
          return screenHeight * 5;
        } else return screenHeight * 8;
      }

      case 2: {
        if (isLargeIosDevice) {
          return screenHeight * 5;
        } else if (isSmallDevice) {
          return screenHeight * 5;
        } else return screenHeight * 5;
      }

      case 3: {
        if (isLargeIosDevice) {
          return screenHeight * 3;
        } else if (isSmallDevice) {
          return screenHeight * 4;
        } else return screenHeight * 3;
      }
    }
  };
  return (
    <ScrollView
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={scrollHeight > screenHeight * 100}
      style={
        props.theme.theme == "dark"
          ? { ...styles.mainView, backgroundColor: "#141519" }
          : styles.mainView
      }
    >
      <View style={styles.logoView}>
        <Anim height={260} width={240} />
      </View>

      <Text
        style={
          props.theme.theme == "dark"
            ? { ...styles.title, color: "#DFE5EF" }
            : styles.title
        }
      >
        Sign Up To Get Started
      </Text>
      <View style={styles.signinView}>
        <Text
          style={
            props.theme.theme == "dark"
              ? { ...styles.already, color: "white" }
              : styles.already
          }
        >
          Have an account?{" "}
        </Text>
        <Text style={styles.signinText} onPress={() => props.setTheme("light")}>
          Log in.
        </Text>
      </View>
      <Field
        name="name"
        component={myFields}
        label="Name"
        theme={props.theme.theme}
      />

      <Field
        name="email"
        component={myFields}
        label="Email "
        theme={props.theme.theme}
      />

      <Field
        name="password"
        component={myFields}
        label="Password"
        theme={props.theme.theme}
      />

      <TouchableOpacity
        style={{
          alignSelf: "center",
          borderRadius: 15,
          width: "85%",
          borderStyle: "solid",
          backgroundColor: "#045DE9",
          marginTop: getMarginTop(),
          padding: 4,
        }}
        onPress={props.handleSubmit(submit)}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={signInWithGoogleAsync}
        style={{
          width: screenWidth * 85,
          alignSelf: "center",
          // borderRadius: 4,
          marginTop: screenHeight * 3,
        }}
      >
        <SocialIcon
          title={"Sign In With Google"}
          button={true}
          type={"google"}
          style={{ borderRadius: 15 }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.themeReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (value) => dispatch(changeTheme(value)),
  };
};
Form = reduxForm({
  form: "signupform",
  destroyOnUnmount: false,
  validate,
})(Form);

const selector = formValueSelector("signupform");
Form = connect((state) => {
  const email = selector(state, "email");
  const password = selector(state, "password");
  const name = selector(state, "name");

  return {
    email,
    password,
    name,
  };
})(Form);
export default connect(mapStateToProps, mapDispatchToProps)(Form);

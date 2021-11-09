import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import TextInput from "../../component/input";
import { changeTheme } from "../../actions";
import Anim from "../../../assets/animation";
import { nameRegex, mailRegex } from "../../helpers";
import { screenHeight, screenWidth } from "../../helpers";
import { isSmallDevice, isLargeIosDevice } from "../../helpers";
import styles from "./style";

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "This field is required!";
  }
  if (!values.username) {
    errors.username = "This field is required!";
  }
  if (!values.password) {
    errors.password = "This field is required!";
  }
  if (!values.email) {
    errors.cpassword = "This field is required!";
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
    if (error == undefined) return "green";
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
  const [scrollHeight, setScrollHeight] = React.useState(0);

  const submit = () => {
    props.navigation.navigate("Signup Cont");
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScrollHeight(contentHeight);
  };

  const getMarginTop = () => {
    const values = [props.email, props.name, props.username, props.password];
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
          return screenHeight * 24;
        } else if (isSmallDevice) {
          return screenHeight * 10;
        } else return screenHeight * 20;
      }

      case 1: {
        if (isLargeIosDevice) {
          return screenHeight * 21;
        } else if (isSmallDevice) {
          return screenHeight * 8;
        } else return screenHeight * 16;
      }

      case 2: {
        if (isLargeIosDevice) {
          return screenHeight * 18;
        } else if (isSmallDevice) {
          return screenHeight * 6;
        } else return screenHeight * 12;
      }

      case 3: {
        if (isLargeIosDevice) {
          return screenHeight * 15;
        } else if (isSmallDevice) {
          return screenHeight * 4;
        } else return screenHeight * 8;
      }
      case 4: {
        if (isLargeIosDevice) {
          return screenHeight * 12;
        } else if (isSmallDevice) {
          return screenHeight * 2;
        } else return screenHeight * 4;
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
      <Field
        name="name"
        component={myFields}
        label="Name"
        theme={props.theme.theme}
      />

      <Field
        name="username"
        component={myFields}
        label="Username "
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
          borderRadius: 10,
          width: "85%",
          borderStyle: "solid",
          backgroundColor: "#4630EB",
          marginTop: getMarginTop(),
        }}
        onPress={props.handleSubmit(submit)}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.signinView}>
        <Text
          style={
            props.theme.theme == "dark"
              ? { ...styles.already, color: "white" }
              : styles.already
          }
        >
          Already have an account?
        </Text>
        <Text style={styles.signinText}> Signin</Text>
      </View>
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
  const username = selector(state, "username");
  const name = selector(state, "name");

  return {
    email,
    password,
    username,
    name,
  };
})(Form);
export default connect(mapStateToProps, mapDispatchToProps)(Form);

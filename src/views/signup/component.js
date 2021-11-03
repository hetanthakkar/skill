import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { changeTheme } from "../../actions";
import styles from "./style";
import { nameRegex, mailRegex } from "../../helpers/regex";
import { screenWidth } from "../../helpers/dimensions";
import TextInput from "../../component/input";

const height = Dimensions.get("window").height;

let email;
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
  meta: { error, touched, dirty, visited },
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
    <View style={styles.field}>
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
    </View>
  );
};
const App = (props) => {
  const [scrollHeight, setScrollHeight] = React.useState(0);

  const submit = () => {
    props.theme.theme == "light"
      ? props.setTheme({ theme: "dark" })
      : props.setTheme({ theme: "light" });
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScrollHeight(contentHeight);
  };

  return (
    <ScrollView
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={setScrollHeight > height}
      style={
        props.theme.theme == "dark"
          ? { ...styles.mainView, backgroundColor: "#141519" }
          : styles.mainView
      }
    >
      <View style={styles.logoView}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://raw.githubusercontent.com/react-ui-kit/dribbble2react/master/velocity/assets/images/icon.png",
          }}
        />
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
        autoFocus={true}
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
        style={styles.createAccount}
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
let ourform = reduxForm({
  form: "signupform",
  destroyOnUnmount: false,
  validate,
})(App);

const selector = formValueSelector("signupform");
ourform = connect((state) => {
  email = selector(state, "email");
  return {
    email,
  };
})(ourform);
export default connect(mapStateToProps, mapDispatchToProps)(ourform);

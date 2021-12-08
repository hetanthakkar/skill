import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers/dimensions";

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: screenHeight * 2,
    color: "black",
  },
  logo: {
    width: screenWidth * 10,
    height: screenHeight * 10,
  },
  mainView: {
    flex: 1,
  },
  logoView: {
    marginTop: screenHeight * 2,
    alignSelf: "center",
    flexDirection: "row",
  },
  customButton: {
    alignSelf: "center",
    backgroundColor: "#3d5af1",
    borderRadius: 10,
    width: screenWidth * 85,
    marginBottom: screenHeight * 2,
    padding: 3,
  },

  textStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    textAlignVertical: "center",
    letterSpacing: 2,
  },

  already: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    marginTop: screenHeight * 0.2,
  },

  signinText: {
    fontSize: 20,
    color: "#045DE9",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  signinView: {
    alignSelf: "center",
    flexDirection: "row",
    // position: "absolute",
    marginTop: screenHeight * 2,
  },

  field: {
    marginTop: screenHeight * 2.5,
  },

  createAccount: {
    alignSelf: "center",
    borderRadius: 10,
    width: "85%",
    borderStyle: "solid",
    backgroundColor: "#4630EB",
    // position: "absolute",
    // bottom: 5,
    marginTop: screenHeight * 15,
  },

  createAccountText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    // letterSpacing: 1,
    padding: 10,
    fontWeight: "bold",
  },
});

export default styles;

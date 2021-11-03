import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers/dimensions";

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: screenHeight * 4,
    marginTop: screenHeight * 2,
    color: "black",
  },
  logo: {
    width: 100,
    height: 120,
  },
  mainView: {
    flex: 1,
  },
  logoView: {
    alignSelf: "center",
    marginTop: screenHeight * 8,
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
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },

  signinText: {
    fontSize: 15,
    color: "#006BB4",
    fontWeight: "bold",
  },

  signinView: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: screenHeight * 2,
  },

  field: {
    marginBottom: screenHeight * 2.5,
  },

  createAccount: {
    alignSelf: "center",
    borderRadius: 10,
    width: "85%",
    borderStyle: "solid",
    backgroundColor: "#4630EB",
    marginTop: screenHeight * 5,
  },

  createAccountText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 18,
    letterSpacing: 1,
    padding: 10,
  },
});

export default styles;

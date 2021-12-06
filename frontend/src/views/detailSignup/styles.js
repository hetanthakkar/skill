import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers/dimensions";

const styles = StyleSheet.create({
  modalView: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    marginVertical: screenHeight * 4,
  },
  button: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#F04E99",
  },
  button1: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F04E99",
  },
  submit: {
    alignSelf: "center",
    borderRadius: 10,
    width: screenWidth * 85,
    borderStyle: "solid",
    backgroundColor: "#4630EB",
    marginTop: screenHeight * 5,
  },
  textStyle1: {
    color: "black",
    textAlign: "center",
  },

  modalTextTitle: {
    marginBottom: 14,
    textAlign: "center",
    marginTop: 16,
  },
  modalTextSubtitle: {
    marginBottom: 12,
    color: "grey",
    textAlign: "center",
  },
  submitText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 22,
    letterSpacing: 1,
    padding: 10,
  },
});

export default styles;

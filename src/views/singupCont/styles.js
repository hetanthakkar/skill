import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers/dimensions";

const styles = StyleSheet.create({
  category: {
    flexDirection: "row",
    marginTop: screenHeight * 3,
    justifyContent: "space-around",
    height: screenHeight * 20,
    flexWrap: "wrap",
  },
  teacher: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#00C0B3",
    width: screenWidth * 45,
    height: screenHeight * 20,
    opacity: 1,
  },
  teacherTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 23,
    padding: 6,
  },
  teacherDescription: { color: "white", fontSize: 18, padding: 4 },

  student: {
    backgroundColor: "#F04E99",
    borderRadius: 20,
    padding: 10,
    width: screenWidth * 45,
    height: screenHeight * 20,
  },

  studentTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 23,
    padding: 6,
  },

  studentDescription: { color: "white", fontSize: 18, padding: 4 },

  selectedItemText: {
    color: "blue",
  },
  chipText: {
    color: "#25282f",
  },
  chipContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  selectToggle: {
    borderWidth: 1.5,
    width: screenWidth * 90,
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "white",
  },
  modalWrapper: {
    maxHeight: screenHeight * 70,
    marginTop: screenHeight * 20,
  },

  mainView: {
    flex: 1,
    backgroundColor: "white",
    flexWrap: "wrap",
  },

  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: screenHeight * 6,
    marginLeft: screenWidth * 3,
    // alignSelf: "center",
  },

  subtitle: {
    marginTop: screenHeight * 1,
    fontSize: 18,
    color: "black",
    marginLeft: screenWidth * 3,
    // alignSelf: "center",
  },
  submit: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 10,
    width: screenWidth * 85,
    borderStyle: "solid",
    backgroundColor: "#4630EB",
    marginTop: screenHeight * 85,
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

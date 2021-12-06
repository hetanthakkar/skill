import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { changeTheme, addInfo } from "../../actions";
import styles from "./styles";
import { skills, coding, language, web, music } from "./mock";
import Icon from "react-native-vector-icons/MaterialIcons";

class App extends React.Component {
  state = {
    theme: "dark",
    active: false,
    active1: false,
    skills,
    selectedItems: [],
    bedroomSelect: [],
    newSelectItems: [],
    count: false,
  };

  onSelectedItemsChange = (selectedItems) => {
    if (this.state.selectedItems.length >= 5) {
      return;
    }
    const name = selectedItems.toString();
    const a = [];
    if (name.includes("Musical Instrument")) {
      a.push(...music);
      this.setState({ count: true });
    }
    if (name.includes("Web Development")) {
      a.push(...web);
      this.setState({ count: true });
    }

    if (name.includes("Computer Language")) {
      a.push(...coding);
      this.setState({ count: true });
    }

    if (name.includes("New Language")) {
      a.push(...language);
      this.setState({ count: true });
    } else {
      this.setState({ count: false });
    }
    this.setState(() => ({
      selectedItems: selectedItems,
      bedroomSelect: a,
    }));
  };
  onSelectedNewChange = (newSelectItems) => {
    this.setState(() => ({
      newSelectItems: newSelectItems,
    }));
  };

  selectStudent = async () => {
    await this.setState({
      active1: this.state.active1 ? false : true,
      active: false,
    });
  };
  selectTeacher = async () => {
    await this.setState({
      active: this.state.active ? false : true,
      active1: false,
    });
  };
  submit = async () => {
    let user = { ...this.props.user };
    user.role = this.state.active ? "teacher" : "student";
    user.skills = this.state.selectedItems;
    user.specificSkils = this.state.newSelectItems;
    await this.props.saveInfo(user);
    this.props.navigation.navigate("Signup Detail");
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch("http://192.168.16.158:3000/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((result) => result.json())
      .then(async (data) => {
        this.props.saveInfo(data);
      });
  };
  render() {
    return (
      <ScrollView
        style={
          this.state.theme == "dark"
            ? { ...styles.mainView, backgroundColor: "#141519" }
            : styles.mainView
        }
      >
        <View>
          <Text
            style={
              this.state.theme == "dark"
                ? { ...styles.title, color: "#DFE5EF" }
                : styles.title
            }
          >
            Which one defines you?
          </Text>
          <Text
            style={
              this.state.theme == "dark"
                ? { ...styles.subtitle, color: "#DFE5EF" }
                : styles.subtitle
            }
          >
            Choose any one from below categories.
          </Text>
        </View>
        <View style={styles.category}>
          <View>
            <TouchableOpacity
              onPress={this.selectTeacher}
              style={styles.teacher}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.teacherTitle}>Teacher</Text>
                {this.state.active && (
                  <Icon
                    size={30}
                    style={{ alignSelf: "center", marginLeft: 10 }}
                    color="white"
                    name="check-circle"
                  />
                )}
              </View>
              <Text style={styles.teacherDescription}>
                Share and monetize your skills to earn money.👨‍🏫
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ opacity: 1 }}>
            <TouchableOpacity
              onPress={this.selectStudent}
              style={styles.student}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.studentTitle}>Student</Text>
                {this.state.active1 && (
                  <Icon
                    size={22}
                    style={{ alignSelf: "center" }}
                    color="white"
                    name="check-circle"
                  />
                )}
              </View>
              <Text style={styles.studentDescription}>
                Get yourself ahed of croud by learning new skills.👨🏻‍🎓
                {this.state.selectedItems}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SectionedMultiSelect
          IconRenderer={Icon}
          modalWithTouchable={true}
          items={this.state.skills}
          single={false}
          uniqueKey="name"
          selectText="Select Skills [Any 5]"
          readOnlyHeadings={false}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          styles={{
            selectedItemText: styles.selectedItemText,
            chipText: styles.chipText,
            chipContainer: styles.chipContainer,
            selectToggle: styles.selectToggle,
            modalWrapper: styles.modalWrapper,
          }}
        />
        {this.state.selectedItems.some((i) =>
          [
            "New Language",
            "Computer Language",
            "Web Development",
            "Musical Instrument",
          ].includes(i)
        ) && (
          <SectionedMultiSelect
            IconRenderer={Icon}
            items={this.state.bedroomSelect}
            uniqueKey="name"
            selectText="Select Specific"
            showDropDowns={false}
            readOnlyHeadings={false}
            onSelectedItemsChange={this.onSelectedNewChange}
            selectedItems={this.state.newSelectItems}
            styles={{
              selectedItemText: styles.selectedItemText,
              chipText: styles.chipText,
              chipContainer: styles.chipContainer,
              selectToggle: styles.selectToggle,
              modalWrapper: styles.modalWrapper,
            }}
          />
        )}
        <TouchableOpacity style={styles.submit} onPress={this.submit}>
          <Text style={styles.submitText}>Continue Ahed {" >"} </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.themeReducer,
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

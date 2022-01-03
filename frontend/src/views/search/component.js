import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
  TextInput,
} from "react-native";
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { screenHeight, screenWidth } from "../../helpers";
import { Toolbar, Card } from "react-native-material-ui";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Underline from "../../component/input/Underline";

class Map extends Component {
  state = {
    users: [],
    query: "",
    searchUsers: [],
    options: false,
    search: false,
  };
  componentDidMount = async () => {
    await fetch("http://192.168.2.4:3000/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then(async (data) => {
        console.log(data);
        const filteredPeople = data.filter(
          (item) => this.props.user._id !== item._id
        );
        await this.setState({
          users: filteredPeople,
          searchUsers: filteredPeople,
        });
      });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
  onSearch = (value) => {
    this.setState({ query: value });
    let users = [...this.state.users];
    const filteredPeople = users.filter((item) => item.name.includes(value));
    this.setState({ searchUsers: filteredPeople });
    if (this.state.query == "") this.setState({ searchUsers: users });
  };
  header = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: screenHeight * 3,
          marginBottom: screenHeight * 1,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#F04E99",
            padding: 10,
            width: screenWidth * 30,
            borderRadius: 15,
          }}
        >
          <View style={{ flexDirection: "row-reverse", alignSelf: "center" }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 6,
              }}
            >
              Sort
            </Text>
            <Icon size={20} color="white" name="sort" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#F04E99",
            padding: 10,
            width: screenWidth * 30,
            borderRadius: 15,
          }}
        >
          <View style={{ flexDirection: "row-reverse", alignSelf: "center" }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 6,
              }}
            >
              Filter
            </Text>
            <Icon size={20} color="white" name="filter-alt" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#F04E99",
            padding: 10,
            width: screenWidth * 30,
            borderRadius: 15,
          }}
        >
          <View style={{ flexDirection: "row-reverse", alignSelf: "center" }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 6,
              }}
            >
              Reset
            </Text>
            <CommunityIcon
              size={20}
              color="white"
              name="cog-counterclockwise"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  renderOptions = () => {
    this.state.options
      ? this.setState({ options: false })
      : this.setState({ options: true });
  };
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: this.props.theme == "light" ? "white" : "#141519",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
        }}
      >
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.renderOptions}
          centerElement="Search The Coders"
          searchable={{
            placeholder: "Search",
            autoFocus: true,
            onSearchPressed: () => this.setState({ search: true }),
            onSearchClosed: () => this.setState({ search: false }),
          }}
          style={{
            container: {
              backgroundColor: this.props.theme == "dark" ? "#141519" : "white",
            },
            leftElement: {
              color:
                this.props.theme == "dark" && !this.state.search
                  ? "white"
                  : "black",
            },

            rightElement: {
              color:
                this.props.theme == "dark" && !this.state.search
                  ? "white"
                  : "black",
            },
            titleText: {
              color:
                this.props.theme == "dark" && !this.state.search
                  ? "white"
                  : "black",
            },
          }}
        />

        <FlatList
          data={this.state.searchUsers}
          renderItem={({ item }) => (
            <ListItem
              containerStyle={{
                backgroundColor:
                  this.props.theme == "dark" ? "#141519" : "white",
              }}
              bottomDivider
              style={{
                marginTop: screenHeight * 1,
                flex: 1,
              }}
            >
              <Avatar source={{ uri: item.profilePhoto }} rounded />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: this.props.theme == "dark" ? "white" : "black",
                  }}
                >
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{
                    color: this.props.theme == "dark" ? "white" : "black",
                  }}
                >
                  {item.email}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
          keyExtractor={(item) => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.state.options ? this.header : undefined}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});
const mapStateToProps = (state) => {
  return {
    theme: state.themeReducer.theme,
    user: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (value) => dispatch(changeTheme(value)),
    saveInfo: (value) => dispatch(addInfo(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

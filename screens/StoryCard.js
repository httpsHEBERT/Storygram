import React, {Component} from "react";
import {View, Text, StyleSheet, SafeAreaView, Platform,
        StatusBar, Image, Dimensions, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import firebase from "firebase";

SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  }

  render() {
    if (!this.state.fontsLoaded) {
      SplashScreen.hideAsync();
    } else {
     return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.navigation.navigate(
            "StoryScreen", {story: this.props.story}
          )}  
        >
          <SafeAreaView style={styles.droidSafeArea}/>
            <View style={this.state.light_theme ? styles.cardContainerLight : styles.cardContainer}>
                <Image source={require("../assets/story_image_1.png")}
                       style={{
                        resizeMode:"contain",
                        width: Dimensions.get("window").width-45,
                        height: 250,
                        borderRadius: 10
                       }}></Image>
              <View style={styles.titleContainer}>
                <View style={styles.titleTextContainer}>
                  <View style={styles.storyTitle}>
                    <Text style={this.state.light_theme ? styles.storyTitleTextLight : styles.storyTitleText}>
                    {this.props.story.title}
                    </Text>
                  </View>
                  <View style={styles.storyAuthor}>
                    <Text style={this.state.light_theme ? styles.storyAuthorTextLight : styles.storyAuthorText}>
                      {this.props.story.author}
                    </Text>
                  </View>
                </View>
              </View>
                <Text style={this.state.light_theme ? styles.descriptionTextLight : styles.descriptionText}>
                {this.props.story.description}
                </Text>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <View style={styles.likeIcon}>
                    <Ionicons 
                      name={"heart"}
                      size={30}
                      color={this.state.light_theme ? "#f2f2f2" : "white"}
                      style={{
                        width: 30,
                        marginLeft: 20,
                        marginTop: 5
                      }}
                    />
                    </View>
                    <View>
                      <Text style={this.state.light_theme ? styles.likeTextLight : styles.likeText}>12k</Text>
                    </View>
                  </View>
                </View>
              </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: 13,
    backgroundColor: "#2f345d",
    borderRadius: 20,
    padding: 10
  },
  cardContainerLight: {
    margin: 13,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 10
  },
  titleTextContainer: {
    flex: 1
  },
  titleContainer: {
    paddingLeft: 10,
    justifyContent: "center"
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 20,
    color: "white"
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 20,
    color: "#2f345d"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 18,
    color: "white"
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 18,
    color: "#2f345d"
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    padding: 10,
  },
  descriptionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "#2f345d",
    padding: 10,
  },
  actionContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  likeButton: {
    backgroundColor: "#eb3948",
    borderRadius: 30,
    width: 160,
    height: 40,
    flexDirection: "row",
    paddingLeft: 25,
    alignItems: "center",
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: 25,
    marginLeft: 5,
    marginTop: 6,
  },
  likeTextLight: {
    color: "#f2f2f2",
    fontFamily: "Bubblegum-Sans",
    fontSize: 25,
    marginLeft: 5,
    marginTop: 6,
  }
});
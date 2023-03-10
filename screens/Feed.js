import React, {Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image,
         StatusBar, Platform} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import {FlatList} from 'react-native-gesture-handler';
import StoryCard from "./StoryCard";
import firebase from 'firebase';

let stories = require("./temp.json")

let customFonts = {
    'Bubblegum-Sans': require("../assets/fonts/BubblegumSans-Regular.ttf")
}

export default class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded: false,
            light_theme: true
        }
    }

    async _loadFontsAsync(){
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true});
    }

    componentDidMount(){
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

    renderItem = ({item: story}) => {
        return <StoryCard story = {story} navigation={this.props.navigation}/>
    }

    keyExtractor = (item, index) => index.toString();

    render() {
        if(!this.state.fontsLoaded){
            SplashScreen.hideAsync();
        } else {
        return (
            <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image source = {require("../assets/logo.png")}
                               style = {styles.imageLogo}></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Storygram</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={stories}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex:0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    imageLogo: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: 25,
        fontFamily: "Bubblegum-Sans"
    },
    appTitleTextLight: {
        color: "#15193c",
        fontSize: 25,
        fontFamily: "Bubblegum-Sans"
    },
    cardContainer: {
        flex: 0.93,
        paddingBottom: 40
    }
})
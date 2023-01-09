import React, {Component} from "react";
import {Text, View, StyleSheet, SafeAreaView, Platform, StatusBar,
        Image, ScrollView, TextInput} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {RFValue} from "react-native-responsive-fontsize";
import { color } from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

let customFonts = {
	"Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
	constructor(props){
		super(props);
		this.state = {
			fontsLoaded: false,
            previewImage: "image_1",
            dropDownHeight: 33
		};
	}

	async _loadFontsAsync(){
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount(){
		this._loadFontsAsync();
	}

	render() {
		if (!this.state.fontsLoaded){
			SplashScreen.hideAsync();
		} else  {
            let preview_images = {
                image_1: require("../assets/story_image_1.png"),
                image_2: require("../assets/story_image_2.png"),
                image_3: require("../assets/story_image_3.png"),
                image_4: require("../assets/story_image_4.png"),
                image_5: require("../assets/story_image_5.png"),
            }
			return(
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.appTitle}>
					<View style={styles.appIcon}>
						<Image
							source={require("../assets/logo.png")}
							style={styles.iconImage}
						/>
					</View>
					<View style={styles.appTitleTextContainer}>
						<Text style={styles.appTitleText}>Nova História</Text>
					</View>
				</View>
                <View style = {styles.fieldsContainer}>
                    <ScrollView style={{padding: 10}}>
                        <Image
                            source = {preview_images[this.state.previewImage]}
                            style={styles.previewImage}
                        />
                        <View style={{height: RFValue(this.state.dropDownHeight), marginBottom: 12}}>
                            <DropDownPicker
                                style={{backgroundColor: "transparent"}}
                                itemStyle={{justifyContent: "flex-start"}}
                                dropDownStyle={{backgroundColor: "#2f345d"}}
                                defaultValue={this.state.previewImage}
                                closeAfterSelecting={true}
                                closeOnBackPressed={true}
                                items={[
                                    {label: "Imagem 1", value: "image_1"},
                                    {label: "Imagem 2", value: "image_2"},
                                    {label: "Imagem 3", value: "image_3"},
                                    {label: "Imagem 4", value: "image_4"},
                                    {label: "Imagem 5", value: "image_5"},
                                ]}
                                containerStyle = {{
                                    height: 33,
                                    borderRadius: 10,
                                    marginBottom: 10,
                                }}
                                onOpen={() => {
                                    this.setState({dropDownHeight: 160})
                                }}
                                onClose={() => {
                                    this.setState({dropDownHeight: 33})
                                }}
                                labelStyle={{
                                    color:"white",
                                    fontFamily:"Bubblegum-Sans"
                                }}
                                arrowStyle={{
                                    color:"white",
                                    fontFamily:"Bubblegum-Sans"
                                }}
                                onChangeItem={item =>
                                    this.setState({previewImage: item.value})
                                }
                            />
                        </View>
                        <TextInput
                            style={styles.inputFont}
                            onChangeText={title=>this.setState({title})}
                            placeholder={"Título"}
                            placeholderTextColor="white"
                        />
                        <TextInput
                            style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                            placeholder={"Descrição"}
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor="white"
                        />
                        <TextInput
                            style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                            onChangeText={story=>this.setState({story})}
                            placeholder={"História"}
                            multiline={true}
                            numberOfLines={20}
                            placeholderTextColor="white"
                        />
                        <TextInput
                            style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig, {marginBottom: 25}]}
                            onChangeText={moral=>this.setState({moral})}
                            placeholder={"Moral"}
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor="white"
                        />
                    </ScrollView>
                </View>
                <View style ={{flex: 0.08}}/>
			</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#15193c"
	},
	droidSafeArea: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
	},
	appTitle: {
		flex: 0.07,
		flexDirection: "row"
	},
	appIcon: {
		flex: 0.3,
		justifyContent: "center",
		alignItems: "center"
	},
	iconImage: {
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
		fontSize: RFValue(28),
		fontFamily: "Bubblegum-Sans"
	},
    fieldsContainer: {
        flex: 0.85
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
    },
    inputFont: {
        height: undefined,
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white",
        fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra:{
        marginTop: RFValue(15)
    },
    inputTextBig:{
        textAlignVertical: "top",
        padding: RFValue(5)
    }
})
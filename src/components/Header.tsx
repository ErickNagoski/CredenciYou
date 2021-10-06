import React from "react";
import { TouchableOpacity } from "react-native";
import { Button, Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export function Header() {
const navigation = useNavigation()

    return (

        <View style={styles.container}>

            <Text>Olá{"\n"} Erick Nagoski</Text>
            <View style={styles.bateryView}>
                <Fontisto
                name="battery-full"
                size={24}
                />
                <Text>100%</Text>
            </View>
            <View>
                <TouchableOpacity 
                onPress={()=>{navigation.navigate("User")}}
                style={styles.accontButton}>
                    <Image
                    style={styles.image}
                        source={require("../assets/foto.png")}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width,
        height: 60,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
        borderWidth: 2,
        padding: 10,
    },
    accontButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent:"center",
        alignItems:"center"
    },
    AccontButtonView: {

    },
    bateryView:{
        // backgroundColor:"blue",
        width:80,
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",

    },
    image:{
        width:60,
        height:60
    }

})
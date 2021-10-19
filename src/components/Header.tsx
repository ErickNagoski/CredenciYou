import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { UserProps } from "../pages/Home";
import firebase from "../services/firebaseconnection"
import { colors } from "../layout";
export function Header() {
    const navigation = useNavigation()
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function loadData() {
            await firebase.database().ref(`users/n4IAC9cWAjMUE7HkTG0sxdXV67u1/name`).once("value", (snapshot) => {
                setUserName(snapshot.val());
            })
        }
        loadData();
    }, [])

    return (

        <View style={styles.container}>
            <Text>Olá{"\n"}{userName}</Text>
            <View style={styles.bateryView}>
                <Fontisto
                    name="battery-full"
                    size={24}
                />
                <Text>100%</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => { navigation.navigate("User") }}
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
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    accontButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    AccontButtonView: {

    },
    bateryView: {
        // backgroundColor:"blue",
        width: 80,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",

    },
    image: {
        width: 60,
        height: 60
    }

})
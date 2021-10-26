import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { Header } from "../components/Header";


export function Settings() {
    const nagivate = useNavigation()
    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.wrapper}>
                <Header />
                <View style={{flex:1}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Ação 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons
                        name="alarm"
                        size={20}
                        color={"orange"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        alignItems: "center",
        
    },
    button: {
        width: 250,
        height: 30,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:10,
    },
    buttonText: {
        fontSize: 18,
    }
})
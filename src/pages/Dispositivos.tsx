import React from "react";
import{ Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";

export function Dispositivos(){
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.content}>
                <Header/>
            </View>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    wrapper: {
        flex:1,
        marginTop: Platform.OS==="android"? StatusBar.currentHeight:0,
    },
    content: {

    },
})
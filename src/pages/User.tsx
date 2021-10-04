import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";

export function User() {
    return(
    <SafeAreaView>
        <View style={styles.Container}>
            <View style={styles.image}>
            <Image
                    style={styles.image}
                        source={require("../assets/foto.png")}
                        resizeMode="contain"
                    />
            </View>
            <View style={styles.userData}>
                <Text style={styles.text}>Erick Nagoski</Text>
                <Text style={styles.text}>CPF: 123.456-78</Text>
                <Text style={styles.text}>ericknagoski@gmail.com</Text>
                <Text style={styles.text}>(54)9 84471179</Text>
            </View>
            <View style={styles.button}></View>
            <View></View>
            <View></View>
        </View> 
    </SafeAreaView>
    
    )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        marginTop:30,
        padding:10,

    },
    image:{
        height:100,
        width:"100%"
    },
    userData:{
        flex:1
    },
    text:{
        fontSize:18,
        marginVertical:5
    },
    button:{
        width:"100%",
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,

    }
})
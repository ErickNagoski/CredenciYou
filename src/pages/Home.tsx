import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "../components/Header";

export function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Header />
                <View style={styles.content}>

                    <View style={styles.walletContainer}>
                        <TouchableOpacity
                            style={styles.smartwatch}
                            onPress={() => { alert("pagina da carteira") }}>
                            <Ionicons
                                name="wallet-outline"
                                size={40}
                            />
                            {/* <Text style={styles.smartwatchTitle}>Carteira</Text> */}
                            <View>
                                <Text>Saldo : 1000</Text>
                                <Text>Limite de Crédito: 500</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.smartwatchContainer}>
                        <TouchableOpacity
                            style={styles.smartwatch}
                            onPress={() => { alert("pagina da pulseira") }}>
                            <Ionicons
                                name='watch-outline'
                                size={40}
                            />
                            <Text style={styles.smartwatchTitle}>Minha Pulseira</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.creditCardContainer}>
                        <Text>Meus cartões</Text>
                        <View style={styles.creditCardList}>
                            <View style={styles.creditCard}>

                                <Text>Erick Nagoski</Text>
                                <Text>5322 8761 0219 1494</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text>22/07/2022</Text>
                                    <Text>821</Text>
                                    <Fontisto name="mastercard" size={24} color="black" />
                                </View>
                            </View>
                            <View style={styles.creditCard}>
                                <TouchableOpacity
                                    style={styles.addCreditCardButton}
                                >
                                    <AntDesign name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                    <View style={styles.ticketsContainer}>
                        <Text>Meus tickets</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    content: {

        alignItems: "center",
        flex: 1,
    },

    walletContainer: {
        marginVertical: 10,
        width: "100%",
        height: 60,
        borderWidth: 2,
    },

    smartwatchContainer: {
        marginVertical: 10,
        width: "100%",
        height: 60,
        borderWidth: 2,
    },

    smartwatch: {
        width: "100%",
        height: 60,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    smartwatchTitle: {
        fontSize: 18,
    },
    creditCardContainer: {
        width: "100%",
        height: 120,
        borderWidth: 2,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: 10

    },
    creditCard: {
        width: "50%",
        height: 90,
        borderWidth: 1,
        padding: 5,
        justifyContent: "space-around",
        marginHorizontal: 10,
        borderRadius:10,

    },
    creditCardList: {
        flexDirection: "row",
    },
    addCreditCardButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#b2b2b2",
        justifyContent: "center",
        alignContent: "center"
    },
    ticketsContainer: {
        marginTop:10,
        width: "100%",
        height: 200,
        alignItems: "flex-start",
        borderWidth: 1,
        padding:10,
    },
    
})
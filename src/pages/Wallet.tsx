import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity, Text, Button, Alert, FlatList } from "react-native";
import { OutGoing, outGoingProps } from "../components/OutGoing";
import moment from "moment";
import { Header } from "../components/Header";



export default function Wallet() {
    moment.locale("pt-br")
    const [isVisible, setIsVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);


    const outGoings: outGoingProps[] = [
        {
            id: "1",
            title: "Ticket GNC Cinemas",
            value: 35.00,
            date: moment(new Date).locale("pt-br").format("L"),
        },
        {
            id: "2",
            title: "Ticket GNC Cinemas",
            value: 35.00,
            date: moment(new Date).locale("pt-br").format("L"),
        },
        {
            id: "3",
            title: "Ticket GNC Cinemas",
            value: 35.00,
            date: moment(new Date).locale("pt-br").format("L"),
        },
        {
            id: "4",
            title: "Ticket GNC Cinemas",
            value: 35.00,
            date: moment(new Date).locale("pt-br").format("L"),
        },
    ]

    return (
        <SafeAreaView style={styles.body}>

            <View style={styles.wrapper}>
                <Header />

                <View style={styles.walletBalance}>
                    <Text>Saldo: {isVisible && "1000"}{!isVisible && "*****"}</Text>
                    <Text>Limite: {isVisible && "1000"}{!isVisible && "*****"}</Text>
                    <TouchableOpacity
                        style={styles.visibleButton}
                        onPress={() => { setIsVisible(!isVisible) }}
                    >
                        {isVisible &&
                            <Ionicons
                                name="eye-off-outline"
                                size={24}
                            />
                        }
                        {!isVisible &&
                            <Ionicons
                                name="eye-outline"
                                size={24}
                            />
                        }

                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { Alert.alert("Solicitação efetuada com sucesso!") }}
                >
                    <Text>Solicitar aumento de crédito</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setIsActive(!isActive)
                        if (!isActive) {
                            Alert.alert("Função de pagamento ativa!")
                        } else {
                            Alert.alert("Função de pagamento desativada!")
                        }
                    }}
                >
                    <Text>
                        {isActive && "Desativar função de pagamento"}
                        {!isActive && "Ativar função de pagamento"}
                    </Text>
                </TouchableOpacity>
                <View style={styles.creditCardContainer}>
                            <Text style={styles.title}>Meus cartões</Text>
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
                                <View style={[styles.creditCard, { alignItems: "center" }]}>
                                    <TouchableOpacity
                                        style={styles.addCreditCardButton}
                                    >
                                        <AntDesign name="plus" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>
                <View style={styles.outGoingContainer}>
                    <Text>Despezas</Text>
                    <FlatList
                        style={styles.outGoingList}
                        data={outGoings}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <OutGoing
                                {...item}
                            />
                        )}

                    />

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    wrapper: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    content: {

    },
    title: {
        fontSize: 18,

    },
    walletBalance: {
        width: "100%",
        flexDirection: "row",
        height: 40,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderWidth: 1,
        marginBottom:10,
    },
    visibleButton: {
        width: 60,
        height: 25
    },
    button: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical:5,
    },
    creditCardContainer: {
        width: "100%",
        height: 200,
        borderWidth: 2,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingLeft: 10

    },
    creditCard: {
        width: 200,
        height: 90,
        borderWidth: 1,
        padding: 5,
        justifyContent: "space-around",
        marginHorizontal: 10,
        borderRadius: 10,

    },
    creditCardList: {
        flexDirection: "row",
        height: 150,
        alignItems: "center"
    },

    addCreditCardButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#b2b2b2",
        justifyContent: "center",
        alignItems: "center"
    },
    outGoingContainer: {
        width: "100%",
        borderWidth: 1,
        padding:10,
    },
    outGoingList: {
        width: "100%"

    },
})
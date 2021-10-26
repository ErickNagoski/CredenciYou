import { AntDesign, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableWithoutFeedback, FlatList, ActivityIndicator, Modal, Image, Alert, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "../components/Header";
import { Ticket, TicketProps } from "../components/Ticket";

import firebase from "../services/firebaseconnection";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";
import { CreditCard } from "../components/CreditCard";
import { loadSession } from "../services/asyncAuth";

export interface CreditCardProps {
    data: {
        code: string,
        name: string,
        validity: string,
        segureKey: string,
    }
}

export interface UserProps {
    uuid?: string,
    name: string,
    cpf: string,
    email: string,
    age: number,
    phone: string,
    credit_Limit: number,
    wallet_Balance: number,
    tickets?: TicketProps[]
    creditCards?: CreditCardProps[];

}

export function Home() {
    moment.locale("pt-br")

    const [user, setUser] = useState<UserProps>()
    const [loading, setLoading] = useState(true);
    const [userUid, setUserUid] = useState("")
    const [creditCards, setCreditCards] = useState<CreditCardProps[]>([]);
    const [tickets, setTickets] = useState<TicketProps[]>([])

    const [showHealthModal, setShowHealthModal] = useState(false);

    const navigation = useNavigation()

    const [refreshing, setRefreshing] = useState(false);

    useLayoutEffect(() => {
        async function getUser() {
            const data = await loadSession();
            console.log(data)
            if (data !== undefined) {
                setUser(data);
            }
        }
        getUser();
    }, [])

    useEffect(() => {
        async function getCreditCards() {
            await firebase.database().ref(`users/${user?.uuid}/creditCards`).on("value", (snapshot) => {
                // console.log(snapshot)
                const data: any[] = []
                snapshot.forEach((childItem) => {
                    setCreditCards(state => [...state,
                    {
                        data: {
                            name: childItem.val().name,
                            code: childItem.val().code,
                            validity: childItem.val().validity,
                            segureKey: childItem.val().segureKey,
                        }
                    }
                    ])
                })
            })
        }
        getCreditCards();
    }, [user])

    useEffect(() => {
        async function getTickets() {
            setTickets([])
            await firebase.database().ref(`users/${user?.uuid}/tickets`).on("value", (snapshot) => {
                snapshot.forEach((childItem) => {
                    setTickets(state => [...state,
                    {
                        id: "" + Math.random(),
                        place: childItem.val().place,
                        value: Number(childItem.val().value),
                        validity: childItem.val().validity,
                    }
                    ])
                })

            })
            setLoading(false)
        }
        getTickets();
    }, [user])

    if (loading) {
        return (
            <ActivityIndicator
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                size="large"
                color="#000000"
            />
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>

                <Modal
                    style={styles.healthModal}
                    visible={showHealthModal}
                    transparent={true}
                >
                    <TouchableWithoutFeedback
                        onPress={() => { setShowHealthModal(false) }}>
                        <View style={styles.outsideHealthModal} />
                    </TouchableWithoutFeedback>

                    <View style={styles.healthModalContent}>
                        <View style={styles.healthTextView}>
                            <Text style={styles.healthText}>Média ❤ {"\n"} 86</Text>
                            <Text style={styles.healthText}>Minimo ❤ {"\n"} 50</Text>
                            <Text style={styles.healthText}>Maximo ❤ {"\n"} 180</Text>
                        </View>
                        <View style={styles.graphicView}>
                            <Image
                                style={styles.graphicImage}
                                source={require("../assets/grafico.png")}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => { setShowHealthModal(false) }}>
                        <View style={styles.outsideHealthModal} />
                    </TouchableWithoutFeedback>
                </Modal>


                <View style={styles.wrapper}>
                    <Header />
                    <View style={styles.content}>

                        <View style={styles.walletContainer}>
                            <TouchableOpacity
                                style={styles.smartwatch}
                                onPress={() => { navigation.navigate("Wallet") }}>
                                <Ionicons
                                    name="wallet-outline"
                                    size={40}
                                />
                                {/* <Text style={styles.smartwatchTitle}>Carteira</Text> */}
                                <View>
                                    <Text>Saldo : {user?.wallet_Balance}</Text>
                                    <Text>Limite de Crédito: {user?.credit_Limit}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.smartwatchContainer}>
                            <TouchableOpacity
                                style={styles.smartwatch}
                                onPress={() => { navigation.navigate("Dispositivo")}}>
                                <Ionicons
                                    name='watch-outline'
                                    size={40}
                                />
                                <Text style={styles.smartwatchTitle}>Minha Pulseira</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.smartwatchContainer}>
                            <TouchableOpacity
                                style={styles.smartwatch}
                                onPress={() => { setShowHealthModal(!showHealthModal) }}>
                                <Ionicons
                                    name='heart-outline'
                                    size={40}
                                />
                                <Text style={styles.smartwatchTitle}>Minha Saúde</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.creditCardContainer}>
                            <Text style={styles.title}>Meus cartões</Text>
                            <View style={styles.creditCardList}>
                                {creditCards && (
                                    <FlatList
                                        data={creditCards}
                                        keyExtractor={(item) => item.data.code}
                                        renderItem={({ item }) => (

                                            <CreditCard data={item.data} />

                                        )}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    />)}
                            </View>
                        </View>

                        <View style={styles.smartwatchContainer}>
                            <TouchableOpacity
                                style={styles.smartwatch}
                                onPress={() => { navigation.navigate("TicketsShop") }}
                            >
                                <FontAwesome name="ticket" size={24} color="black" />
                                <Text style={styles.smartwatchTitle}>Comprar tickets</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ticketsContainer}>
                            <Text style={[styles.title, { marginBottom: 10 }]}>Meus tickets</Text>
                            {tickets && (
                                <FlatList
                                    style={styles.ticketsList}
                                    data={tickets}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <Ticket
                                            {...item}
                                        />
                                    )}
                                />
                            )}
                        </View>
                        <TouchableOpacity
                            style={styles.smartwatch}
                            onPress={() => { navigation.navigate("TicketsShop") }}
                        >
                            <Text>Comprar tickets</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
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

    title: {
        fontSize: 18,

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
    ticketsContainer: {
        marginTop: 10,
        width: "100%",
        alignItems: "flex-start",
        borderWidth: 1,
        padding: 10,
    },
    ticketsList: {
        width: "100%"
    },

    healthModal: {
        flex: 1,
        backgroundColor: "rgba(200,200,200,0.4)",
    },

    outsideHealthModal: {
        flex: 1,
        backgroundColor: "rgba(200,200,200,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },

    healthModalContent: {
        flex: 3,
        marginHorizontal: 15,
        padding: 15,
        backgroundColor: "#ffffff",
        justifyContent: "space-evenly",
        alignItems: 'flex-start'
    },

    graphicView: {
        width: "100%",
        alignItems: "center"
    },
    graphicImage: {
        width: 400,
        height: 200
    },
    healthTextView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
    },

    healthText: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: "center",
        lineHeight: 30,
        fontWeight: "bold"
    },



})
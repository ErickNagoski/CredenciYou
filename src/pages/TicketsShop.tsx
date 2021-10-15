import React from "react";
import { Alert, FlatList, Modal, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Ticket, TicketProps } from "../components/Ticket";
import moment from "moment";
import { Header } from "../components/Header";
import { FontAwesome } from "@expo/vector-icons";



export default function TicketsShop() {
    moment.locale("pt-br")
    const tickets: TicketProps[] = [
        {
            id: "1",
            place: "CNC Cinemas - Caxias do Sul",
            value: 35.00,
            validity: moment(new Date).locale("pt-br").format("L"),
        },
        {
            id: "2",
            place: "CNC Cinemas - Caxias do Sul",
            value: 35.00,
            validity: moment(new Date).locale("pt-br").format("L"),
        },
        {
            id: "3",
            place: "Cinépolis Caxias do Sul",
            value: 35.00,
            validity: moment(new Date).locale("pt-br").format("L"),
        },
        {
            id: "4",
            place: "Cinépolis Caxias do Sul",
            value: 35.00,
            validity: moment(new Date).locale("pt-br").format("L"),
        },
        {
            id: "5",
            place: "CNC Cinemas - Caxias do Sul",
            value: 35.00,
            validity: moment(new Date).locale("pt-br").format("L"),
        },
    ]

    return (
        < SafeAreaView style={styles.body}>
            <View style={styles.wrapper}>
                <Header />
                <View style={styles.ticketsContainer}>
                    <Text style={[styles.title, { marginBottom: 10 }]}>Tickets Disponíveis</Text>
                    <FlatList
                        style={styles.ticketsList}
                        data={tickets}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (

                            <View style={styles.ticket}>
                                <View style={{ width: "90%" }}>
                                    <Ticket
                                        {...item}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                >
                                    <FontAwesome name="ticket" size={32} color="black" />
                                </TouchableOpacity>

                            </View>
                        )}

                    />
                </View>
            </View>

        </SafeAreaView >
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
    ticketsContainer: {
        marginTop: 10,
        width: "100%",
        height: "100%",
        alignItems: "flex-start",
        borderWidth: 1,
        padding: 10,
    },
    ticketsList: {
        width: "100%"
    },
    title: {
        fontSize: 18,

    },
    button: {
        height: 80,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    ticket: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    }

})
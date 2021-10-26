import React from "react";
import { Alert, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../components/Header";

export function Dispositivo() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Header />
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { Alert.alert("Conectando com a pulseira ...") }}
                    >
                        <Text>Adicionar novo dispositivo</Text>
                    </TouchableOpacity>

                    <View style={styles.dispositivosContainer}>
                        <Text style={styles.disposivosText}>Meus dispositivos conectados</Text>
                        <View style={styles.dispositivo}>
                            <Text style={styles.disposivoText}>Fechadura eletrônica</Text>
                        </View>
                        <View style={styles.dispositivo}>
                            <Text style={styles.disposivoText}>Dispositivo 2</Text>
                        </View>
                        <View style={styles.dispositivo}>
                            <Text style={styles.disposivoText}>Dispositivo 3</Text>
                        </View>
                        <View style={styles.dispositivo}>
                            <Text style={styles.disposivoText}>Dispositivo 4</Text>
                        </View>
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
   
        justifyContent: "flex-start",
        flex: 1,
    },
    button: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    dispositivosContainer: {
        marginTop: 30,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginVertical: 5,
    },
    dispositivo: {
        width: "100%",
        height: 60,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    disposivosText: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15
    },
    disposivoText: {
        fontSize: 16,
        fontWeight: "bold",
    }
})
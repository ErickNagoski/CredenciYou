import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity, Text, Button, Alert, FlatList, TouchableWithoutFeedback, Modal, TextInput } from "react-native";
import { OutGoing, outGoingProps } from "../components/OutGoing";
import moment from "moment";
import { Header } from "../components/Header";
import { CreditCard } from "../components/CreditCard";
import firebase from "../services/firebaseconnection"
import { UserProps } from "./Home";


export default function Wallet() {
    moment.locale("pt-br")
    const [isVisible, setIsVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [showAddCreditCardModal, setShowAddCreditCardModal] = useState(false)

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [validity, setValidity] = useState("");
    const [segureKey, setSegureKey] = useState("");

    const [user, setUser] = useState<any>();

    const [creditCards, setCreditCards] = useState<any[]>();
    const [outGoings, setOutGoings] = useState<outGoingProps[]>([])

    async function loadUserData(uuid: string) {
        await firebase.database().ref(`users/${uuid}`).once("value", (snapshot) => {
            let userData = {
                uuid: uuid,
                name: snapshot.val().name,
                cpf: snapshot.val().cpf,
                age: Number(snapshot.val().age),
                phone: snapshot.val().phone,
                creditLimit: Number(snapshot.val().credit_limit),
                walletBalance: Number(snapshot.val().wallet_balance),
            }
            setUser(userData)
        })
    }

    async function loadOutgoings() {
        const outgoingData: outGoingProps[] = []
        setOutGoings([]);
        await firebase.database().ref("users/n4IAC9cWAjMUE7HkTG0sxdXV67u1/outGoing").on("value", (snapshot) => {
            console.log("aqui")
            snapshot.forEach((childItem) => {
                let data: outGoingProps = {
                    id: "" + Math.random(),
                    title: childItem.val().title,
                    value: childItem.val().value,
                    date: `${new Date()}`
                }
                outgoingData.push(data)
            })
            setOutGoings(outgoingData)
            // setLoading(false);
        })
    }

    async function loadCreditCards() {
        await firebase.database().ref(`users/n4IAC9cWAjMUE7HkTG0sxdXV67u1/creditCards`).on("value", (snapshot) => {
            const data: any = []
            snapshot.forEach((childItem) => {
                data.push({
                    name: childItem.val().name,
                    code: childItem.val().code,
                    validity: childItem.val().validity,
                    segureKey: childItem.val().segureKey,
                })
            })
            setCreditCards(data)
        })
    }

    useLayoutEffect(() => {
        loadUserData("n4IAC9cWAjMUE7HkTG0sxdXV67u1");
        loadCreditCards();
        loadOutgoings()
    }, [])


    async function handleAddCreditCard() {
        await firebase.database().ref(`users/${user.uuid}/creditCards`).child(`${code}`).set({
            name: name,
            code: code,
            validity: validity,
            segureKey: segureKey,
        }).then((value) => {
            Alert.alert("Cadastrado com sucesso!")
            setShowAddCreditCardModal(false);
            setCode("");
            setSegureKey("");
            setValidity("");
            setName("");
        }).catch((error) => {
            Alert.alert("Erro interno!")
            console.log(error)
        })
    }

    return (
        <SafeAreaView style={styles.body}>

            <View style={styles.wrapper}>
                <Header />

                <View style={styles.walletBalance}>
                    <Text>Saldo: {isVisible && user.walletBalance}{!isVisible && "*****"}</Text>
                    <Text>Limite: {isVisible && user.creditLimit}{!isVisible && "*****"}</Text>
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
                    onPress={() => { Alert.alert("Solicita????o efetuada com sucesso!") }}
                >
                    <Text>Solicitar aumento de cr??dito</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setIsActive(!isActive)
                        if (!isActive) {
                            Alert.alert("Fun????o de pagamento ativa!")
                        } else {
                            Alert.alert("Fun????o de pagamento desativada!")
                        }
                    }}
                >
                    <Text>
                        {isActive && "Desativar fun????o de pagamento"}
                        {!isActive && "Ativar fun????o de pagamento"}
                    </Text>
                </TouchableOpacity>
                <View style={styles.creditCardContainer}>
                    <Text style={styles.title}>Meus cart??es</Text>
                    <View style={styles.creditCardList}>
                        <FlatList
                            data={creditCards}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (

                                <CreditCard data={item} />

                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { setShowAddCreditCardModal(!showAddCreditCardModal) }}
                    >
                        <Text>Adicionar cart??o</Text>
                    </TouchableOpacity>
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
            <Modal
                style={styles.modal}
                visible={showAddCreditCardModal}
                transparent={true}
            >
                <TouchableWithoutFeedback
                    onPress={() => { setShowAddCreditCardModal(false) }}>
                    <View style={styles.outsideModal} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do titular"
                        onChangeText={(value) => { setName(value) }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="C??digo do cart??o"
                        onChangeText={(value) => { setCode(value) }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Validade (dd/MM/aaa)"
                        onChangeText={(value) => { setValidity(value) }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Chave de seguran??a"
                        onChangeText={(value) => { setSegureKey(value) }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
                        <Button title="Confirmar" onPress={handleAddCreditCard} />
                        <Button title="Cancelar" color="red" onPress={() => { setShowAddCreditCardModal(false) }} />
                    </View>
                </View>


                <TouchableWithoutFeedback
                    onPress={() => { setShowAddCreditCardModal(false) }}>
                    <View style={styles.outsideModal} />
                </TouchableWithoutFeedback>
            </Modal>
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
        marginBottom: 10,
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
        marginVertical: 5,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "blue",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    creditCardContainer: {
        width: "100%",
        height: 200,
        borderWidth: 2,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingVertical: 10,

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
        padding: 10,
    },
    outGoingList: {
        width: "100%"

    },
    modal: {
        flex: 1,
        backgroundColor: "rgba(200,200,200,0.4)",
    },
    outsideModal: {
        flex: 1,
        backgroundColor: "rgba(200,200,200,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        flex: 3,
        marginHorizontal: 15,
        padding: 15,
        backgroundColor: "#ffffff",
        justifyContent: "space-evenly",
        alignItems: 'flex-start'
    },

})
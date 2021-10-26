import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, Button, TouchableOpacity, TextInput } from "react-native";
import { clearStorage, loadSession, saveSession } from "../services/asyncAuth";
import firebase from "../services/firebaseconnection"
import { UserProps } from "./Home";

export function User() {
    const [user, setUser] = useState<UserProps>()

    const navigation = useNavigation()
    const [showEdit, setShowEdit] = useState(false)
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
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
        setName(user?.name);
        setCpf(user?.cpf);
        setPhone(user?.phone);
        setEmail(user?.email);
    }, [user])

    async function saveUserData(uuid: user.uuid) {
        console.log("function")
        await firebase.database().ref("users").child(uuid).update({
            name: name,
            email: email,
            phone: phone,
        }).then(() => {
            const userData = {
                uuid: uuid,
                name: name,
                cpf: user?.cpf,
                age: user?.age,
                email: email,
                phone: phone,
                credit_Limit: user?.credit_Limit,
                wallet_Balance: user?.wallet_Balance,
            }
            saveUser(userData);
        })
    }

    return (
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
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                        <Text>Meus dados</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowEdit(!showEdit)
                                if (showEdit) {
                                    saveUserData()
                                }
                            }}
                        >
                            <FontAwesome
                                name="edit"
                                size={24}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userDataContainer}>
                        {!showEdit && <Text style={styles.text}>{name}</Text>}
                        {showEdit && (<TextInput
                            defaultValue={"Erick Nagoski"}
                            onChangeText={(txt) => { setName(txt) }}
                        />)}
                    </View>
                    <View style={styles.userDataContainer}>
                        <Text style={styles.text}>{cpf}</Text>

                    </View>
                    <View style={styles.userDataContainer}>
                        {!showEdit && <Text style={styles.text}>{email}</Text>}
                        {showEdit && (<TextInput
                            defaultValue={"ericknagoski@gmail.com"}
                            onChangeText={(txt) => { setEmail(txt) }}
                        />)}
                    </View>
                    <View style={styles.userDataContainer}>
                        {!showEdit && <Text style={styles.text}>{phone}</Text>}
                        {showEdit && (<TextInput
                            defaultValue={"(54)9 84471179"}
                            onChangeText={(txt) => { setPhone(txt) }}
                        />)}
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            firebase.auth().signOut();
                            clearStorage();
                            navigation.navigate("Login");
                        }}
                    >
                        <Text>Sair da conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate("Settings") }}
                    >
                        <Text>configurações</Text>
                    </TouchableOpacity>
                </View>
                <View></View>
                <View></View>

            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginTop: 30,
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center"

    },
    image: {
        height: 100,
        width: "100%"
    },
    userData: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    text: {
        fontSize: 18,
        marginVertical: 5
    },
    button: {
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1
    },
    userDataContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        height: 40,
        borderBottomWidth: 1,
    },
    input: {
        borderWidth: 1,
    }
})
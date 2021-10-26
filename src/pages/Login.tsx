import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Keyboard, KeyboardAvoidingView, StatusBar, Dimensions, Button, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUserData } from "../hooks/useUserData";
import { loadSession, saveSession, SessionProps } from "../services/asyncAuth";
import firebase from "../services/firebaseconnection";
import { UserProps } from "./Home";


export function Login() {
    const navigate = useNavigation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    // const { userData, setUserData } = useUserData();

    async function saveUser(uuid: string) {
        await firebase.database().ref(`users/${uuid}`).once("value", (snapshot) => {
            const userData: UserProps =
            {
                uuid: uuid,
                name: snapshot.val().name,
                cpf: snapshot.val().cpf,
                email: snapshot.val().email,
                age: Number(snapshot.val().age),
                phone: snapshot.val().phone,
                credit_Limit: Number(snapshot.val().credit_limit),
                wallet_Balance: Number(snapshot.val().wallet_balance)
            }
            saveSession(userData);
        })
    }

    useLayoutEffect(() => {
        async function getUser() {
            const user  = await loadSession();
                if (user?.uuid !== undefined && user?.uuid !== null) {
                    saveUser(user.uuid);
                    navigate.navigate("Home");
                } else {
                    setIsLoading(false)
                }
        }
        getUser()
    }, [])

    async function handleLogin() {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((value) => {
                saveUser(value.user?.uid)
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then((value) => {
                        navigate.navigate("Home", {})
                    })
                    .catch(() => { console.log("error") })

            })
            .catch((error) => {
                if (error.code === "auth/internal-error") {
                    alert("Erro interno, por favor tente novamente mais tarde ou entre em contato com o suporte.")
                }
                if (error.code === "auth/invalid-email") {
                    alert("Senha ou email inválido.")
                }
                if (error.code === "auth/wrong-password") {
                    alert("Senha ou email inválido.")
                }
                if (error.code === "auth/network-request-failed") {
                    alert("Erro de conexão, verifique sua conexão com a internet.")
                }
            })
    }

    function handleCadastro() {
        navigate.navigate("SignUp", {});
    }

    if (isLoading) {
        return (
            <ActivityIndicator
                size="large"
            />
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.content}>

                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        onChangeText={(value) => { setEmail(value) }}
                                    ></TextInput>

                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Senha"
                                        onChangeText={(value) => { setPassword(value) }}
                                    ></TextInput>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <Button title="Login" onPress={() => { handleLogin() }}></Button>
                                    <TouchableOpacity onPress={() => { handleCadastro() }}>
                                        <Text style={styles.buttonText}>Cadastrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },

    form: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 54,
        alignItems: "center",
        width: "100%"
    },
    content: {
        flex: 1,
        width: "100%",
    },


    wrapper: {
        marginTop: StatusBar.currentHeight,
    },

    imageContainer: {
        marginBottom: 20,
    },
    Image: {
        height: false ? 50 : Dimensions.get('window').width * 0.7,
    },

    inputContainer: {
        display: "flex",
        flexDirection: "row",
        width: 300,
        alignItems: "center",

    },

    buttonContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        fontSize: 18,
        color: "blue",
        textDecorationStyle: "solid",
        textDecorationColor: "blue",
        textDecorationLine: "underline"
    },

    Icon: {
        padding: 10,
        marginBottom: 10
    },

    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "blue",
        paddingHorizontal: 10,
        marginBottom: 10,


    }
})
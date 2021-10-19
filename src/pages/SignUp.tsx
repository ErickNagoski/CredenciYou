import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Keyboard, KeyboardAvoidingView, StatusBar, Dimensions, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../services/firebaseconnection";


export function SignUp() {
    const navigate = useNavigation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    

    async function submitSignUp() {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((value) => {

                let key = value.user?.uid
                firebase.database().ref("users").child(`${key}`).set({
                    name: nome,
                    email: email,
                    age: idade,
                    cpf: cpf,
                    phone:telefone,
                    wallet_balance:0,
                    credit_limit:0,
                    

                });
                navigate.navigate("Home")
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    alert("Seu email já está em uso em outra conta.")
                }
                if (error.code === "auth/internal-error") {
                    alert("Erro interno, por favor tente novamente mais tarde ou entre em contato com o suporte.")
                }
                if (error.code === "auth/invalid-email") {
                    alert("Email inválido")
                }
                if (error.code === "auth/wrong-password") {
                    alert("Senha errada ou a conta correspondente ao e-mail não tem uma senha definida.")
                }
                if (error.code === "auth/invalid-phone-number") {
                    alert("Número de telefone inválido")
                }
                if (error.code === "auth/network-request-failed") {
                    alert("Erro de conexão, verifique sua internet")
                }
                if (error.code === "auth/weak-password") {
                    alert("A senha deve ter no minimo seis caracteres")
                }
            })
    }

    async function handleSignUp() {
        if (email == '') {
            alert("Preencha o campo de email")
        }
        else if (password == '') {
            alert("Preencha o campo da senha")
        } else {
            submitSignUp();
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>

                        <View style={styles.form}>
                            
                        <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    onChangeText={(value) => { setNome(value) }}
                                ></TextInput>
                            </View>
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
                                    placeholder="CPF"
                                    onChangeText={(value) => { setCpf(value) }}
                                ></TextInput>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Idade"
                                    onChangeText={(value) => { setIdade(value) }}
                                ></TextInput>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Telefone"
                                    onChangeText={(value) => { setTelefone(value) }}
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
                                <Button title="Cadastrar" onPress={() => { handleSignUp()}}></Button>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
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
        // Dimensions.get('window').width * 0.5
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
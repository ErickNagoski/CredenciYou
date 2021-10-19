import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedbackProps } from "react-native";

interface CreditCardProps extends TouchableWithoutFeedbackProps {
    data: {
        code: string,
        name: string,
        validity: string,
        segureKey: string,
    }
}

export function CreditCard({ data, ...rest }: CreditCardProps) {
    return (

        <View style={styles.container} {...rest}>
            <Text>{data.name}</Text>
            <Text>{data.code}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text>{data.validity}</Text>
                <Text>{data.segureKey}</Text>
               
            </View>
        </View>
        
  )
}

const styles = StyleSheet.create({
    container: {
        width: 180,
        height: 90,
        borderWidth: 1,
        padding: 5,
        justifyContent: "space-around",
        marginHorizontal: 10,
        borderRadius: 10,

    },
    addCreditCardButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#b2b2b2",
        justifyContent: "center",
        alignItems: "center"
    },
})

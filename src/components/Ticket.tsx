import React from "react";
import { View, Text, StyleSheet} from "react-native";

export interface TicketProps {
    id:string,
    place: string,
    value: number,
    validity: string,
}

export function Ticket(data:TicketProps){
    return(
        <View style={styles.container}>
            <Text>Local: {data.place}</Text>
            <Text>Valor: {data.value}</Text>
            <Text>Validade: {data.validity}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:"flex-start",
        justifyContent:"space-between",
        padding:10,
        borderWidth:1,
        borderRadius:10,
        marginVertical:5,
        width:"100%",
        height:80,

    }
})
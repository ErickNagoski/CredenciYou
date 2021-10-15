import React from "react";
import { View, Text, StyleSheet} from "react-native";

export interface outGoingProps {
    id: string,
    title: string,
    value: number,
    date: string,
}

export function OutGoing(data:outGoingProps){
    return(
        <View style={styles.container}>
            <Text>Despeza: {data.title}</Text>
            <Text>Valor: {data.value}</Text>
            <Text>Data: {data.date}</Text>
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
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { User } from "../pages/User";
import Wallet from "../pages/Wallet";
import TicketsShop from "../pages/TicketsShop";
import { Dispositivo } from "../pages/Dispositivo";
const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <stackRoutes.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "white" }
            }}
        >

            <stackRoutes.Screen
                name="Login"
                component={Login}
            />
            <stackRoutes.Screen
                name="Home"
                component={Home}
            />
            <stackRoutes.Screen
                name="SignUp"
                component={SignUp}
            />
            <stackRoutes.Screen
                name="User"
                component={User}
            />
            <stackRoutes.Screen
                name="Wallet"
                component={Wallet}
            />
            <stackRoutes.Screen
                name="TicketsShop"
                component={TicketsShop}
            />
            <stackRoutes.Screen
                name="Dispositivo"
                component={Dispositivo}
            />

        </stackRoutes.Navigator>
    )
}
export default AppRoutes
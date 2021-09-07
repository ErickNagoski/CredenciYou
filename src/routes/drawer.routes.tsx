import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../pages/Home";
import { Dispositivos } from "../pages/Dispositivos";
import { Cards } from "../pages/Cards";
import { Health } from "../pages/Health";
import { Settings } from "../pages/Settings";




const drawerRoutes = createDrawerNavigator();

const AppRoutes: React.FC = ()=>{
    return(
        <drawerRoutes.Navigator
            screenOptions={{
                headerShown: false,
            }}>

            <drawerRoutes.Screen
                name="Home"
                component={Home}
            />
            <drawerRoutes.Screen
            name="Dipositivos"
            component={Dispositivos}
            />
            <drawerRoutes.Screen
            name="Cartões"
            component={Cards}
            />
            <drawerRoutes.Screen
            name="Saúde"
            component={Health}
            />
            <drawerRoutes.Screen
            name="Configurações"
            component={Settings}
            />

        </drawerRoutes.Navigator>

    )
}

export default AppRoutes;
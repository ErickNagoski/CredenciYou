import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./stack.routes";
import DrawerRoutes from './drawer.routes';

const Routes =()=>(
    <NavigationContainer>
        <StackRoutes/>
    </NavigationContainer>
)

export default Routes
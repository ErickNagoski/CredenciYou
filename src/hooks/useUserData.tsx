import React, { useState, useContext, createContext } from "react";
import { UserProps } from "../pages/Home";


const userDataContext = createContext({});
export default function userDataProvider({ children }): JSX.Element {
    const [userData, setUserData] = useState<UserProps>();

    return (
        <userDataContext.Provider
            value={{ userData, setUserData }}
        >{children}</userDataContext.Provider>
    );
}

export function useUserData() {
    const context = useContext(userDataContext);
    const { userData, setUserData } = context;
    return { userData, setUserData }
}
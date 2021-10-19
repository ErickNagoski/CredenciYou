import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SessionProps{
    email:"string",
    password:"string",
}

export async function saveSession(email: string, password: string, uuid:any) {
    let storageSession = [email, password, uuid];
    
    //transforma a lista em String JSON novamente
    const jsonString = (JSON.stringify(storageSession))

    //salva a lista com o novo item
    await AsyncStorage.setItem("@Credenciyou:Session", jsonString);
    console.log("salvo")
}

export async function loadSession(): Promise<SessionProps> {
    //Recupera a lista salva
    let storageSession;
    try {
        const storageJson = await AsyncStorage.getItem("@Credenciyou:Session");
        storageSession = storageJson ? await JSON.parse(storageJson) : "erro";
    } catch (error) {
        storageSession=[]
        console.log("Arquivo vazio")
    }
    
    console.log(storageSession)
    return storageSession
    
}

export async function clearStorage() {
    // await AsyncStorage.setItem("@Credenciyou:Session", JSON.stringify([]));
    await AsyncStorage.clear();
    console.log("Reset")

}
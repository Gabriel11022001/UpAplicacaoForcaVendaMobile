import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text } from "react-native"
import cores from "../cores";
import { useEffect } from "react";

const SplashScreen = (props) => {

    const redirecionarUsuarioTelaLogin = () => {
        // depois de 3 segundos, redirecionar o usuário para a tela de login
        setTimeout(() => {
            props.navigation.navigate("login");
        }, 3000);
    }

    useEffect(() => {
        redirecionarUsuarioTelaLogin();
    }, []);

    return <SafeAreaView style={ estilosSplashScreen.splashScreen }>
        <Image source={ require("../../../assets/logo_app.png") } />
        <Text style={ estilosSplashScreen.textoSejaBemVindo }>Seja bem vindo...</Text>
        <ActivityIndicator size="large" color={ cores.branco } />
    </SafeAreaView>
}

const estilosSplashScreen = StyleSheet.create({
    splashScreen: {
        backgroundColor: cores.fundoSplashScreen,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    textoSejaBemVindo: {
        color: cores.branco,
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20
    }
});

export default SplashScreen;
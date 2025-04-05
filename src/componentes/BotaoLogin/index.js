import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import cores from "../../views/cores";

export default function BotaoLogin({ textoBotao, carregando, habilitado, onRealizarLogin }) {

    return <TouchableOpacity
        disabled={ !habilitado }
        style={ [ estilosBotaoLogin.botaoLogin, habilitado ? estilosBotaoLogin.botaoLoginHabilitado : estilosBotaoLogin.botaoLoginDesabilitado ] }
        onPress={ () => {
            onRealizarLogin();
        } } >
        { carregando ? <ActivityIndicator color={ cores.branco } size={ 30 } /> : <Text
            style={ [
                estilosBotaoLogin.texto,
                habilitado ? estilosBotaoLogin.textoHabilitado : estilosBotaoLogin.textDesabilitado
            ] } >{ textoBotao }</Text> } 
    </TouchableOpacity>
}

const estilosBotaoLogin = StyleSheet.create({
    botaoLogin: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        marginTop: 25,
        marginBottom: 20,
        borderRadius: 30,
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    botaoLoginHabilitado: {
        backgroundColor: cores.principal
    },
    botaoLoginDesabilitado: {
        backgroundColor: cores.corBordas,
        opacity: 0.7
    },
    texto: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    },
    textoHabilitado: {
        color: cores.branco
    },
    textDesabilitado: {
        color: cores.branco
    }
});
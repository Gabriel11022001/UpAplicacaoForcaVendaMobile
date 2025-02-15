import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";

const Botao = ({ textoBotao, onPressionar, carregando = false }) => {

    return (
        <View style={ estilosBotao.containerBotao }>
            <TouchableOpacity style={ estilosBotao.botao } onPress={ onPressionar } >
                { carregando ? <ActivityIndicator color={ cores.branco } size={ 30 } /> : <Text style={ estilosBotao.textoBotao }>{ textoBotao }</Text> }
            </TouchableOpacity>
        </View>
    );
}

const estilosBotao = StyleSheet.create({
    containerBotao: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    botao: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        backgroundColor: cores.principal,
        height: 70,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    textoBotao: {
        color: cores.branco,
        fontSize: 20,
        fontWeight: "bold"
    },
    iconeBotao: {

    }
});

export default Botao;
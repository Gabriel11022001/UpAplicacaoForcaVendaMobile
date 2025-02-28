import { StyleSheet, Text, TouchableOpacity } from "react-native";
import cores from "../../views/cores";

export default function BotaoFundoTransparente({ textoBotao, onPressionar, margemBaixo }) {

    return (
        <TouchableOpacity
            style={ [
                estilosBotaoFundoTransparente.botaoFundoTransparente,
                {
                    marginBottom: margemBaixo
                }
            ] }
            onPress={ onPressionar } >
            <Text style={ estilosBotaoFundoTransparente.textoBotao }>{ textoBotao }</Text>
        </TouchableOpacity>
    );
}

const estilosBotaoFundoTransparente = StyleSheet.create({
    botaoFundoTransparente: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: cores.principal,
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        height: 70,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    textoBotao: {
        color: cores.principal,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    }
});
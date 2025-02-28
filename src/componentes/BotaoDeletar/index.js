import { StyleSheet, Text, TouchableOpacity } from "react-native";
import cores from "../../views/cores";

export default function BotaoDeletar({ textoBotao, onDeletar, margemBaixo }) {

    return (
        <TouchableOpacity
            style={ [
                estilosBotaoDeletar.botaoDeletar,
                { marginBottom: margemBaixo }
            ] } 
            onPress={ onDeletar }>
                <Text style={ estilosBotaoDeletar.textoBotaoDeletar }>{ textoBotao }</Text>
        </TouchableOpacity>
    );
}

const estilosBotaoDeletar = StyleSheet.create({
    botaoDeletar: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        height: 70,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: cores.erro
    },
    textoBotaoDeletar: {
        color: cores.branco,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    }
});
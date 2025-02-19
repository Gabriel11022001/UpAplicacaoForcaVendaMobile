import { StyleSheet, Text } from "react-native";
import cores from "../../views/cores";

export default function FeedbackErro({ mensagem, apresentar }) {

    if (!apresentar) {

        return null;
    }

    return <Text style={ estilosFeedbackErro.feedbackErroCampo }>{ mensagem }</Text>
}

const estilosFeedbackErro = StyleSheet.create({
    feedbackErroCampo: {
        color: cores.erro,
        fontWeight: "bold",
        fontSize: 16,
        marginStart: "5%",
        marginTop: 7
    }
});
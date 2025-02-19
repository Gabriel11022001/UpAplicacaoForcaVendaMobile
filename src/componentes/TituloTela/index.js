import { StyleSheet, Text } from "react-native";
import cores from "../../views/cores";

export default function TituloTela({ titulo }) {

    return (
        <Text style={ estilosTituloTela.tituloTela }>
            { titulo }
        </Text>
    );
}

const estilosTituloTela = StyleSheet.create({
    tituloTela: {
        fontSize: 20,
        fontWeight: "bold",
        color: cores.principal,
        marginTop: 20,
        marginStart: "5%",
        textTransform: "uppercase"
    }
});
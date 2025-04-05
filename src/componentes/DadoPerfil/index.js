import { StyleSheet, Text, View } from "react-native";
import cores from "../../views/cores";

export default function DadoPerfil({
    labelDado,
    dado
}) {

    return <View style={ estilosDadoPerfil.container }>
        <Text style={ estilosDadoPerfil.labelDado }>{ labelDado }</Text>
        <Text style={ estilosDadoPerfil.dado }>{ dado }</Text>
    </View>
}

const estilosDadoPerfil = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20
    },
    labelDado: {
        color: cores.preto,
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 15
    },
    dado: {
        color: cores.preto,
        fontSize: 15
    }
});
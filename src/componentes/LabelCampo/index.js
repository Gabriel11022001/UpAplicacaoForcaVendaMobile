import { StyleSheet } from "react-native";
import { Text } from "react-native";
import cores from "../../views/cores";

export default function LabelCampo({ campo, obrigatorio = false, margemTopo = 0 }) {

    return <Text style={ [
        estilosLabelCampo.labelCampo,
        { marginTop: margemTopo }
    ] }>{ campo }{ obrigatorio ? "*" : false }</Text>
}

const estilosLabelCampo = StyleSheet.create({
    labelCampo: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 16,
        marginStart: "5%"
    }
});
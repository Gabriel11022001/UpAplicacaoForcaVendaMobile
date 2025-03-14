import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";

export default function RadioBotao({ titulo, selecionado, onSelecionar }) {

    return (
        <View style={ estilosRadioBotao.radioBotaoContainer }>
            <Text style={ estilosRadioBotao.textoTitulo }>{ titulo }</Text>
            <TouchableOpacity
                style={ [
                    estilosRadioBotao.radioBotao,
                    selecionado ? estilosRadioBotao.selecionado : estilosRadioBotao.naoSelecionado
                ] }
                onPress={ () => {

                    if (selecionado) {
                        onSelecionar(false);
                    } else {
                        onSelecionar(true);
                    }

                } } />
        </View>
    );
}

const estilosRadioBotao = StyleSheet.create({
    radioBotaoContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    radioBotao: {
        width: 20,
        height: 20,
        borderRadius: "100%",
        marginStart: 10
    },
    textoTitulo: {
        color: cores.preto,
        fontWeight: "bold",
        fontSize: 16
    },
    selecionado: {
        backgroundColor: cores.principal
    },
    naoSelecionado: {
        backgroundColor: cores.corBordas
    }
});
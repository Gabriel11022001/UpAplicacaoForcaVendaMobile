import { StyleSheet, Text, View } from "react-native";
import cores from "../../views/cores";
import { ActivityIndicator } from "react-native";

export default function LoaderCarregamento({ mensagem, apresentar }) {

    if (!apresentar) {

        return false;
    }

    return <View style={ estilosLoaderCarregamento.loaderCarregamento }>
        <ActivityIndicator color={ cores.principal } size={ 50 } />
        <Text style={ estilosLoaderCarregamento.mensagemCarregamento }>{ mensagem }</Text>
    </View>
}

const estilosLoaderCarregamento = StyleSheet.create({
    loaderCarregamento: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: cores.corFundoTelas,
        zIndex: 999999999
    },
    mensagemCarregamento: {
        color: cores.preto,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        marginTop: 10
    }
});
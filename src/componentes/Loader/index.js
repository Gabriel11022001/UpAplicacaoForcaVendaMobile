import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import cores from "../../views/cores";

export default function Loader({ mensagem }) {

    return (
        <View style={ estilosLoader.loader }>
            <ActivityIndicator color={ cores.branco } size={ 70 } />
            <Text style={ estilosLoader.mensagem }>{ mensagem }</Text>
        </View>
    );
}

const estilosLoader = StyleSheet.create({
    loader: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: cores.principal,
        zIndex: 99999999999,
        padding: 30
    },
    mensagem: {
        color: cores.branco,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        fontSize: 18
    }
});
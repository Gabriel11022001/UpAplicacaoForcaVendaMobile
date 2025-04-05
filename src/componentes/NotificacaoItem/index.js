import { Easing, StyleSheet, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import { FontAwesome5 } from 'react-native-vector-icons';
import { Text } from "react-native";
import { useState } from "react";

export default function NotificacaoItem({ tituloNotificacao, textoNotificacao, status, onVisualizarNotificacao }) {

    const [ expandir, setExpandir ] = useState(false);

    return (
        <View style={ estilosNotificacaoItem.notificacaoItem }>
            <View style={ estilosNotificacaoItem.cotainerTopoNotificacao }>
                <FontAwesome5 name="bell" size={ 20 } color={ cores.principal } />
                <View style={ estilosNotificacaoItem.separador } />
                <Text style={ estilosNotificacaoItem.tituloNotificacao }>{ tituloNotificacao }</Text>
            </View>
            <View style={ estilosNotificacaoItem.containerBaixoNotificacao }>
                <TouchableOpacity
                    onPress={ () => {
                        setExpandir(!expandir);
                        onVisualizarNotificacao();
                    } }>
                        <Text style={ estilosNotificacaoItem.textoVisualizar }>Visualizar</Text>
                </TouchableOpacity>
                <View style={ [ { display: expandir ? "flex" : "none" } ] }>
                    <Text>Atenção</Text>
                    <Text>{ textoNotificacao }</Text>
                </View>
            </View>
        </View>
    );
}

const estilosNotificacaoItem = StyleSheet.create({
    notificacaoItem: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        marginTop: 10,
        padding: 20,
        backgroundColor: cores.branco,
        borderRadius: 20,
        flexDirection: "column"
    },
    tituloNotificacao: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 16
    },
    separador: {
        width: 2,
        height: "100%",
        backgroundColor: cores.principal,
        marginStart: 10,
        marginEnd: 10
    },
    cotainerTopoNotificacao: {
        width: "100%",
        flexDirection: "row"
    },
    containerBaixoNotificacao: {
        width: "100%",
        marginTop: 10,
        padding: 20,
        backgroundColor: cores.principal,
        borderRadius: 20
    },
    textoVisualizar: {
        color: cores.branco,
        fontWeight: "bold",
        textTransform: "uppercase"
    }
});
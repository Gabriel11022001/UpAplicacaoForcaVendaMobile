import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import cores from "../../views/cores";
import { useState } from "react";
import { FontAwesome5 } from 'react-native-vector-icons';

export default function FiltroProdutos(props) {

    const [ expandirFiltro, setExpandirFiltro ] = useState(false);

    return (
        <View style={ estilosFiltroProdutos.filtroProdutos }>
            { /** topo do filtro */ }
            <TouchableOpacity
                style={ estilosFiltroProdutos.topoFiltroProdutos }
                onPress={ () => {
                    setExpandirFiltro(!expandirFiltro);
                } } >
                <Text style={ estilosFiltroProdutos.textoTopoFiltro }>Filtro</Text>
                <FontAwesome5 name={ expandirFiltro ? "angle-up" : "angle-down" } size={ 30 } color={ cores.principal } />
            </TouchableOpacity>
            { /** corpo do filtro */ }
            <View style={ [ estilosFiltroProdutos.corpoFiltro, { display: expandirFiltro ? "flex" : "none" } ] }>

            </View>
        </View>
    );
}

const estilosFiltroProdutos = StyleSheet.create({
    filtroProdutos: {
        backgroundColor: cores.branco,
        borderRadius: 10,
        position: "absolute",
        top: 20,
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        zIndex: 9999999999,
        borderColor: cores.corBordas,
        borderWidth: 2,
        borderStyle: "dashed"
    },
    topoFiltroProdutos: {
        width: "100%",
        paddingStart: 20,
        paddingEnd: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textoTopoFiltro: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 16
    },
    corpoFiltro: {
        width: "100%",
        padding: 20,
        flexDirection: "column"
    }
});
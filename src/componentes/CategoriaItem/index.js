import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import { FontAwesome5 } from 'react-native-vector-icons';

export default function CategoriaItem(props) {

    return (
        <TouchableOpacity
            style={ estilosCategoriaItem.categotiaItemEstilo }
            onPress={ props.onVisualizar } >
                <FontAwesome5 name="tags" size={ 30 } color={ cores.principal } />
                <View style={ estilosCategoriaItem.seperador } />
                <View>
                    <Text style={ estilosCategoriaItem.nomeCategoria }>{ props.nomeCategoria }</Text>
                    <Text style={ [
                        estilosCategoriaItem.statusCategoria,
                        props.statusCategoria == "Ativo" ? estilosCategoriaItem.statusCategoriaAtivo : estilosCategoriaItem.statusCategoriaInativo
                    ] } >{ props.statusCategoria }</Text>
                </View>
        </TouchableOpacity>
    );
}

const estilosCategoriaItem = StyleSheet.create({
    categotiaItemEstilo: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        marginTop: 20,
        backgroundColor: cores.branco,
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    seperador: {
        width: 2,
        height: "100%",
        marginStart: 10,
        marginEnd: 10,
        backgroundColor: cores.principal
    },
    nomeCategoria: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
        flexWrap: "wrap",
        maxWidth: "100%"
    },
    statusCategoria: {
        marginTop: 10,
        padding: 10,
        color: cores.branco,
        textAlign: "center",
        borderRadius: 20,
        fontWeight: "bold",
        fontSize: 16,
        maxWidth: 100
    },
    statusCategoriaAtivo: {
        backgroundColor: cores.sucesso
    },
    statusCategoriaInativo: {
        backgroundColor: cores.erro
    }
});
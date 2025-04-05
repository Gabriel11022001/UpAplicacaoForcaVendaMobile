import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";

export default function SelecionarOpcao({ opcaoSelecionada, apresentar, carregando, opcoes, onSelecionarOpcao, onFechar }) {

    if (!apresentar) {

        return false;
    }

    return <View style={ estilosSelecionarOpcao.containerSelecionarOpcao }>
        <View style={ estilosSelecionarOpcao.containerFechar }>
            <TouchableOpacity
                onPress={ () => {
                    onFechar();
                } }>
                <Text>Fechar</Text>
            </TouchableOpacity>
        </View>
        { carregando ? <View>
            <ActivityIndicator
                size={ 50 }
                color={ cores.branco } />
            <Text style={ estilosSelecionarOpcao.textoLoaderCarregando }>Carregando, aguarde...</Text>
        </View> : <FlatList
            style={ { width: "100%" } }
            data={ opcoes }
            renderItem={ ({ item }) => {

                return <TouchableOpacity
                style={ estilosSelecionarOpcao.opcaoSelecionarItem }
                key={ item.key }
                onPress={ () => {
                    onSelecionarOpcao(item);
                } } >
                    <Text style={ estilosSelecionarOpcao.textoOpcao }>{ item.valor }</Text>
                </TouchableOpacity>
            } } /> }        
    </View>
}

const estilosSelecionarOpcao = StyleSheet.create({
    containerSelecionarOpcao: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: cores.corFundoDialogsELoaders,
        zIndex: 999999999
    },
    containerFechar: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        marginEnd: 20
    },
    opcaoSelecionarItem: {
        width: "90%",
        marginEnd: "5%",
        marginStart: "5%",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: cores.branco,
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    textoLoaderCarregando: {
        color: cores.branco,
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
        textAlign: "center"
    },
    textoOpcao: {
        color: cores.principal,
        fontSize: 16,
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "bold"
    }
});
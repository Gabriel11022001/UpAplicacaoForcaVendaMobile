import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import { FontAwesome5 } from 'react-native-vector-icons';

export default function ProdutoItem(props) {

    const fotoProduto = props.fotoProduto != null && props.fotoProduto != "" 
    ? props.fotoProduto : "https://cdn.pixabay.com/photo/2016/10/03/03/00/camera-1710849_1280.png";

    return (
        <TouchableOpacity
            style={ estilosProdutoItem.produtoItem }
            onPress={ () => {
                props.onVisualizarProduto();
            } } >
                <Image style={ estilosProdutoItem.fotoProduto } source={ {
                    uri: fotoProduto
                } } />
                <View style={ estilosProdutoItem.containerDadosProduto }>
                    <Text style={ estilosProdutoItem.nomeProduto } >{ props.nomeProduto }</Text>
                    <Text style={ estilosProdutoItem.precoProduto }>R${ props.precoVenda.toFixed(2) }</Text>
                    <Text style={ [
                        estilosProdutoItem.status,
                        props.status == "Em estoque" ? estilosProdutoItem.statusEmEstoque : estilosProdutoItem.statusSemEstoque
                    ] }>{ props.status }</Text>
                </View>
                <FontAwesome5 name="angle-right" size={ 20 } color={ cores.principal } style={ { marginEnd: 10 } } />
        </TouchableOpacity>
    );
}

const estilosProdutoItem = StyleSheet.create({
    produtoItem: {
        backgroundColor: cores.branco,
        borderRadius: 20,
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fotoProduto: {
        width: 100,
        height: "100%",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    containerDadosProduto: {
        padding: 20,
        flex: 1
    },
    nomeProduto: {
        color: cores.principal,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    precoProduto: {
        color: cores.preto,
        fontWeight: "bold",
        marginTop: 5
    },
    status: {
        fontWeight: "bold",
        marginTop: 5
    },
    statusEmEstoque: {
        color: cores.preto
    },
    statusSemEstoque: {
        color: cores.erro
    }
});
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Tela from "../../componentes/Tela";
import { useEffect, useState } from "react";
import cores from "../cores";
import BotaoFundoTransparente from "../../componentes/BotaoFundoTransparente";
import BotaoDeletar from "../../componentes/BotaoDeletar";
import BottomSheetConfirmar from "../../componentes/BottomSheetConfirmar";
import Loader from "../../componentes/Loader";
import HistoricoEstoque from "../../componentes/HistoricoEstoque";
import Strings from "../../utils/strings";

export default function DetalhesProduto(props) {

    const produtoId = props.route.params != null ? props.route.params.idProduto : null;
    const [ produto, setProduto ] = useState({});
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ apresentarBottomSheetConfirmarDeletarProduto, setApresentarBottomSheetConfirmarDeletarProduto ] = useState(false);
    const [ msgLoader, setMsgLoader ] = useState(Strings.loaderConsultandoProdutoServidor);

    const buscarDetalhesProduto = async () => {
        console.log("Id produto consultar no back-end: " + produtoId);
    }

    const editarProduto = () => {

    }

    const confirmarDeletarProduto = () => {
        setApresentarBottomSheetConfirmarDeletarProduto(true);
    }

    const deletarProduto = async () => {
        setApresentarBottomSheetConfirmarDeletarProduto(false);
        setApresentarLoader(true);
        setMsgLoader(Strings.loaderDeletandoProdutoServidor);

        try {
            
        } catch (e) {

        }

    }

    useEffect(() => {
        buscarDetalhesProduto();
    }, []);

    return (
        <Tela>
            { apresentarLoader ? <Loader mensagem={ msgLoader } /> : false }
            { apresentarBottomSheetConfirmarDeletarProduto ? <BottomSheetConfirmar
                mensagem={ Strings.desejaDeletarProduto }
                operacao="deletar"
                onOperacaoBottomSheet={ deletarProduto }
                onCancelar={ () => {
                    setApresentarBottomSheetConfirmarDeletarProduto(false);
                } } /> : false }
            <ScrollView>
                <Image style={estilosDetalhesProduto.imagemProduto} source={{
                    uri: "https://cdn.pixabay.com/photo/2025/02/22/17/45/food-9424463_1280.jpg"
                }} />
                { /** detalhes do produto */}
                <View style={estilosDetalhesProduto.containerDetalhesProduto}>
                    <Text style={estilosDetalhesProduto.tituloContainer}>Detalhes do produto</Text>
                    <View style={[
                        estilosDetalhesProduto.containerDetalhesItem,
                        { marginTop: 20 }
                    ]}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Produto</Text>
                        <Text>Nome do produto</Text>
                    </View>
                    <View style={estilosDetalhesProduto.containerDetalhesItem}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Preço de venda</Text>
                        <Text>R$12.99</Text>
                    </View>
                    <View style={estilosDetalhesProduto.containerDetalhesItem}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Status</Text>
                        <Text>Em estoque</Text>
                    </View>
                    <View style={estilosDetalhesProduto.containerDetalhesItem}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Unidades em estoque</Text>
                        <Text>1000 unidades</Text>
                    </View>
                    <View style={estilosDetalhesProduto.containerDescricao}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Descrição</Text>
                        <Text>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.</Text>
                    </View>
                </View>
                <HistoricoEstoque historicoEstoque={ [
                    {
                        historicoProdutoId: 1,
                        operacao: "entrada",
                        data: "11/02/2020"
                    },
                    {
                        historicoProdutoId: 2,
                        operacao: "entrada",
                        data: "11/02/2021"
                    },
                    {
                        historicoProdutoId: 3,
                        operacao: "saida",
                        data: "11/02/2020"
                    },
                    {
                        historicoProdutoId: 4,
                        operacao: "saida",
                        data: "11/02/2020"
                    },
                    {
                        historicoProdutoId: 5,
                        operacao: "entrada",
                        data: "11/02/2020"
                    }
                ] } />
                { /** editar produto */}
                <BotaoFundoTransparente textoBotao="Editar" onPressionar={() => {
                    editarProduto();
                }} />
                { /** deletar produto */}
                <BotaoDeletar textoBotao="Deletar" onDeletar={() => confirmarDeletarProduto()} margemBaixo={70} />
            </ScrollView>
        </Tela>
    );
}

const estilosDetalhesProduto = StyleSheet.create({
    imagemProduto: {
        width: "100%",
        height: 200
    },
    containerDetalhesProduto: {
        backgroundColor: cores.branco,
        padding: 20,
        borderRadius: 10,
        width: "95%",
        marginStart: "2.5%",
        marginEnd: "2.5%",
        marginTop: 20,
        marginBottom: 20
    },
    tituloContainer: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 16
    },
    containerDetalhesItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
        flexWrap: "wrap"
    },
    containerDescricao: {
        marginTop: 30
    },
    tituloContainerItem: {
        color: cores.preto,
        fontWeight: "bold"
    }
});
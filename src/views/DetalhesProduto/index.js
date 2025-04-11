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
import apresentarAlertaErro from "../../utils/apresentarAlertaErro";
import buscarProdutoService from "../../service/buscarProdutoService";
import deletarProdutoService from "../../service/deletarProduto";

export default function DetalhesProduto(props) {

    const produtoId = props.route.params != null ? props.route.params.idProduto : null;
    const [ produto, setProduto ] = useState({});
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ apresentarBottomSheetConfirmarDeletarProduto, setApresentarBottomSheetConfirmarDeletarProduto ] = useState(false);
    const [ msgLoader, setMsgLoader ] = useState(Strings.loaderConsultandoProdutoServidor);

    // buscar detalhes do produto no servidor
    const buscarDetalhesProduto = async () => {

        if (produtoId != null) {
            console.log("Id produto consultar no back-end: " + produtoId);
        
            setApresentarLoader(true);

            try {   
                const respConsultarProduto = await buscarProdutoService(produtoId);

                setApresentarLoader(false);

                if (respConsultarProduto.data.msg == "Produto encontrado com sucesso!") {
                    const prodServidor = { ...respConsultarProduto.data.conteudo };

                    const produtoDetalhes = {
                        id: prodServidor.produtoId,
                        nome: prodServidor.nome,
                        precoVenda: prodServidor.precoVenda,
                        status: prodServidor.ativo,
                        descricao: prodServidor.descricao,
                        foto: prodServidor.urlFotoProduto,
                        precoCompra: prodServidor.precoCompra,
                        categoria: prodServidor.categoriaDTO.nome,
                        estoque: prodServidor.estoque
                    };

                    setProduto(produtoDetalhes);
                }

            } catch (e) {
                setApresentarLoader(false);
                apresentarAlertaErro("Erro ao tentar-se buscar os dados do produto no servidor.");
                console.log(e);
            }
            
        }

    }

    const editarProduto = () => {

    }

    const confirmarDeletarProduto = () => {
        setApresentarBottomSheetConfirmarDeletarProduto(true);
    }

    // deletar produto no servidor
    const deletarProduto = async () => {
        setApresentarBottomSheetConfirmarDeletarProduto(false);
        setApresentarLoader(true);
        setMsgLoader(Strings.loaderDeletandoProdutoServidor);

        try {
            const respDeletarProduto = await deletarProdutoService(produtoId);

            setApresentarLoader(false);

            if (respDeletarProduto.data.msg == "Produto deletado com sucesso!") {
                // redirecionar o usuário para a tela de listagem de produtos
                props.navigation.navigate("produtos", {
                    retornouTelaDeletarProduto: true
                });
            } else {
                // apresentar alerta de erro
                apresentarAlertaErro(respDeletarProduto.data.msg);
            }

        } catch (e) {
            setApresentarLoader(false);
            apresentarAlertaErro("Erro ao tentar-se deletar o produto.");
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
            { !apresentarLoader ? <ScrollView>
                <Image style={estilosDetalhesProduto.imagemProduto} source={{
                    uri: produto.foto != "" && produto.foto != null ? produto.foto 
                    : "https://cdn.pixabay.com/photo/2016/10/03/03/00/camera-1710849_1280.png"
                }} />
                { /** detalhes do produto */}
                <View style={estilosDetalhesProduto.containerDetalhesProduto}>
                    <Text style={estilosDetalhesProduto.tituloContainer}>Detalhes do produto</Text>
                    <View style={[
                        estilosDetalhesProduto.containerDetalhesItem,
                        { marginTop: 20 }
                    ]}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Produto</Text>
                        <Text>{ produto.nome }</Text>
                    </View>
                    <View style={estilosDetalhesProduto.containerDetalhesItem}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Preço de venda</Text>
                        <Text>{ `R$${ produto.precoVenda }` }</Text>
                    </View>
                    <View style={estilosDetalhesProduto.containerDetalhesItem}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Status</Text>
                        <Text>{ produto.status ? "Em estoque" : "Não possui unidades em estoque" }</Text>
                    </View>
                    <View style={estilosDetalhesProduto.containerDetalhesItem}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Unidades em estoque</Text>
                        <Text>{ `${ produto.estoque } unidades` }</Text>
                    </View>
                    <View style={estilosDetalhesProduto.containerDescricao}>
                        <Text style={estilosDetalhesProduto.tituloContainerItem}>Descrição</Text>
                        <Text>{ produto.descricao }</Text>
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
            </ScrollView> : false }
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
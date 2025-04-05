import { useEffect, useState } from "react";
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import Tela from "../../componentes/Tela";
import FiltroProdutos from "../../componentes/FiltroProdutos";
import { FlatList, Text } from "react-native";
import ProdutoItem from "../../componentes/ProdutoItem";
import Strings from "../../utils/strings";
import LoaderCarregamento from "../../componentes/LoaderCarregamento";
import apresentarAlertaErro from "../../utils/apresentarAlertaErro";
import consultarProdutosService from "../../service/consultarProdutosService";

const Produtos = (props) => {

    const [ produtos, setProdutos ] = useState([]);
    const [ apresentarLoaderCarregamento, setApresentarLoaderCarregamento ] = useState(false);
    const [ paginaAtual, setPaginaAtual ] = useState(1);
    const elementosPorPagina = 10;

    // consultar produtos na base de dados
    const buscarProdutos = async () => {
        setApresentarLoaderCarregamento(true);

        try {
            const respConsultarProdutos = await consultarProdutosService(
                paginaAtual,
                elementosPorPagina
            );

            setApresentarLoaderCarregamento(false);

            if (respConsultarProdutos.data.ok) {

                if (respConsultarProdutos.data.msg == "Produtos encontrados com sucesso!") {
                    setPaginaAtual(paginaAtual + 1);

                    const produtosArray = respConsultarProdutos.data.conteudo.map((produto) => {

                        return {
                            id: produto.produtoId,
                            nome: produto.nome,
                            foto: produto.urlFotoProduto,
                            precoVenda: produto.precoVenda,
                            status: produto.ativo ? "Em estoque" : "Sem estoque"
                        };
                    });

                    const produtosAtuais = produtos;

                    console.log(produtosAtuais.concat(produtosArray));

                    setProdutos(produtosAtuais.concat(produtosArray));
                }

            } else {
                // apresentar alerta de erro
            }

        } catch (e) {
            setApresentarLoaderCarregamento(false);
            apresentarAlertaErro("Erro ao tentar-se consultar os produtos.");
        }

    }

    const listarProtudos = () => {

        if (produtos.length == 0) {

            return <Text>{ Strings.naoExistemProdutosCadastrados }</Text>
        }

        return <FlatList
            style={ {
                marginTop: 80
            } }
            data={ produtos }
            renderItem={ ({ item }) => {

                return <ProdutoItem
                    nomeProduto={ item.nome }
                    precoVenda={ item.precoVenda }
                    status={ item.status }
                    fotoProduto={ item.foto }
                    onVisualizarProduto={ () => {
                        // visualiza detalhes do produto
                        props.navigation.navigate("detalhes_produto", { idProduto: item.id });
                    } } />
            } }
            key={ produtos.id } />
    }

    // apresentar loader de carregamento dos produtos
    const apresentarLoader = () => {

        return <LoaderCarregamento apresentar={ true } mensagem={ Strings.loader } />
    }

    useEffect(() => {
        buscarProdutos();
    }, []);

    return (
        <Tela>
            <NavegacaoInferior onRedirecionar={ (telaRedirecionar) => {
                props.navigation.navigate(telaRedirecionar)
            } } />
            { !apresentarLoaderCarregamento ? <FiltroProdutos /> : false }
            { apresentarLoaderCarregamento ? apresentarLoader() : listarProtudos() }
        </Tela>       
    );
}

export default Produtos;
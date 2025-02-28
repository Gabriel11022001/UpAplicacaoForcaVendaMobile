import { useEffect, useState } from "react";
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import Tela from "../../componentes/Tela";
import FiltroProdutos from "../../componentes/FiltroProdutos";
import { FlatList, Text } from "react-native";
import ProdutoItem from "../../componentes/ProdutoItem";

const Produtos = (props) => {

    const [ produtos, setProdutos ] = useState([
        {
            id: 1,
            nome: "Coca cola de 2 litros",
            precoVenda: 12.99,
            status: "Em estoque",
            foto: "https://cdn.pixabay.com/photo/2025/02/22/17/45/food-9424463_1280.jpg"
        }
    ]);
    const [ apresentarLoaderCarregamento, setApresentarLoaderCarregamento ] = useState(false);

    const buscarProdutos = async () => {

    }

    const listarProtudos = () => {

        if (produtos.length == 0) {

            return <Text>Não existem produtos cadastrados no banco de dados.</Text>
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
            key={ produtos.produtoId } />
    }

    const apresentarLoader = () => {

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
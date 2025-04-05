import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Tela from "../../componentes/Tela";
import { useEffect, useState } from "react";
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import CategoriaItem from "../../componentes/CategoriaItem";
import cores from "../cores";
import Strings from "../../utils/strings";
import consultarCategoriasService from "../../service/consultaCategoriasService";
import buscarCategoriaService from "../../service/buscarCategoriaService";
import Botao from "../../componentes/Botao";

const GestaoCategorias = ({ navigation }) => {

    const [ categorias, setCategorias ] = useState([]);
    const [ apresentarLoader, setApresentarLoader ] = useState(true);
    const [ paginaAtual, setPaginaAtual ] = useState(1);
    const [ apresentarModalVisualizarCategoria, setApresentarModalVisualizarCategoria ] = useState(false);
    const categoriasPorPagina = 10;
    const [ categoriaVisualizar, setCategoriaVisualizar ] = useState(null);

    const buscarCategorias = async () => {
        console.log("Consultando categorias...");

        setApresentarLoader(true);

        try {
            const respConsultarCategorias = await consultarCategoriasService(paginaAtual, categoriasPorPagina);

            setApresentarLoader(false);

            if (respConsultarCategorias.data.ok) {

                if (respConsultarCategorias.data.msg == "Categorias encontradas com sucesso!") {
                    const novasCategorias = respConsultarCategorias.data.conteudo.map((categoria) => {

                        return { id: categoria.categoriaId, nomeCategoria: categoria.nome, ativo: categoria.status };
                    });

                    const categoriasAtuais = categorias;

                    setCategorias(categoriasAtuais.concat(novasCategorias));
                    setPaginaAtual(paginaAtual + 1);
                }

            } else {
                // erro ao tentar-se consultar as categorias
            }

        } catch (e) {
            setApresentarLoader(false);
            // apresentar alerta de erro para o usuário
        }

    }

    const apresentarCategorias = () => {

        if (categorias.length > 0) {

            return <FlatList
                style={ { marginBottom: 120, width: "100%" } }
                data={ categorias }
                renderItem={ ({ item }) => {

                    return <CategoriaItem 
                        nomeCategoria={ item.nomeCategoria }
                        statusCategoria={ item.ativo ? "Ativo" : "Inativo" }
                        onVisualizar={ () => {
                            visualizarCategoria(item.id);
                        } } />
                } }
                onEndReached={ () => {
                    buscarCategorias();
                } }
                onEndReachedThreshold={ 0.1 }
                ListFooterComponent={ () => {

                    if (apresentarLoader) {

                        return <View style={ estilosTelaGestaoCategorias.loaderCarregarCategorias }>
                            <ActivityIndicator color={ cores.principal } size={ 30 } />
                        </View>
                    }

                    return false;
                } } />
        }

        return <Text style={ estilosTelaGestaoCategorias.textoNaoExistemCategoriasCadastradas }>{ Strings.naoExistemCategoriasCadastradas }</Text>
    }

    // visualizar categoria
    async function visualizarCategoria(idCategoriaVisualizar) {
        console.log(`Visualizar categoria: ${ idCategoriaVisualizar }`);

        setApresentarModalVisualizarCategoria(true);

        try {
            const respConsultarCategoria = await buscarCategoriaService(idCategoriaVisualizar);

            if (respConsultarCategoria.status == 200) {

                if (respConsultarCategoria.data.ok) {
                    const categoria = respConsultarCategoria.data.conteudo;
                    setCategoriaVisualizar({
                        nome: categoria.nome,
                        status: categoria.status ? "Ativo" : "Inativo"
                    });
                }

            }

        } catch (e) {
            // apresentar alerta de erro
        }

    }

    useEffect(() => {
        buscarCategorias();
    }, []);

    return (
        <Tela>
            <NavegacaoInferior onRedirecionar={ (telaNavegar) => navigation.navigate(telaNavegar) } />
            <View style={ estilosTelaGestaoCategorias.container }>
                <Modal
                    animationType="slide"
                    transparent={ true }
                    visible={ apresentarModalVisualizarCategoria }
                    onRequestClose={ () => {
                        setApresentarModalVisualizarCategoria(false);
                    } } >
                        <View style={ estilosTelaGestaoCategorias.modalVisualizarCategoria }>
                            <View style={ estilosTelaGestaoCategorias.modalVisualizarCategoriaCorpo }>
                                <Text>Nome da categoria: { categoriaVisualizar != null ? categoriaVisualizar.nome : "" }</Text>
                                <Text>Status da categoria: { categoriaVisualizar != null ? categoriaVisualizar.status : "" }</Text>
                                <Botao textoBotao="Fechar" onPressionar={ () => {
                                    setApresentarModalVisualizarCategoria(false);
                                } } />
                            </View>
                        </View>
                </Modal>
                { apresentarCategorias() }
            </View>
        </Tela>
    );
}

const estilosTelaGestaoCategorias = StyleSheet.create({
    textoNaoExistemCategoriasCadastradas: {
        color: cores.principal,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        padding: 30
    },
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    loaderCarregarCategorias: {
        width: "100%",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    modalVisualizarCategoria: {
        width: "100%",
        height: "100%",
        backgroundColor: cores.corFundoDialogsELoaders,
        alignItems: "center",
        justifyContent: "center"
    },
    modalVisualizarCategoriaCorpo: {
        width: "90%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: cores.branco,
        flexDirection: "column"
    }
});

export default GestaoCategorias;
import { FlatList, StyleSheet, Text, View } from "react-native";
import Tela from "../../componentes/Tela";
import { useEffect, useState } from "react";
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import CategoriaItem from "../../componentes/CategoriaItem";
import cores from "../cores";

const GestaoCategorias = ({ navigation }) => {

    const [ categorias, setCategorias ] = useState([]);
    const [ apresentarLoader, setApresentarLoader ] = useState(true);

    const buscarCategorias = async () => {
        console.log("Buscar categorias...");

        try {
            // gerarCategoriasTeste();
        } catch (e) {
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

                        } } />
                } } />
        }

        return <Text style={ estilosTelaGestaoCategorias.textoNaoExistemCategoriasCadastradas }>Não existem categorias cadastradas na base de dados.</Text>
    }

    const gerarCategoriasTeste = () => {
        const categoriasAuxiliar = [];

        for (let contador = 0; contador < 10; contador++) {
            categoriasAuxiliar.push({
                idCategoria: (contador + 1),
                nomeCategoria: "Categoria de teste " + (contador + 1),
                ativo: contador % 2 == 0 ? true : false
            });
        }

        setCategorias(categoriasAuxiliar);
    }

    useEffect(() => {
        buscarCategorias();
    }, []);

    return (
        <Tela>
            <NavegacaoInferior onRedirecionar={ (telaNavegar) => navigation.navigate(telaNavegar) } />
            <View style={ estilosTelaGestaoCategorias.container }>
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
    }
});

export default GestaoCategorias;
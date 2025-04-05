import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";

export default function HistoricoEstoque({ historicoEstoque }) {

    const apresentarHistorico = () => {

        if (historicoEstoque.length > 0) {

            return historicoEstoque.map(({ historicoProdutoId, operacao, data }) => {

                return <TouchableOpacity
                    style={ estilosHistoricoEstoque.historicoEstoqueItem }
                    key={ historicoProdutoId }>
                        <Text style={ estilosHistoricoEstoque.data }>Data: { data }</Text>
                        <Text style={ {
                            color: operacao == "entrada" ? cores.sucesso : cores.erro
                        } }>Operação: { operacao }</Text>
                </TouchableOpacity>
            });
        }

        return <Text style={ estilosHistoricoEstoque.textoNaoExisteHistoricoEstoque }>Não existe um histórico sobre o produto em questão!</Text>
    }

    return (
        <View style={ estilosHistoricoEstoque.containerHistoricoEstoque }>
            { apresentarHistorico() }
        </View>
    );
}

const estilosHistoricoEstoque = StyleSheet.create({
    containerHistoricoEstoque: {
        width: "95%",
        padding: 20,
        backgroundColor: cores.branco,
        borderRadius: 10,
        marginStart: "2.5%",
        marginEnd: "2.5%",
        alignItems: "center",
        justifyContent: "center"
    },
    textoNaoExisteHistoricoEstoque: {
        color: cores.principal,
        fontWeight: "bold",
        textAlign: "center"
    },
    historicoEstoqueItem: {
        width: "100%",
        padding: 20,
        borderRadius: 20,
        marginTop: 15,
        borderColor: cores.corBordas,
        borderWidth: 1,
        borderStyle: "solid"
    },
    data: {
        color: cores.principal,
        fontWeight: "bold",
        marginBottom: 10
    }
});
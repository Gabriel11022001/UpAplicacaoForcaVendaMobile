import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import { Ionicons } from 'react-native-vector-icons';

export default function ProgressoCadastroCliente({ telaAtual, onRedirecionar }) {

    const telasCadastroCliente = [
        {
            nome: "cadastro_cliente",
            titulo: "Dados básicos",
            icone: "person"
        },
        {
            nome: "cadastro_endereco_cliente",
            titulo: "Endereço",
            icone: "home"
        }
    ];

    return <View style={ estilosProgressoCadastroCliente.progressoCadastroCliente }>
        { telasCadastroCliente.map((tela) => {

            return <TouchableOpacity
                key={ tela.nome }
                style={ estilosProgressoCadastroCliente.opcaoProgresso }
                onPress={ () => {
                    onRedirecionar(tela.nome);
                } }>
                    <Ionicons name={ tela.icone } size={ 20 } color={ telaAtual == tela.nome ? cores.principal : cores.preto } />
                    <Text
                        style={ [
                            estilosProgressoCadastroCliente.textoOpcao,
                            tela.nome == telaAtual ? estilosProgressoCadastroCliente.textOpcaoEstarSelecionado : estilosProgressoCadastroCliente.textoOpcaoSemEstarSelecionado
                        ] }>{ tela.titulo }</Text>
            </TouchableOpacity>
        }) }
    </View>
}

const estilosProgressoCadastroCliente = StyleSheet.create({
    progressoCadastroCliente: {
        width: "100%",
        padding: 10,
        backgroundColor: cores.branco,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    opcaoProgresso: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textoOpcao: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
        marginTop: 7
    },
    textoOpcaoSemEstarSelecionado: {
        color: cores.preto
    },
    textOpcaoEstarSelecionado: {
        color: cores.principal
    }
});
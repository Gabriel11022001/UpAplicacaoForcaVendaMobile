import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from 'react-native-vector-icons';
import cores from "../../views/cores";

export default function ClienteItem({
    cliente,
    onVisualizarDadosCliente,
    onDeletarCliente
}) {

    return <TouchableOpacity
        style={ estilosClienteItem.clienteItem }
        onPress={ () => {
            onVisualizarDadosCliente();
        } } >
            <Ionicons style={ estilosClienteItem.iconeSetaProximo } name="arrow-forward" size={ 20 } color={ cores.principal } />
            { /** topo do card de cliente */ }
            <View style={ estilosClienteItem.viewTopo }>
                <View style={ estilosClienteItem.viewTopoConteudo }>
                    <Ionicons name="person-outline" color={ cores.principal } size={ 30 } />
                    <View style={ estilosClienteItem.separador } />
                    <View>
                        <Text style={ estilosClienteItem.nomeCliente }>{ cliente.nome }</Text>
                        <Text style={ estilosClienteItem.texto }>{ cliente.tipoPessoa == "pf" ? "Pessoa fisica".toUpperCase() : "Pessoa juridica".toUpperCase() }</Text>
                        <Text style={ estilosClienteItem.texto }>{ cliente.telefonePrincipal }</Text>
                        <Text style={ estilosClienteItem.texto }>{ cliente.emailPrincipal }</Text>
                        <Text style={ estilosClienteItem.texto }>{ cliente.documento }</Text>
                        <Text style={ [
                            estilosClienteItem.texto,
                            estilosClienteItem.textoNegrito
                        ] }>{ cliente.cidade }</Text>
                    </View>
                </View>
            </View>
            { /** bottom do card de cliente */ }
            <View style={ estilosClienteItem.viewBottom }>
                <TouchableOpacity
                    onPress={ () => {
                        onDeletarCliente();
                    } }>
                    <AntDesign name="delete" size={ 30 } color={ cores.erro } />
                </TouchableOpacity>
            </View>
    </TouchableOpacity>
}

const estilosClienteItem = StyleSheet.create({
    clienteItem: {
        backgroundColor: cores.branco,
        padding: 10,
        borderRadius: 10,
        width: "95%",
        marginStart: "2.5%",
        marginEnd: "2.5%",
        marginTop: 10,
        marginBottom: 10
    },
    viewTopo: {
        width: "100%"
    },
    separador: {
        width: 2,
        height: "100%",
        backgroundColor: cores.principal,
        marginStart: 10,
        marginEnd: 10
    },
    viewTopoConteudo: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    nomeCliente: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 15
    },
    texto: {
        color: cores.preto,
        fontSize: 14,
        marginTop: 5
    },
    textoNegrito: {
        fontWeight: "bold"
    },
    iconeSetaProximo: {
        position: "absolute",
        top: "50%",
        bottom: "50%",
        right: 10
    },
    viewBottom: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 10
    }
});
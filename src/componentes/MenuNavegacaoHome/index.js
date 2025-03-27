import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import { FontAwesome5, MaterialIcons, Ionicons } from 'react-native-vector-icons';
import Strings from "../../utils/strings";

export default function MenuNavegacaoHome({ navigation, permissoes }) {

    const obterIconeCorreto = (icone) => {

        if (icone == "price-change") {

            return <MaterialIcons name={ icone } size={ 40 } color={ cores.principal } />;
        }

        if (icone == "person-add-outline" || icone == "person-outline") {

            return <Ionicons name={ icone } size={ 40 } color={ cores.principal } />
        }

        return <FontAwesome5 name={ icone } size={ 30 } color={ cores.principal } />;
    }

    const obterOpcoesMenu = () => {

        /*if (permissoes.length == 0) {

            return <Text style={ estilosMenuNavegacaoHome.textoUsuarioNaoPossuiPermissoes }>
                { Strings.usuarioNaoPossuiPermissoesCadastradas }
            </Text>
        }*/

        // mapear as permissões para opções do menu
        const opcoesHabilitadas = permissoes.map((permissao) => {
            const opcao = {};

            /*switch (permissao.nome) {
                case "Cadastro de clientes":
                    opcao.titulo = permissao.nome;
                    opcao.icone = "person-add-outline";
                    opcao.telaRedirecionar = "cadastro_cliente";
                    break;
                case "Gestão de clientes":
                    opcao.titulo = "Clientes";
                    opcao.icone = "person-outline";
                    opcao.telaRedirecionar = "clientes";
                    break;
                case "Cadastro de categorias":
                    opcao.titulo = permissao.nome;
                    opcao.icone = "tags";
                    opcao.telaRedirecionar = "cadastro_categoria";
                    break;
                case "Gestão de categorias":
                    opcao.titulo = "Categorias";
                    opcao.icone = "list";
                    opcao.telaRedirecionar = "categorias";
                    break;
                case "Cadastro de produtos":
                    opcao.titulo = permissao.nome;
                    opcao.icone = "product-hunt";
                    opcao.telaRedirecionar = "cadastro_produto";
                    break;
                case "Gestão de produtos":
                    opcao.titulo = "Produtos";
                    opcao.icone = "barcode";
                    opcao.telaRedirecionar = "produtos";
                    break;
                case "Realizar venda":
                    opcao.titulo = permissao.nome;
                    opcao.icone = "store";
                    opcao.telaRedirecionar = "nova_venda";
                    break;
                case "Gestão de vendas":
                    opcao.titulo = "Vendas";
                    opcao.icone = "price-change";
                    opcao.telaRedirecionar = "vendas";
                    break;
                default: 
                    opcao.titulo = "";
                    opcao.icone = "";
                    opcao.telaRedirecionar = "";
            }*/

            opcao.titulo = "Categorias";
            opcao.icone = "list";
            opcao.telaRedirecionar = "categorias";

            return opcao;
        });

        const opcao = {};
        opcao.titulo = "Categorias";
        opcao.icone = "list";
        opcao.telaRedirecionar = "categorias";

        opcoesHabilitadas.push(opcao);

        console.log(opcoesHabilitadas);

        return opcoesHabilitadas.map((opcao) => {

            return (
                <TouchableOpacity
                    key={ opcao.titulo }
                    style={ estilosMenuNavegacaoHome.opcaoMenu }
                    onPress={ () => {
                        navigation.navigate(opcao.telaRedirecionar);
                    } }>
                    { obterIconeCorreto(opcao.icone) }
                    <Text style={ estilosMenuNavegacaoHome.textoOpcaoMenu }>{ opcao.titulo.toUpperCase() }</Text>
                </TouchableOpacity>
            );
        });
    }

    return (
        <View style={ estilosMenuNavegacaoHome.menuNavegacaoTelaHome }>
            { obterOpcoesMenu() }
        </View>
    );
}

const estilosMenuNavegacaoHome =  StyleSheet.create({
    menuNavegacaoTelaHome: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        marginTop: 20,
        marginBottom: 200,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between"
    },
    opcaoMenu: {
        width: "47%",
        height: 150,
        padding: 20,
        backgroundColor: cores.branco,
        borderRadius: 20,
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    textoOpcaoMenu: {
        color: cores.preto,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        marginTop: 20
    },
    textoUsuarioNaoPossuiPermissoes: {
        textAlign: "center",
        width: "100%",
        padding: 20,
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 18
    }
});
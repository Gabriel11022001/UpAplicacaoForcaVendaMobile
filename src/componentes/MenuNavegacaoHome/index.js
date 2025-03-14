import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import { FontAwesome5, MaterialIcons, Ionicons } from 'react-native-vector-icons';

export default function MenuNavegacaoHome({ navigation }) {

    const opcoesMenu = [
        {
            titulo: "Cadastro de categorias",
            icone: "tags",
            telaRedirecionar: "cadastro_categoria",
            habilitado: true
        },
        {
            titulo: "Cadastro de produtos",
            icone: "product-hunt",
            telaRedirecionar: "cadastro_produto",
            habilitado: true
        },
        {
            titulo: "Categorias",
            icone: "list",
            telaRedirecionar: "categorias",
            habilitado: true
        },
        {
            titulo: "Produtos",
            icone: "barcode",
            telaRedirecionar: "produtos",
            habilitado: true
        },
        {
            titulo: "Realizar venda",
            icone: "store",
            telaRedirecionar: "nova_venda",
            habilitado: true
        },
        {
            titulo: "Vendas",
            icone: "price-change",
            telaRedirecionar: "vendas",
            habilitado: true
        },
        {
            titulo: "Cadastro de clientes",
            icone: "person-add-outline",
            telaRedirecionar: "cadastro_cliente",
            habilitado: true
        },
        {
            titulo: "Clientes",
            icone: "person-outline",
            telaRedirecionar: "clientes",
            habilitado: true
        }
    ];

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

        const opcoesHabilitadas = opcoesMenu.filter((opcao) => {

            return opcao.habilitado;
        });

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
    }
});
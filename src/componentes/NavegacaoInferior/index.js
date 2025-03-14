import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const NavegacaoInferior = (props) => {

    const opcoesMenu = [
        {
            titulo: "Vendas",
            icone: "store",
            habilitado: true,
            telaRedirecionar: "vendas"
        },
        {
            titulo: "Home",
            icone: "home",
            habilitado: true,
            telaRedirecionar: "home"
        },
        {
            titulo: "Perfil",
            icone: "user",
            habilitado: true,
            telaRedirecionar: "perfil"
        },
        {
            titulo: "Notificações",
            icone: "bell",
            habilitado: true,
            telaRedirecionar: "notificacoes"
        }
    ];

    const obterOpcoesMenu = () => {
        
        const opcoesApresentar = opcoesMenu.filter((opcaoMenu) => {

            if (opcaoMenu.habilitado) {

                return true;
            }

            return false;
        });

        return opcoesApresentar.map((opcaoApresentar) => {

            return <TouchableOpacity 
                key={ opcaoApresentar.titulo }
                style={ estilosNavegacaoInferior.estiloOpcaoApresentar }
                onPress={ () => {
                    redirecionar(opcaoApresentar.telaRedirecionar);
                } } >
                <FontAwesome5 name={ opcaoApresentar.icone } size={ 20 } color={ cores.preto } />
                <Text style={ estilosNavegacaoInferior.textoOpcaoMenu }>{ opcaoApresentar.titulo }</Text>
            </TouchableOpacity>
        });
    }

    const redirecionar = (telaRedirecionar) => {
        props.onRedirecionar(telaRedirecionar);
    }

    return (
        <View style={ estilosNavegacaoInferior.navegacaoInferior }>
            { obterOpcoesMenu() }
        </View>
    );
}

const estilosNavegacaoInferior = StyleSheet.create({
    navegacaoInferior: {
        height: 90,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: cores.branco,
        borderRadius: 20,
        position: "absolute",
        bottom: 15,
        start: 10,
        end: 10,
        zIndex: 999999,
        borderColor: cores.corBordas,
        borderWidth: 1,
        borderStyle: "solid"
    },
    estiloOpcaoApresentar: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    textoOpcaoMenu: {
        color: cores.preto,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10
    }
});

export default NavegacaoInferior;
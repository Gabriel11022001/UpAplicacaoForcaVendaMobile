import { StyleSheet, Text, View } from "react-native";
import BotaoDeletar from "../BotaoDeletar";
import BotaoFundoTransparente from "../BotaoFundoTransparente";
import cores from "../../views/cores";

export default function BottomSheetConfirmar(props) {

    const obterBotao = () => {

        if (props.operacao == "deletar") {

            return <BotaoDeletar textoBotao="Sim" onDeletar={ props.onOperacaoBottomSheet } />
        }

        return <BotaoFundoTransparente textoBotao="Sim" onPressionar={ props.onOperacaoBottomSheet } />
    }

    return (
        <View style={ estilosBottomSheetConfirmar.bottomSheetConfirmar }>
            <View style={ estilosBottomSheetConfirmar.cardBottomSheetConfirmar }>
                <View style={ estilosBottomSheetConfirmar.containerPossuiTituloMensagem }>
                    <Text style={ estilosBottomSheetConfirmar.titulo }>Atenção!</Text>
                    <Text style={ estilosBottomSheetConfirmar.mensagem }>{ props.mensagem }</Text>
                </View>
                { obterBotao() }
                { props.apresentarBotaoCancelar ? <BotaoFundoTransparente textoBotao="Cancelar" onPressionar={ props.onCancelar } /> : false }
            </View>
        </View>
    );
}

const estilosBottomSheetConfirmar = StyleSheet.create({
    bottomSheetConfirmar: {
        width: "100%",
        backgroundColor: cores.corFundoDialogsELoaders,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        zIndex: 999999999
    },
    cardBottomSheetConfirmar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: cores.branco,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30
    },
    titulo: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10
    },
    mensagem: {

    },
    containerPossuiTituloMensagem: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        marginTop: 20
    }
});
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DialogSucessoOperacao = ({ mensagem, onRedirecionar, apresentar }) => {

    if (!apresentar) {

        return null;
    }

    return (
        <View style={ estilosDialogSucessoOperacao.dialogSucessoOperacao }>
            <View style={ estilosDialogSucessoOperacao.cardDialogSucessoOperacao }>
                <View style={ estilosDialogSucessoOperacao.containerPossuiTituloIconeSucessoDialog }>
                    <Text style={ estilosDialogSucessoOperacao.estiloTituloDialogSucessoOperacao }>Sucesso</Text>
                    <FontAwesome5 name="check-circle" size={ 30 } color={ cores.principal } />
                </View>
                <Text style={ estilosDialogSucessoOperacao.mensagemDialogSucessoOperacao }>{ mensagem }</Text>
                <TouchableOpacity 
                    style={ estilosDialogSucessoOperacao.estiloBotaoSucessoOperacao }
                    onPress={ onRedirecionar }>
                    <Text style={ estilosDialogSucessoOperacao.estiloTextoBotaoDialogSucesso }>Ok</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const estilosDialogSucessoOperacao = StyleSheet.create({
    dialogSucessoOperacao: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: cores.corFundoDialogsELoaders,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 9999999999
    },
    cardDialogSucessoOperacao: {
        width: "100%",
        backgroundColor: cores.branco,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 300
    },
    estiloTituloDialogSucessoOperacao: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 30,
        marginEnd: 10
    },
    mensagemDialogSucessoOperacao: {
        color: cores.preto,
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 20,
        textAlign: "center"
    },
    estiloBotaoSucessoOperacao: {
        backgroundColor: cores.principal,
        padding: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 40
    },
    estiloTextoBotaoDialogSucesso: {
        color: cores.branco,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    },
    containerPossuiTituloIconeSucessoDialog: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default DialogSucessoOperacao;
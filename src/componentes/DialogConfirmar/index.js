import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";

const DialogConfirmar = (props) => {

    return (
        <SafeAreaView style={ estilosDialogConfirmar.dialogConfirmar }>
            <View style={ estilosDialogConfirmar.cardCentralDialogConfirmar }>
                <Text>Atenção!</Text>
                <Text>{ props.mensagemDialogConfirmar }</Text>
                <View style={ [
                    estilosDialogConfirmar.viewSeparadorOpcoesDialogConfirmar,
                    { marginTop: 40 }
                ] } />
                { /** botão de confirmar */ }
                <TouchableOpacity 
                    style={ estilosDialogConfirmar.botaoOpcaoDialogConfirmacao }
                    onPress={ () => {
                        props.onConfirmar();
                    } }>
                    <Text style={ estilosDialogConfirmar.textoBotaoDialogConfirmacao }>Confirmar</Text>
                </TouchableOpacity>
                <View style={ estilosDialogConfirmar.viewSeparadorOpcoesDialogConfirmar } />
                { /** botão de cancelar */ }
                <TouchableOpacity 
                    style={ estilosDialogConfirmar.botaoOpcaoDialogConfirmacao }
                    onPress={ () => {
                        props.onCancelar();
                    } }>
                    <Text style={ estilosDialogConfirmar.textoBotaoDialogConfirmacao }>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const estilosDialogConfirmar = StyleSheet.create({
    dialogConfirmar: {
        backgroundColor: cores.corFundoDialogsELoaders,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999999999
    },
    cardCentralDialogConfirmar: {
        backgroundColor: cores.branco,
        width: "90%",
        borderRadius: 20,
        padding: 20,
        height: "auto"
    },
    viewSeparadorOpcoesDialogConfirmar: {
        width: "100%",
        height: 1,
        backgroundColor: cores.preto
    },
    botaoOpcaoDialogConfirmacao: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    textoBotaoDialogConfirmacao: {
        color: cores.preto,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    }
});

export default DialogConfirmar;
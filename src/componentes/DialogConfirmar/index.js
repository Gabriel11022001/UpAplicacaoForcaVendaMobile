import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../views/cores";
import Strings from "../../utils/strings";

const DialogConfirmar = (props) => {

    return (
        <SafeAreaView style={ estilosDialogConfirmar.dialogConfirmar }>
            <View style={ estilosDialogConfirmar.cardCentralDialogConfirmar }>
                { props.carregando ? <View style={ estilosDialogConfirmar.viewCarregando }>
                    <ActivityIndicator color={ cores.principal } size={ 30 } />
                    <Text style={ estilosDialogConfirmar.textCarregando }>{ Strings.loader }</Text>
                </View> : <View>
                    <Text style={ estilosDialogConfirmar.titulo }>Atenção!</Text>
                    <Text style={ estilosDialogConfirmar.textoDialog }>{ props.mensagemDialogConfirmar }</Text>
                    { /** botão de confirmar */ }
                    <TouchableOpacity 
                        style={ estilosDialogConfirmar.botaoOpcaoDialogConfirmacao }
                        onPress={ () => {
                            props.onConfirmar();
                        } }>
                        <Text style={ estilosDialogConfirmar.textoBotaoDialogConfirmacao }>Confirmar</Text>
                    </TouchableOpacity>
                    { /** botão de cancelar */ }
                    <TouchableOpacity 
                        style={ estilosDialogConfirmar.botaoOpcaoDialogConfirmacao }
                        onPress={ () => {
                            props.onCancelar();
                        } }>
                        <Text style={ estilosDialogConfirmar.textoBotaoDialogConfirmacao }>Cancelar</Text>
                    </TouchableOpacity>
                </View> }
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
    botaoOpcaoDialogConfirmacao: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginTop: 20,
        backgroundColor: cores.corBordas,
        borderRadius: 20
    },
    textoBotaoDialogConfirmacao: {
        color: cores.preto,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center"
    },
    titulo: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 16
    },
    textoDialog: {
        color: cores.preto,
        marginTop: 10,
        fontSize: 15
    },
    viewCarregando: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    textCarregando: {
        color: cores.preto,
        fontWeight: "bold",
        marginTop: 10
    }
});

export default DialogConfirmar;
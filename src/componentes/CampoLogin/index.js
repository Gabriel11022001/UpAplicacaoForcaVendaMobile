import { StyleSheet, Text, TextInput, View } from "react-native";
import cores from "../../views/cores";

export default function CampoLogin({ dadoCampo, senha, placeholder, onAlterarValor, erro, mensagemErro, habilitado }) {

    return <View style={ estilosCampoLogin.containerCampoSenha }>
        <TextInput
            style={ [
                estilosCampoLogin.campoLogin,
                { borderBottomColor: erro ? cores.erro : cores.corBordas },
                { color: habilitado ? cores.principal : cores.corBordas }
            ] }
            value={ dadoCampo }
            placeholder={ placeholder }
            secureTextEntry={ senha }
            onChangeText={ (valor) => {
                onAlterarValor(valor);
            } }
            maxLength={ senha ? 6 : 255 }
            keyboardType={ senha ? "number-pad" : "email-address" }
            editable={ habilitado } />
        { erro ? <Text style={ estilosCampoLogin.mensagemErroCampoLogin }>{ mensagemErro }</Text> : false }
    </View>
}

const estilosCampoLogin = StyleSheet.create({
    containerCampoSenha: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        marginTop: 20,
        marginBottom: 20
    },
    campoLogin: {
        width: "100%",
        borderBottomWidth: 2,
        color: cores.principal,
        fontSize: 16
    },
    mensagemErroCampoLogin: {
        marginTop: 7,
        color: cores.erro,
        fontSize: 16
    }
});
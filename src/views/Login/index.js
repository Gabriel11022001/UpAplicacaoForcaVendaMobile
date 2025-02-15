import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import DialogConfirmar from "../../componentes/DialogConfirmar";
import Tela from "../../componentes/Tela";
import cores from "../cores";
import CampoTextoPadrao from "../../componentes/CampoTextoPadrao";
import Botao from "../../componentes/Botao";

const Login = ({ navigation }) => {

    const mensagemDialogFecharAppTelaLogin = "Deseja mesmo sair do aplicativo?";
    const [ apresentarDialogConfirmarSairApp, setApresentarDialogConfirmarSairApp ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ erroCampoEmail, setErroCampoEmail ] = useState(false);
    const [ erroCampoSenha, setErroCampoSenha ] = useState(false);
    const [ carregandoRealizarLogin, setCarregandoRealizarLogin ] = useState(false);
    const [ desabilitaCampoEmail, setDesabilitaCampoEmail ] = useState(false);
    const [ desabilitaCampoSenha, setDesabilitaCampoSenha ] = useState(false);

    // controlar evento de retorno no botão de retorno do android
    useEffect(() => {

        const eventoConfirmarSairAppTelaLogin = () => {
            setApresentarDialogConfirmarSairApp(true);
            
            return true;
        }

        BackHandler.addEventListener("hardwareBackPress", eventoConfirmarSairAppTelaLogin);

        return () => BackHandler.removeEventListener("hardwareBackPress", eventoConfirmarSairAppTelaLogin);
    }, [ navigation ]);

    // controlar evento de retornar na navegação stack
    useEffect(() => {
        
        const controlarEventoRetornoStack = navigation.addListener("beforeRemove", (evento) => {
            evento.preventDefault();

            setApresentarDialogConfirmarSairApp(true);
        });

        return () => navigation.removeListener("beforeRemove", controlarEventoRetornoStack);
    }, [ navigation ]);

    const confirmarSairApp = () => {
        // fechar o app
        BackHandler.exitApp();
    }

    const cancelarSairApp = () => {
        setApresentarDialogConfirmarSairApp(false);
    }

    // efetivar o login do usuário
    const realizarLogin = async () => {
        desabilitarCamposLogin();
        setCarregandoRealizarLogin(true);

        try {

            if (!validarCamposLogin()) {
                // apresentar alerta de erro para o usuário
                habilitarCamposLogin();
                setCarregandoRealizarLogin(false);

                return;
            }

            // efetivar login no servidor
            navigation.navigate("home");
        } catch (e) {
            habilitarCamposLogin();
            setCarregandoRealizarLogin(false);
            // apresentar alerta de erro
        }

    }

    const validarCamposLogin = () => {
        let ok = true;

        setErroCampoEmail(false);
        setErroCampoSenha(false);

        if (email.trim() === "") {
            ok = false;
            setErroCampoEmail(true);
        }

        if (senha.trim() === "") {
            ok = false;
            setErroCampoSenha(true);
        }

        return ok;
    }

    // desabilitar os campos da tela de login
    const desabilitarCamposLogin = () => {
        setDesabilitaCampoEmail(true);
        setDesabilitaCampoSenha(true);
    }

    // habilitar campos da tela de login
    const habilitarCamposLogin = () => {
        setDesabilitaCampoEmail(false);
        setDesabilitaCampoSenha(false);
    }

    return (
        <Tela>
            { apresentarDialogConfirmarSairApp ? <DialogConfirmar 
                mensagemDialogConfirmar={ mensagemDialogFecharAppTelaLogin }
                onConfirmar={ () => {
                    confirmarSairApp();
                } }
                onCancelar={ () => {
                    cancelarSairApp();
                } } /> : false } 
            <ScrollView>
                <Text style={ estilosTelaLogin.tituloTelaLogin }>Login</Text>
                <Text style={ [
                    estilosTelaLogin.labelCampoLogin,
                    { marginTop: 50 }
                ] }>E-mail*</Text>
                { /** campo de e-mail */ }
                <CampoTextoPadrao
                    erro={ erroCampoEmail }
                    dadoControle={ email }
                    placeholder="Digite seu e-mail..."
                    onAlterarValor={ (novoEmailDigitado) => setEmail(novoEmailDigitado) }
                    tipoCampo="email"
                    icone="email"
                    tamanhoMaximoCampo={ 100 }
                    habilitado={ !desabilitaCampoEmail } />
                <Text style={ [
                    estilosTelaLogin.labelCampoLogin,
                    { marginTop: 30 }
                ] }>Senha*</Text>
                { /** campo de senha */ }
                <CampoTextoPadrao
                    erro={ erroCampoSenha }
                    dadoControle={ senha }
                    placeholder="Digite sua senha..."
                    onAlterarValor={ (novaSenhaDigitada) => setSenha(novaSenhaDigitada) }
                    tipoCampo="senha"
                    icone="senha"
                    tamanhoMaximoCampo={ 6 }
                    habilitado={ !desabilitaCampoSenha } />
                <Botao
                    carregando={ carregandoRealizarLogin }
                    textoBotao="Entrar"
                    onPressionar={ async () => {
                        await realizarLogin();
                    } } />
            </ScrollView>
        </Tela>
    );
}

const estilosTelaLogin = StyleSheet.create({
    tituloTelaLogin: {
        color: cores.preto,
        fontWeight: "bold",
        fontSize: 30,
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 50
    },
    labelCampoLogin: {
        color: cores.preto,
        fontWeight: "bold",
        fontSize: 20,
        marginStart: "5%"
    }
});

export default Login;
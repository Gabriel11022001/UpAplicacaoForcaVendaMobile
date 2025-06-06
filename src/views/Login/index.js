import { useEffect, useState } from "react";
import { Alert, BackHandler, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import DialogConfirmar from "../../componentes/DialogConfirmar";
import Tela from "../../componentes/Tela";
import cores from "../cores";
import CampoTextoPadrao from "../../componentes/CampoTextoPadrao";
import Botao from "../../componentes/Botao";
import CampoLogin from "../../componentes/CampoLogin";
import BotaoLogin from "../../componentes/BotaoLogin";
import login from "../../service/loginServico";
import apresentarAlertaErro from "../../utils/apresentarAlertaErro";
import { salvarDadosUsuarioLogado } from "../../utils/salvarDadosLocalmente";

const Login = ({ navigation }) => {

    const mensagemDialogFecharAppTelaLogin = "Deseja mesmo sair do aplicativo?";
    const [ apresentarDialogConfirmarSairApp, setApresentarDialogConfirmarSairApp ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ erroCampoEmail, setErroCampoEmail ] = useState(false);
    const [ erroCampoSenha, setErroCampoSenha ] = useState(false);
    const [ mensagemErroEmail, setMensagemErroEmail ] = useState("");
    const [ mensagemErroSenha, setMensagemErroSenha ] = useState("");
    const [ carregandoRealizarLogin, setCarregandoRealizarLogin ] = useState(false);
    const [ desabilitaCampoEmail, setDesabilitaCampoEmail ] = useState(false);
    const [ desabilitaCampoSenha, setDesabilitaCampoSenha ] = useState(false);
    const [ btnLoginHabilitado, setBtnLoginHabilitado ] = useState(false);

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

    // controlar se vai habilitar ou não o botão de login
    useEffect(() => {
        const erroEmail = erroCampoEmail;
        const erroSenha = erroCampoSenha;

        if (erroEmail || erroSenha) {
            setBtnLoginHabilitado(false);
        } else {
            setBtnLoginHabilitado(true);
        }

    }, [ erroCampoEmail, erroCampoSenha ]);

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
            // realizar login no servidor
            const respRealizarLogin = await login(email.trim(), senha.trim());
         
            setCarregandoRealizarLogin(false);
            habilitarCamposLogin(true);

            if (respRealizarLogin.data.ok) {
                // efetivou o login com sucesso
                const dadosUsuarioLogado = respRealizarLogin.data.conteudo;

                if (dadosUsuarioLogado.status) {
                    // pode acessar o app
                    const usuario = {
                        id: dadosUsuarioLogado.usuarioId,
                        nome: dadosUsuarioLogado.nome,
                        ativo: dadosUsuarioLogado.ativo,
                        email: dadosUsuarioLogado.email,
                        telefone: dadosUsuarioLogado.telefone,
                        tokenValidacao: dadosUsuarioLogado.token,
                        nivelAcesso: {
                            nome: dadosUsuarioLogado.nivelAcessoUsuarioDTO.nome,
                            ativo: dadosUsuarioLogado.nivelAcessoUsuarioDTO.ativo,
                            permissoes: dadosUsuarioLogado.nivelAcessoUsuarioDTO.permissaoNivelAcessoUsuarioDTOS.map((permissao) => {

                                return {
                                    nomePermissao: permissao.nome
                                };
                            })
                        }
                    };

                    // salvar os dados do usuário logado localmente
                    await salvarDadosUsuarioLogado(usuario);

                    // redirecionar o usuário para a tela home
                    navigation.navigate("home");
                } else {
                    // o perfil está inativo, apresentar alerta de erro para o usuário
                    apresentarAlertaErro("O perfil do usuário em questão está inativo, solicite ao administrador do sistema que habilite o perfil.");
                }

            } else {
                // apresentar alerta de erro para o usuário
                apresentarAlertaErro(respRealizarLogin.data.msg);
            }

        } catch (e) {
            habilitarCamposLogin();
            setCarregandoRealizarLogin(false);
            // apresentar alerta de erro
            apresentarAlertaErro("Erro ao tentar-se realizar login, tente novamente.");

            console.log(e);
        }

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

    const validarCampoEmail = (email) => {
        setErroCampoEmail(false);
        setMensagemErroEmail("");

        if (email.trim() == "") {
            setErroCampoEmail(true);
            setMensagemErroEmail("Informe o e-mail");
        }

    }

    const validarCampoSenha = (senha) => {
        setErroCampoSenha(false);
        setMensagemErroSenha("");

        if (senha.trim() == "") {
            setErroCampoSenha(true);
            setMensagemErroSenha("Informe a senha");
        }

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
                <View style={ estilosTelaLogin.viewTopo }>
                    <Image source={ require("../../../assets/logo_app.png") } />
                    <Text style={ estilosTelaLogin.titulo }>Login</Text>
                </View>
                <View style={ estilosTelaLogin.containerFormLogin }>
                    <CampoLogin
                        dadoCampo={ email }
                        erro={ erroCampoEmail }
                        mensagemErro={ mensagemErroEmail }
                        placeholder="E-mail"
                        senha={ false }
                        habilitado={ !desabilitaCampoEmail }
                        onAlterarValor={ (novoEmailDigitado) => {
                            setEmail(novoEmailDigitado);
                            validarCampoEmail(novoEmailDigitado);
                        } } />
                    <CampoLogin
                        dadoCampo={ senha }
                        erro={ erroCampoSenha }
                        mensagemErro={ mensagemErroSenha }
                        placeholder="Senha"
                        senha={ true }
                        habilitado={ !desabilitaCampoSenha }
                        onAlterarValor={ (novaSenhaDigitada) => {
                            setSenha(novaSenhaDigitada);
                            validarCampoSenha(novaSenhaDigitada);
                        } } />
                    <BotaoLogin
                        textoBotao="Entrar"
                        carregando={ carregandoRealizarLogin }
                        habilitado={ btnLoginHabilitado && email.trim() != "" && senha.trim() != "" }
                        onRealizarLogin={ () => {
                            realizarLogin();
                        } } />
                </View>
            </ScrollView>
        </Tela>
    );
}

const estilosTelaLogin = StyleSheet.create({
    viewTopo: {
        width: "100%",
        height: 450,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: cores.principal
    },
    titulo: {
        color: cores.branco,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    containerFormLogin: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        backgroundColor: cores.branco,
        borderRadius: 10,
        flexDirection: "column",
        transform: [ {
            translateY: -90
        } ],
        paddingTop: 10,
        paddingBottom: 30,
        boxShadow: [ { offsetY: 2, color: cores.corBordas, blurRadius: 5, offsetX: 0 } ]
    }
});

export default Login;
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Tela from "../../componentes/Tela";
import TituloTela from "../../componentes/TituloTela";
import { useState } from "react";
import cores from "../cores";
import DadoPerfil from "../../componentes/DadoPerfil";
import LabelCampo from "../../componentes/LabelCampo";
import CampoTextoPadrao from "../../componentes/CampoTextoPadrao";
import Botao from "../../componentes/Botao";

export default function Perfil(props) {

    const [ carregandoLoader, setCarregandoLoader ] = useState(false);
    const [ carregandoLoaderAlterarSenha, setCarregandoLoaderAlterarSenha ] = useState(false);
    const [ perfil, setPerfil ] = useState({
        nome: "Nome do usuário logado",
        email: "emailusuariologado@teste.com",
        telefone: "(14) 99877-6564",
        dataCadastro: "11/02/2025",
        status: true,
        nivelAcessoUsuarioDTO: {
            nome: "Nivel de acesso 1",
            permissoes: [
                {
                    nomePermissao: "Gestão de clientes"
                },
                {
                    nomePermissao: "Gestão de usuários"
                },
                {
                    nomePermissao: "Controle de estoque"
                }
            ],
            status: true
        }
    });
    const [ containerAlterarSenhaExpandido, setContainerAlterarSenhaExpandido ] = useState(false);
    const [ senhaAtual, setSenhaAtual ] = useState("");
    const [ novaSenha, setNovaSenha ] = useState("");

    function apresentarDadosPerfil() {
        
        if (perfil == null) {
            
            return null;
        }

        return <View>
            { /** nome do usuário logado */ }
            <DadoPerfil labelDado="Nome" dado={ perfil.nome } />
            { /** email do usuário logado */ }
            <DadoPerfil labelDado="E-mail" dado={ perfil.email } />
            { /** telefone do usuário logado */ }
            <DadoPerfil labelDado="Telefone" dado={ perfil.telefone } />
            { /** data de cadastro do usuário logado */ }
            <DadoPerfil labelDado="Data de cadastro" dado={ perfil.dataCadastro } />
            { /** status do usuário logado */ }
            <DadoPerfil labelDado="Status" dado={ perfil.status ? "Ativo" : "Inativo" } />
        </View>
    }

    return <Tela>
        <ScrollView>
            <TituloTela titulo="Perfil" />
            { /** dados do perfil */ }
            <View style={ estilosPerfil.containerPerfil }>
                { apresentarDadosPerfil() }
            </View>
            { /** alterar senha */ }
            <View style={ estilosPerfil.containerPerfil }>
                <TouchableOpacity
                    style={ estilosPerfil.topoContainerExpandivel }
                    onPress={ () => {
                        setContainerAlterarSenhaExpandido(!containerAlterarSenhaExpandido);
                        setSenhaAtual("");
                        setNovaSenha("");
                    } } >
                    <Text style={ estilosPerfil.textoTopoContainerExpandir }>Alteração de senha</Text>
                </TouchableOpacity>
                <View style={ [
                    estilosPerfil.corpoContainerExpandir,
                    { display: containerAlterarSenhaExpandido ? "flex" : "none" }
                ] }>
                    <LabelCampo campo="Senha atual" obrigatorio={ true } margemTopo={ 20 } />
                    <CampoTextoPadrao
                        dadoControle={ senhaAtual }
                        habilitado={ true }
                        placeholder="Digite a senha atual..."
                        tamanhoMaximoCampo={ 255 }
                        onAlterarValor={ (senhaAtual) => {
                            setSenhaAtual(senhaAtual);
                        } } />
                    <LabelCampo campo="Nova senha" obrigatorio={ true } margemTopo={ 20 } />
                    <CampoTextoPadrao
                        dadoControle={ novaSenha }
                        habilitado={ true }
                        placeholder="Digite a nova senha..."
                        tamanhoMaximoCampo={ 255 }
                        onAlterarValor={ (novaSenha) => {
                            setNovaSenha(novaSenha);
                        } } />
                    <Botao
                        textoBotao="Alterar senha"
                        carregando={ carregandoLoaderAlterarSenha }
                        onPressionar={ () => {
                            // alterar senha do usuário logado
                        } } />
                </View>
            </View>
            { /** sair do aplicativo */ }
        </ScrollView>
    </Tela>
}

const estilosPerfil = StyleSheet.create({
    containerPerfil: {
        width: "95%",
        marginStart: "2.5%",
        marginEnd: "2.5%",
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: cores.branco,
        borderRadius: 10,
        padding: 20
    },
    topoContainerExpandivel: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textoTopoContainerExpandir: {
        color: cores.principal,
        fontWeight: "bold",
        fontSize: 15
    },
    corpoContainerExpandir: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center"
    }
});
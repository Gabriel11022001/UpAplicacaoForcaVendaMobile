import { ScrollView, StyleSheet, View } from "react-native"
import Tela from "../../componentes/Tela"
import TituloTela from "../../componentes/TituloTela";
import RadioBotao from "../../componentes/RadioBotao";
import React, { useEffect, useState } from "react";
import cores from "../cores";
import LabelCampo from "../../componentes/LabelCampo";
import Botao from "../../componentes/Botao";
import BotaoFundoTransparente from "../../componentes/BotaoFundoTransparente";
import ProgressoCadastroCliente from "../../componentes/ProgressoCadastroCliente";
import CampoTextoPadrao from "../../componentes/CampoTextoPadrao";
import { useGlobalContext } from "../../contextoGlobal/contextoGlobal";
import apresentarAlertaErro from "../../utils/apresentarAlertaErro";
import { buscarClientePeloIdService } from "../../service/clienteService";

const CadastroCliente = (props) => {

    const [ apresentarLoaderConsultarClienteServidor, setApresentarLoaderConsultarClienteServidor ] = useState(false);
    const { state, dispatch } = useGlobalContext();
    const [ idClienteEditar, setIdClienteEditar ] = useState(0);
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ tipoPessoaFisicaSelecionada, setTipoPessoaFisicaSelecionada ] = useState(true);
    const [ tipoPessoaJuridicaSelecionada, setTipoPessoaJuridicaSelecionada ] = useState(false);

    // geral
    const [ telefonePrincipal, setTelefonePrincipal ] = useState("");
    const [ telefoneSecundario, setTelefoneSecundario ] = useState("");
    const [ emailPrincipal, setEmailPrincipal ] = useState("");
    const [ emailSecundario, setEmailSecundario ] = useState("");

    // pessoa fisica
    const [ nome, setNome ] = useState("");
    const [ cpf, setCpf ] = useState("");
    const [ dataNascimento, setDataNascimento ] = useState("");
    const [ genero, setGenero ] = useState(0);
    const [ rg, setRg ] = useState("");

    // pessoa juridica
    const [ razaoSocial, setRazaoSocial ] = useState("");
    const [ cnpj, setCnpj ] = useState("");
    const [ dataFundacao, setDataFundacao ] = useState("");
    const [ valorPatrimonio, setValorPatrimonio ] = useState(0);

    // quando carregar a tela
    useEffect(() => {

        if (props.route != null && props.route.params != null && props.route.params.idCliente != null) {
            setIdClienteEditar(props.route.params.idCliente);

            // buscar cliente pelo id no servidor
            buscarClientePeloIdServidor(props.route.params.idCliente);
        } else if (state != null && state.clientePassadoEntreTelas != null) {
            setIdClienteEditar(state.clientePassadoEntreTelas.id);
        }

        if (state != null && state.clientePassadoEntreTelas != null) {

            if (state.clientePassadoEntreTelas.tipoPessoa == "pf") {
                setTipoPessoaFisicaSelecionada(true);
                setTipoPessoaJuridicaSelecionada(false);
            } else {    
                setTipoPessoaJuridicaSelecionada(true);
                setTipoPessoaFisicaSelecionada(false);
            }

            setTelefonePrincipal(state.clientePassadoEntreTelas.telefonePrincipal);
            setTelefoneSecundario(state.clientePassadoEntreTelas.telefoneSecundario);
            setEmailPrincipal(state.clientePassadoEntreTelas.emailPrincipal);
            setEmailSecundario(state.clientePassadoEntreTelas.emailSecundario);
            setNome(state.clientePassadoEntreTelas.nome);
            setCpf(state.clientePassadoEntreTelas.cpf);
            setDataNascimento(state.clientePassadoEntreTelas.dataNascimento);
            setGenero(state.clientePassadoEntreTelas.genero);
            setRazaoSocial(state.clientePassadoEntreTelas.razaoSocial);
            setCnpj(state.clientePassadoEntreTelas.cnpj);
            setDataFundacao(state.clientePassadoEntreTelas.dataFundacao);
            setValorPatrimonio(state.clientePassadoEntreTelas.valorPatrimonio);
        }

    }, []);

    useEffect(() => {

        if (tipoPessoaFisicaSelecionada) {
            setTipoPessoaJuridicaSelecionada(false);
        } else {
            setTipoPessoaJuridicaSelecionada(true);
        }

    }, [ tipoPessoaFisicaSelecionada ]);

    useEffect(() => {   

        if (tipoPessoaJuridicaSelecionada) {
            setTipoPessoaFisicaSelecionada(false);
        } else {
            setTipoPessoaFisicaSelecionada(true);
        }

    }, [ tipoPessoaJuridicaSelecionada ]);

    const obterContainerTipoPessoaSelecionada = () => {

        if (tipoPessoaFisicaSelecionada) {

            return ContainerPessoaFisica();
        }

        return ContainerPessoaJuridica();
    }

    const ContainerGeralCliente = () => {

        return <View>
            { /** telefone principal */ }
            <LabelCampo campo="Telefone principal" obrigatorio={ true } margemTopo={ 40 } />
            <CampoTextoPadrao
                dadoControle={ telefonePrincipal }
                habilitado={ true }
                placeholder="Digite o telefone principal..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (telefonePrincipal) => setTelefonePrincipal(telefonePrincipal) } />
            { /** telefone secundário */ }
            <LabelCampo campo="Telefone secundário" obrigatorio={ false } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ telefoneSecundario }
                habilitado={ true }
                placeholder="Digite o telefone secundário..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (telefoneSecundario) => setTelefoneSecundario(telefoneSecundario) } />
            { /** e-mail principal */ }
            <LabelCampo campo="E=mail principal" obrigatorio={ true } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ emailPrincipal }
                habilitado={ true }
                placeholder="Digite o e-mail principal..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (emailPrincipal) => setEmailPrincipal(emailPrincipal) } />
            { /** e-mail secundário */ }
            <LabelCampo campo="E=mail secundário" obrigatorio={ false } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ emailSecundario }
                habilitado={ true }
                placeholder="Digite o e-mail secundário..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (emailSecundario) => setEmailSecundario(emailSecundario) } />
        </View>
    }

    const ContainerPessoaFisica = () => {

        return <View>
            { /** nome do cliente */ }
            <LabelCampo campo="Nome" obrigatorio={ true } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ nome }
                habilitado={ idClienteEditar == 0 }
                placeholder="Digite o nome..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (nome) => {
                    setNome(nome);
                } } />
            { /** cpf do cliente */ }
            <LabelCampo campo="CPF" obrigatorio={ true } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ cpf }
                habilitado={ idClienteEditar == 0 }
                placeholder="Digite o cpf do cliente..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (cpf) => {
                    setCpf(cpf);
                } } />
            { /** rg do cliente */ }
            <LabelCampo campo="RG" obrigatorio={ true } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ rg }
                habilitado={ idClienteEditar == 0 }
                placeholder="Digite o rg do cliente..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (rg) => {
                    setRg(rg);
                } } />
            { /** data de nascimento */ }
            <LabelCampo campo="Data de nascimento" obrigatorio={ true } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ dataNascimento }
                habilitado={ true }
                placeholder="Digite a data de nascimento..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (dataNascimento) => {
                    setDataNascimento(dataNascimento);
                } } />
        </View>
    }

    const ContainerPessoaJuridica = () => {

    }

    // prosseguir com o cadastro/edicao do cliente
    const prosseguirCadastroCliente = async () => {
        console.log("Prosseguir para a tela de endereço...");

        try {

            if (validarFormulario()) {
                const cliente = {
                    id: idClienteEditar,
                    tipoPessoa: tipoPessoaFisicaSelecionada ? "pf" : "pj",
                    telefonePrincipal: telefonePrincipal.trim(),
                    telefoneSecundario: telefoneSecundario.trim(),
                    emailPrincipal: emailPrincipal.trim(),
                    emailSecundario: emailSecundario.trim(),
                    nome: nome.trim(),
                    cpf: cpf.trim(),
                    dataNascimento: dataNascimento.trim(),
                    genero: genero,
                    rg: rg.trim(),
                    razaoSocial: razaoSocial.trim(),
                    cnpj: cnpj.trim(),
                    dataFundacao: dataFundacao.trim(),
                    valorPatrimonio: valorPatrimonio
                };

                if (state.clientePassadoEntreTelas != null) {
                    cliente.endereco = state.clientePassadoEntreTelas.endereco;
                }

                // setar o state global do cliente para passar entre telas
                dispatch({
                    type: "SET_CLIENTE_PASSAR_ENTRE_TELAS",
                    payload: cliente
                })

                props.navigation.navigate("cadastro_cliente_endereco", {
                    operacao: idClienteEditar == 0 ? "cadastro": "edicao"
                });
            } else {
                console.log("Campos inválidos...");
            }

        } catch (e) {
            console.log("Erro: " + e);
        }

    }

    // cancelar o cadastro/edicao do cliente
    const cancelar = async () => {

        try {
            // limpar o state global do cliente
            dispatch({
                type: "CLEAR_STAGE_SET_CLIENTE_PASSAR_ENTRE_TELAS"
            });

            props.navigation.goBack();
        } catch (e) {

        }

    }

    const validarFormulario = () => {

        if (tipoPessoaFisicaSelecionada) {

            return validarDadosPessoaFisica();
        }

        return validarDadosPessoaJuridica();
    }

    // validar dados da pessoa fisica
    const validarDadosPessoaFisica = () => {
        let ok = true;

        if (telefonePrincipal.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe o telefone principal!");
        } else if (emailPrincipal.trim() === "") {
            ok = false;
            apresentarAlertaErro("Informe o e-mail principal!");
        } else if (cpf.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe o cpf!");
        } else if (nome.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe o nome!");
        } else if (dataNascimento.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe a data de nascimento!");
        } else if (rg.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe o rg!");
        }

        return ok;
    }

    // validar dados da pessoa juridica
    const validarDadosPessoaJuridica = () => {
        let ok = true;

        return ok;
    }

    // consultar cliente no servidor
    async function buscarClientePeloIdServidor(idClienteConsultar) {
        console.log("Consultando no servidor o cliente com id_cliente = " + idClienteConsultar);
        setApresentarLoaderConsultarClienteServidor(true);

        try {
            const respConsultarCliente = await buscarClientePeloIdService(idClienteConsultar);

            setApresentarLoaderConsultarClienteServidor(false);

            if (respConsultarCliente.data.msg == "Cliente encontrado com sucesso!") {
                const cliente = { ...respConsultarCliente.data.conteudo };
                
                setTelefonePrincipal(cliente.telefonePrincipal);
                setTelefoneSecundario(cliente.telefoneSecundario);
                setEmailPrincipal(cliente.emailPrincipal);
                setEmailSecundario(cliente.emailSecundario);

                if (cliente.tipoPessoaNome == "pf") {
                    setTipoPessoaFisicaSelecionada(true);
                    setNome(cliente.nomeCompleto);
                    setCpf(cliente.cpf);
                    setRg(cliente.rg);
                    // setDataNascimento(cliente.dataNascimento);
                } else {
                    setTipoPessoaJuridicaSelecionada(true);
                }

            } else {
                // apresentar alerta de erro e redirecionar o usuário para a listagem de clientes

            }

        } catch (e) {
            setApresentarLoaderConsultarClienteServidor(false);
            // apresentar alerta de erro

            console.log(e);
        }

    }

    return <Tela>
        <ScrollView>
            <ProgressoCadastroCliente
                telaAtual="cadastro_cliente"
                onRedirecionar={ (telaRedirecionar) => {

                    // prosseguir com o cadastro do cliente -> tela de endereço do cliente
                    if (telaRedirecionar == "cadastro_endereco_cliente") {
                        prosseguirCadastroCliente();
                    }

                } } />
            <TituloTela titulo="Cadastro de cliente" />
            { /** container para o usuário selecionar o tipo de pessoa do cadastro/edição */ }
            <View style={ estilosCadastroCliente.containerSelecionarTipoPessoa }>
                <RadioBotao titulo="Pessoa fisica" selecionado={ tipoPessoaFisicaSelecionada } onSelecionar={ (selecionado) => {
                    setTipoPessoaFisicaSelecionada(selecionado);
                } } />
                <RadioBotao titulo="Pessoa juridica" selecionado={ tipoPessoaJuridicaSelecionada } onSelecionar={ (selecionado) => {
                    setTipoPessoaJuridicaSelecionada(selecionado);
                } } />
            </View>
            { ContainerGeralCliente() }
            { obterContainerTipoPessoaSelecionada() }
            <Botao
                textoBotao="Prosseguir"
                carregando={ apresentarLoader }
                onPressionar={ () => {
                    // prosseguir com o cadastro/edião do cliente
                    prosseguirCadastroCliente();
                } } />
            <BotaoFundoTransparente
                textoBotao="Cancelar"
                margemBaixo={ 40 }
                onPressionar={ () => {
                    // cancelar operação
                    cancelar();
                } } />
        </ScrollView>
    </Tela>
}

const estilosCadastroCliente = StyleSheet.create({
    containerSelecionarTipoPessoa: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        marginTop: 30,
        backgroundColor: cores.branco,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }
});

export default CadastroCliente;
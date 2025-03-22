import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Tela from "../../componentes/Tela";
import { useEffect, useState } from "react";
import ProgressoCadastroCliente from "../../componentes/ProgressoCadastroCliente";
import { useGlobalContext } from "../../contextoGlobal/contextoGlobal";
import Botao from "../../componentes/Botao";
import BotaoFundoTransparente from "../../componentes/BotaoFundoTransparente";
import TituloTela from "../../componentes/TituloTela";
import LabelCampo from "../../componentes/LabelCampo";
import CampoTextoPadrao from "../../componentes/CampoTextoPadrao";
import Loader from "../../componentes/Loader";
import { validarNumeroEndereco } from "../../utils/validacoes";
import consultarEndereco from "../../service/consultaEnderecoService";
import apresentarAlertaErro from "../../utils/apresentarAlertaErro";
import Spinner from "../../componentes/Spinner";
import SpinnerCarregando from "../../componentes/SpinnerCarregando";
import consultarCidadesService from "../../service/consultaCidadesService";
import cores from "../cores";
import SelecionarOpcao from "../../componentes/SelecionarOpcao";

export default function CadastroClienteEndereco(props) {

    const operacao = props.route.params.operacao;
    const { state, dispatch } = useGlobalContext();
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ apresentarLoaderConsultarCep, setApresentarLoaderConsultarCep ] = useState(false);
    const [ cep, setCep ] = useState("");
    const [ logradouro, setLogradouro ] = useState("");
    const [ complemento, setComplemento ] = useState("");
    const [ bairro, setBairro ] = useState("");
    const [ cidade, setCidade ] = useState("");
    const [ numero, setNumero ] = useState("");
    const [ uf, setUf ] = useState("");
    const [ camposDesabilitar, setCamposDesabilitar ] = useState([]);
    const [ apresentarLoaderCarregandoConsultaCidades, setApresentarLoaderCarregandoConsultaCidades ] = useState(false);
    const [ cidades, setCidades ] = useState([]);
    const [ apresentarOpcaoSelecionarEstado, setApresentarOpcaoSelecionarEstado ] = useState(false);
    const [ apresentarOpcaoSelecionarCidade, setApresentarOpcaoSelecionarCidade ] = useState(false);
    const estados = [
        { key: 1, valor: "AC" }, // Acre
        { key: 2, valor: "AL" }, // Alagoas
        { key: 3, valor: "AP" }, // Amapá
        { key: 4, valor: "AM" }, // Amazonas
        { key: 5, valor: "BA" }, // Bahia
        { key: 6, valor: "CE" }, // Ceará
        { key: 7, valor: "DF" }, // Distrito Federal
        { key: 8, valor: "ES" }, // Espírito Santo
        { key: 9, valor: "GO" }, // Goiás
        { key: 10, valor: "MA" }, // Maranhão
        { key: 11, valor: "MT" }, // Mato Grosso
        { key: 12, valor: "MS" }, // Mato Grosso do Sul
        { key: 13, valor: "MG" }, // Minas Gerais
        { key: 14, valor: "PA" }, // Pará
        { key: 15, valor: "PB" }, // Paraíba
        { key: 16, valor: "PR" }, // Paraná
        { key: 17, valor: "PE" }, // Pernambuco
        { key: 18, valor: "PI" }, // Piauí
        { key: 19, valor: "RJ" }, // Rio de Janeiro
        { key: 20, valor: "RN" }, // Rio Grande do Norte
        { key: 21, valor: "RS" }, // Rio Grande do Sul
        { key: 22, valor: "RO" }, // Rondônia
        { key: 23, valor: "RR" }, // Roraima
        { key: 24, valor: "SC" }, // Santa Catarina
        { key: 25, valor: "SP" }, // São Paulo
        { key: 26, valor: "SE" }, // Sergipe
        { key: 27, valor: "TO" }  // Tocantins
    ];

    useEffect(() => {
        setCep(state.clientePassadoEntreTelas.endereco.cep);
        setLogradouro(state.clientePassadoEntreTelas.endereco.logradouro);
        setComplemento(state.clientePassadoEntreTelas.endereco.complemento);
        setCidade(state.clientePassadoEntreTelas.endereco.cidade);
        setBairro(state.clientePassadoEntreTelas.endereco.bairro);
        setUf(state.clientePassadoEntreTelas.endereco.uf);
        setNumero(state.clientePassadoEntreTelas.endereco.numero);
    }, []);

    useEffect(() => {

        if (uf != "") {
            consultarCidades();
        }

    }, [ uf ]);

    const consultarCidades = async () => {
        setCidades([]);
        setApresentarLoaderCarregandoConsultaCidades(true);

        try {
            console.log("Consultando as cidades do estado " + uf);

            const resp = await consultarCidadesService(uf.trim().toUpperCase());

            setApresentarLoaderCarregandoConsultaCidades(false);

            if (resp.status == 200) {
                const cidadesArray = resp.data.map((cidade, indice) => {

                    return {
                        key: indice + 1,
                        valor: cidade.nome,
                        habilitado: true
                    };
                });

                setCidades(cidadesArray);
            } else {
                apresentarAlertaErro("Erro ao tentar-se consultar as cidades do estado " + uf);
            }

        } catch (e) {
            setApresentarLoaderCarregandoConsultaCidades(false);
            apresentarAlertaErro("Erro ao tentar-se consultar as cidades!");
        }

    }

    const retornar = () => {
        
        try {

            // salvar os dados do endereço no state global
            if (state != null && state.clientePassadoEntreTelas != null) {
                const cliente = { ...state.clientePassadoEntreTelas }
                const endereco = {
                    cep: cep.trim(),
                    complemento: complemento.trim(),
                    logradouro: logradouro.trim(),
                    cidade: cidade.trim(),
                    bairro: bairro.trim(),
                    uf: uf.trim(),
                    numero: numero.trim()
                };

                cliente.endereco = endereco;
                dispatch({
                    type: "SET_CLIENTE_PASSAR_ENTRE_TELAS",
                    payload: cliente
                });
            }

            // retornar para a tela de dados básicos
            props.navigation.goBack();
        } catch (e) {
            console.log(e);
        }   

    }

    const validarFormularioEndereco = () => {
        let ok = true;

        if (cep.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe o cep!");
        } else if (logradouro.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe o logradouro!");
        } else if (bairro.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe o bairro!");
        } else if (cidade.trim() == "") {
            ok = false;
            apresentarAlertaErro("Informe a cidade!");
        } else if (numero.trim() != "" && !validarNumeroEndereco(numero)) {
            ok = false;
            apresentarAlertaErro("Número inválido!");
        }   

        return ok;
    }

    // finalizar cadastro/edicao do cliente
    const finalizar = async () => {

        try {
            
            if (validarFormularioEndereco()) {
                setApresentarLoader(true);

                const cliente = { ...state.clientePassadoEntreTelas }

                cliente.endereco = {
                    cep: cep.trim(),
                    logradouro: logradouro.trim(),
                    complemento: complemento.trim(),
                    cidade: cidade.trim(),
                    bairro: bairro.trim(),
                    uf: uf.trim(),
                    numero: numero.trim()
                };

                console.log(cliente);
            } else {
                setApresentarLoader(false);
            }

        } catch (e) {
            setApresentarLoader(false);
            // apresentar alerta de erro
            apresentarAlertaErro("Erro ao tentar-se cadastrar o cliente, tente novamente.");
        }

    }

    const consultarEnderecoPeloCep = async (cep) => {
        console.log("Consultando o endereço pelo cep " + cep.trim() + " ...");

        setApresentarLoaderConsultarCep(true);

        // desabilitar campos
        setCamposDesabilitar([
            "logradouro",
            "bairro",
            "cidade",
            "uf"
        ]);

        try {
            const respostaConsultarEndereco = await consultarEndereco(cep.trim());

            setApresentarLoaderConsultarCep(false);

            if (respostaConsultarEndereco.status == 200) {

                if (respostaConsultarEndereco.data.erro != undefined) {
                    apresentarAlertaErro("Endereço não encontrado para esse cep!");
                    setCamposDesabilitar([]);
                } else {
                    const endereco = respostaConsultarEndereco.data;

                    setLogradouro(endereco.logradouro);
                    setComplemento(endereco.complemento);
                    setCidade(endereco.localidade);
                    setBairro(endereco.bairro);
                    setUf(endereco.uf);
                    setNumero("");
                }

            } else {
                apresentarAlertaErro("Erro ao tentar-se consultar o cep!");
                setCamposDesabilitar([]);
            }

        } catch (e) {
            // apresentar alerta de erro
            setApresentarLoaderConsultarCep(false);
            // habilitar os campos novamente
            setCamposDesabilitar([]);
            apresentarAlertaErro("Erro ao tentar-se consultar o endereço pelo cep.");
        }

    }

    return <Tela>
        { apresentarLoaderConsultarCep ? <Loader mensagem="Consultando endereço pelo cep, aguarde..." /> : null }
        { /** selecionar opção de estado */ }
        <SelecionarOpcao
            apresentar={ apresentarOpcaoSelecionarEstado }
            carregando={ false }
            opcaoSelecionada={ estados.filter((estado) => {

                return estado.valor == uf
            }) }
            opcoes={ estados }
            onFechar={ () => {
                setApresentarOpcaoSelecionarEstado(false);
            } }
            onSelecionarOpcao={ (opcaoSelecionada) => {
                const estadoSelecionado = { ...opcaoSelecionada }
                setUf(estadoSelecionado.valor);
                setCidade("");
                setApresentarOpcaoSelecionarEstado(false);
            } } />
        { /** selecionar opção de cidade */ }
        <SelecionarOpcao
            opcoes={ cidades }
            apresentar={ apresentarOpcaoSelecionarCidade }
            carregando={ apresentarLoaderCarregandoConsultaCidades }
            onFechar={ () => {
                setApresentarOpcaoSelecionarCidade(false);
            } }
            onSelecionarOpcao={ (opcaoSelecionada) => {
                const cidadeSelecionada = { ...opcaoSelecionada };
                setCidade(cidadeSelecionada.valor);
                setApresentarOpcaoSelecionarCidade(false);
            } }
            opcaoSelecionada={ cidades.filter((cid) => {

                return cid.valor == cidade.trim()
            }) } />
        <ScrollView>
            <ProgressoCadastroCliente
                telaAtual="cadastro_endereco_cliente"
                onRedirecionar={ (telaRedirecionar) => {

                    if (telaRedirecionar == "cadastro_cliente") {
                        // retornar para a tela de dados básicos
                        retornar();
                    }

                } } />
            <TituloTela titulo="Endereço" />
            { /** campo do cep */ }
            <LabelCampo campo="CEP" obrigatorio={ true } margemTopo={ 40 } />
            <CampoTextoPadrao
                dadoControle={ cep }
                habilitado={ true }
                placeholder="Digite o cep..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (cep) => {
                    setCep(cep);

                    if (cep.length == 0) {
                        setCamposDesabilitar([]);
                        setComplemento();
                    } else if (cep.length == 9) {
                        consultarEnderecoPeloCep(cep);
                    }

                } } />
            { /** campo do logradouro */ }
            <LabelCampo campo="Logradouro" obrigatorio={ true } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ logradouro }
                habilitado={ camposDesabilitar.includes("logradouro") ? false : true }
                placeholder="Digite o logradouro..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (logradouro) => {
                    setLogradouro(logradouro);
                } } />
            { /** campo do complemento */ }
            <LabelCampo campo="Complemento" obrigatorio={ false } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ complemento }
                habilitado={ camposDesabilitar.includes("complemento") ? false : true }
                placeholder="Digite o complemento..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (complemento) => {
                    setComplemento(complemento);
                } } />
            { /** campo do bairro */ }
            <LabelCampo campo="Bairro" obrigatorio={ true } margemTopo={ 20 } />
            <CampoTextoPadrao
                dadoControle={ bairro }
                habilitado={ camposDesabilitar.includes("bairro") ? false : true }
                placeholder="Digite o bairro..."
                tamanhoMaximoCampo={ 255 }
                onAlterarValor={ (bairro) => {
                    setBairro(bairro);
                } } />
            { /** campo estado */ }
            <LabelCampo campo="Estado" obrigatorio={ true } margemTopo={ 20 } />
            <TouchableOpacity
                style={ [
                    estilosCadastroClienteEndereco.estiloOpcaoSelecionar,
                    camposDesabilitar.includes("uf") ? estilosCadastroClienteEndereco.estiloOpcaoSelecionarDesabilitado : false
                ] }
                onPress={ () => {
                    // selecionar um estado(uf)
                    setApresentarOpcaoSelecionarEstado(true);
                } }
                disabled={ camposDesabilitar.includes("uf") }>
                <Text style={ estilosCadastroClienteEndereco.estiloTextoOpcaoSelecionar }>{ uf.trim() == "" ? "Selecione um estado..." : uf.trim().toUpperCase() }</Text>
            </TouchableOpacity>
            { /** campo cidade */ }
            <LabelCampo campo="Cidade" obrigatorio={ true } margemTopo={ 20 } />
            <TouchableOpacity
                style={ [
                    estilosCadastroClienteEndereco.estiloOpcaoSelecionar,
                    camposDesabilitar.includes("cidade") ? estilosCadastroClienteEndereco.estiloOpcaoSelecionarDesabilitado : false
                ] }
                onPress={ () => {
                    // selecionar uma cidade
                    setApresentarOpcaoSelecionarCidade(true);
                } }
                disabled={ camposDesabilitar.includes("cidade") }>
                <Text style={ estilosCadastroClienteEndereco.estiloTextoOpcaoSelecionar }>{ cidade.trim() == "" ? "Selecione uma cidade..." : cidade.trim().toUpperCase() }</Text>
            </TouchableOpacity>
            <Botao
                textoBotao={ operacao == "cadastro" ? "Cadastrar" : "Salvar" }
                carregando={ apresentarLoader }
                onPressionar={ () => {
                    finalizar();
                } } />
            <BotaoFundoTransparente
                textoBotao="Retornar"
                margemBaixo={ 40 }
                onPressionar={ () => {
                    retornar();
                } } />
        </ScrollView>
    </Tela>
}

const estilosCadastroClienteEndereco = StyleSheet.create({
    estiloOpcaoSelecionar: {
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        backgroundColor: cores.branco,
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: cores.corBordas
    },
    estiloTextoOpcaoSelecionar: {
        color: cores.principal,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center"
    },
    estiloOpcaoSelecionarDesabilitado: {
        backgroundColor: cores.corBordas
    }
});
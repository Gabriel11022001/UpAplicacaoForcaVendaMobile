import { ScrollView, StyleSheet } from "react-native";
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

    useEffect(() => {
        setCep(state.clientePassadoEntreTelas.endereco.cep);
        setLogradouro(state.clientePassadoEntreTelas.endereco.logradouro);
    }, []);

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

    // finalizar cadastro/edicao do cliente
    const finalizar = async () => {
        setApresentarLoader(true);

        try {
            
        } catch (e) {
            setApresentarLoader(false);
            // apresentar alerta de erro
            apresentarAlertaErro("Erro ao tentar-se cadastrar o cliente, tente novamente.");
        }

    }

    const apresentarAlertaErro = (mensagem) => {

    }

    const consultarEnderecoPeloCep = async (cep) => {
        console.log("Consultando o endereço pelo cep " + cep.trim() + " ...");

        setApresentarLoaderConsultarCep(true);

        // desabilitar campos
        setCamposDesabilitar([
            "logradouro",
            "complemento",
            "bairro",
            "cidade",
            "uf",
            "numero"
        ]);

        try {

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

                    if (cep.length == 9) {
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
    
});
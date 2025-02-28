import { ScrollView, StyleSheet } from "react-native";
import Tela from "../../componentes/Tela";
import TituloTela from "../../componentes/TituloTela";
import LabelCampo from "../../componentes/LabelCampo";
import { useEffect, useState } from "react";
import Botao from "../../componentes/Botao";
import BotaoFundoTransparente from "../../componentes/BotaoFundoTransparente";
import CampoTextoPadrao from "../../componentes/CampoTextoPadrao";
import FeedbackErro from "../../componentes/FeedbackErro";
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import DialogSucessoOperacao from "../../componentes/DialogSucessoOperacao";
import Spinner from "../../componentes/Spinner";

const CadastroCategoria = (props) => {

    let categoriaIdEditar = 0;
    const [ nomeCategoria, setNomeCategoria ] = useState("");
    const [ status, setStatus ] = useState(true);
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ erroSalvarCategoria, setErroSalvarCategoria ] = useState("");
    const [ erroCampoNomeCategoria, setErroCampoNomeCategoria ] = useState("");
    const [ apresentarDialogSucessoSalvarCategoria, setApresentarDialogSucessoSalvarCategoria ] = useState(false);

    const salvarCategoria = async () => {

        if (categoriaIdEditar != 0) {
            // editar categoria
            await editarCategoria();
        } else {
            // cadastrar categoria
            await cadastrarCategoria();
        }

    }

    // cadastrar uma nova categoria
    const cadastrarCategoria = async () => {
        setErroSalvarCategoria("");

        try {
            
            if (validarDadosCategoria()) {
                setApresentarLoader(true);

                const categoriaCadastrar = {
                    nome: nomeCategoria.trim(),
                    status: status
                };

                console.log(categoriaCadastrar);
            }

        } catch (e) {
            setErroSalvarCategoria("Erro ao tentar-se cadastrar a categoria, tente novamente!");
        }

    }

    // editar categoria
    const editarCategoria = async () => {

    }

    const validarDadosCategoria = () => {
        let ok = true;
        setErroCampoNomeCategoria("");

        if (nomeCategoria.trim() === "") {
            ok = false;
            setErroCampoNomeCategoria("Informe o nome da categoria.");
        } else if (nomeCategoria.length < 3) {
            ok = false;
            setErroCampoNomeCategoria("O nome da categoria necessita de pelo menos três caracteres!");
        }

        return ok;
    }

    const apresentarCarregamento = () => {

    }

    const esconderCarregamento = () => {

    } 

    const retornar = () => {

    }

    useEffect(() => {
        // validar se foi passado o idCategoria como parâmetro
        const idCategoria = props.route.params ?? null;

        if (idCategoria != null) {
            categoriaIdEditar = idCategoria;
        }

        if (categoriaIdEditar != 0) {

            // buscar a categoria pelo id para edição
            const buscarCategoriaPeloId = async () => {

            }

            buscarCategoriaPeloId();
        }

    }, []);

    return (
        <Tela>
            <DialogSucessoOperacao
                apresentar={ apresentarDialogSucessoSalvarCategoria }
                mensagem={ categoriaIdEditar == 0 ? "Categoria cadastrada com sucesso!" : "Categoria salva com sucesso!" }
                onRedirecionar={ () => {
                    // redirecionar usuário para a tela de datalhes da categoria
                } } />
            <NavegacaoInferior onRedirecionar={ (telaRedirecionar) => {
                props.navigation.navigate(telaRedirecionar);
            } } />
            <ScrollView>
                <TituloTela titulo="Cadastro de categoria" /> 
                <LabelCampo campo="Nome da categoria" obrigatorio={ true } margemTopo={ 40 } />
                <CampoTextoPadrao
                    dadoControle={ nomeCategoria }
                    onAlterarValor={ (nomeCategoriaDigitado) => setNomeCategoria(nomeCategoriaDigitado) }
                    placeholder="Digite o nome da categoria..."
                    tamanhoMaximoCampo={ 150 }
                    habilitado={ true }
                    tipoCampo="text"
                    erro={ erroCampoNomeCategoria != "" } />
                <FeedbackErro mensagem={ erroCampoNomeCategoria } apresentar={ erroCampoNomeCategoria != "" } />
                <LabelCampo campo="Status" obrigatorio={ true } margemTopo={ 20 } />
                <Spinner
                    dadoSelecionado={ status ? { key: 1, valor: "Ativo", habilitado: true } : { key: 2, valor: "Inativo", habilitado: true } }
                    onAlterarDadoSelecionado={ (statusSelecionado) => {

                        if (statusSelecionado == 1) {
                            setStatus(true);
                        } else {
                            setStatus(false);
                        }

                    } }
                    opcoes={ [ 
                        {
                            key: 1,
                            valor: "Ativo",
                            habilitado: true
                        },
                        {
                            key: 2,
                            valor: "Inativo",
                            habilitado: true
                        }
                    ] } />
                <Botao textoBotao={ categoriaIdEditar == 0 ? "Cadastrar" : "Salvar" } carregando={ apresentarLoader } onPressionar={ salvarCategoria }  />
                <BotaoFundoTransparente textoBotao={ categoriaIdEditar == 0 ? "Cancelar cadastro" : "Cancelar edição" } onPressionar={ retornar } />
            </ScrollView>            
        </Tela>
    );
}

const estilosCadastroCategoria = StyleSheet.create({

});

export default CadastroCategoria;
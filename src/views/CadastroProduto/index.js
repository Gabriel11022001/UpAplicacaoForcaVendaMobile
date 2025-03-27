import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Tela from "../../componentes/Tela";
import TituloTela from "../../componentes/TituloTela";
import LabelCampo from "../../componentes/LabelCampo";
import CampoTextoPadrao from "../../componentes/CampoTextoPadrao";
import Spinner from "../../componentes/Spinner";
import BottomSheetConfirmar from "../../componentes/BottomSheetConfirmar";
import Botao from "../../componentes/Botao";
import BotaoFundoTransparente from "../../componentes/BotaoFundoTransparente";
import Strings from "../../utils/strings";

export default function CadastroProduto(props) {

    const [ idProdutoEditar, setIdProdutoEditar ] = useState(0);
    const [ nomeProduto, setNomeProduto ] = useState("");
    const [ descricao, setDescricao ] = useState("");
    const [ precoCompra, setPrecoCompra ] = useState(0);
    const [ precoVenda, setPrecoVenda ] = useState(0);
    const [ estoque, setEstoque ] = useState(0);
    const [ status, setStatus ] = useState(false);
    const [ categoriaId, setCategoriaId ] = useState(0);
    const [ fotoProduto, setFotoProduto ] = useState("");
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ categorias, setCategorias ] = useState([]);
    const [ apresentarBottomSheetNaoExistemCategorias, setApresentarBottomSheetNaoExistemCategorias ] = useState(false);
    const opcoesStatusProduto = [
        { valor: "Ativo", key: 1, habilitado: true },
        { valor: "Inativo", key: 0, habilitado: true }
    ];

    const obterCategoriaSelecionada = () => {

        if (categorias.length == 0) {

            return null;
        }

        if (categoriaId == 0) {

            return categorias[ 0 ];
        }
        
        let categoriaSelecionada = null;

        for (let contador = 0; contador < categorias.length; contador++) {

            if (categorias[ contador ].categoriaId == categoriaId) {
                categoriaSelecionada = categorias[ contador ];  
            }

        }

        return categoriaSelecionada;
    }

    const definirCategoriaSelecionada = (categoriaSelecionadaSpinner) => {

        if (categorias.length > 0) {

            for (let contador = 0; contador < categorias.length; contador++) {

                if (categorias[ contador ].key == categoriaSelecionadaSpinner) {
                    setCategoriaId(categorias[ contador ].key);
                }

            }

        }

    }

    const validarExistemCategorias = () => {

        if (categorias.length == 0) {
            // apresentar alerta informando que não existem categorias cadastradas
            setApresentarBottomSheetNaoExistemCategorias(true);
        } else {
            setApresentarBottomSheetNaoExistemCategorias(false);
        }

    }

    const salvarProduto = async () => {
        setApresentarLoader(true);

        try {

            if (validarCampos()) {

                if (idProdutoEditar == 0) {
                    // cadastrar produto
                    await cadastrarProduto();
                } else {
                    // editar produto
                    await editarProduto();
                }

            }

        } catch (e) {
            setApresentarLoader(false);
        }

    }

    const cadastrarProduto = async () => {

    }

    const editarProduto = async () => {

    }

    const validarCampos = () => {

    }

    useEffect(() => {
        // validarExistemCategorias();
    }, []);

    return (
        <Tela>
            { apresentarBottomSheetNaoExistemCategorias ? <BottomSheetConfirmar
                apresentarBotaoCancelar={ false }
                mensagem={ Strings.naoExistemCategoriasCadastradasNaoProsseguirOperacao }
                onOperacaoBottomSheet={ () => {
                    props.navigation.goBack();
                } } /> : false }
            <ScrollView>
                <TituloTela titulo="Cadastro de produto" />
                { /** nome do produto */ } 
                <LabelCampo campo="Nome" obrigatorio={ true } margemTopo={ 30 } />
                <CampoTextoPadrao
                    dadoControle={ nomeProduto }
                    placeholder="Digite o nome do produto..."
                    onAlterarValor={ (novoNomeProdutoDigitado) => {
                        setNomeProduto(novoNomeProdutoDigitado);
                    } } />
                { /** preço de compra do produto */ }
                <LabelCampo campo="Preço de compra" obrigatorio={ true } margemTopo={ 20 } />
                <CampoTextoPadrao 
                    dadoControle={ precoCompra } 
                    placeholder="Digite o preço de compra..." 
                    onAlterarValor={ (novoPrecoCompra) => setPrecoCompra(novoPrecoCompra) } />
                { /** preço de venda do produto */ }
                <LabelCampo campo="Preço de venda" obrigatorio={ true } margemTopo={ 30 } />
                <CampoTextoPadrao
                    dadoControle={ precoVenda }
                    placeholder="Digite o preço de venda..."
                    onAlterarValor={ (novoPrecoVenda) => setPrecoVenda(novoPrecoVenda) } />
                { /** status do produto */ }
                <LabelCampo campo="Status" obrigatorio={ true } margemTopo={ 30 } />
                <Spinner
                    opcoes={ opcoesStatusProduto }
                    dadoSelecionado={ status ? opcoesStatusProduto[ 0 ] : opcoesStatusProduto[ 1 ] }
                    onAlterarDadoSelecionado={ (dadoSelecionado) => {

                        if (dadoSelecionado == 0) {
                            setStatus(false);
                        } else {
                            setStatus(true);
                        }

                    } } />
                { /** categoria do produto */ }
                <LabelCampo campo="Categoria" obrigatorio={ true } margemTopo={ 30 } />
                <Spinner
                    opcoes={ categorias }
                    dadoSelecionado={ obterCategoriaSelecionada() }
                    onAlterarDadoSelecionado={ (categoriaSelecionada) => {
                        definirCategoriaSelecionada(categoriaSelecionada);
                    } } />
                <Botao textoBotao="Salvar" carregando={ apresentarLoader } onPressionar={ async () => {
                    await salvarProduto();
                } } />  
                <BotaoFundoTransparente textoBotao="Cancelar" margemBaixo={ 40 } onPressionar={ () => {
                    props.navigation.goBack();
                } } />
            </ScrollView>
        </Tela>
    );
}

const estilosCadastroProduto = StyleSheet.create({

});
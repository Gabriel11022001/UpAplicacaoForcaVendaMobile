import { ScrollView, StyleSheet, View } from "react-native"
import Tela from "../../componentes/Tela"
import TituloTela from "../../componentes/TituloTela";
import RadioBotao from "../../componentes/RadioBotao";
import { useEffect, useState } from "react";
import cores from "../cores";
import LabelCampo from "../../componentes/LabelCampo";

const CadastroCliente = (props) => {

    const idClienteEditar = props.navigation.route != undefined ? (props.navigation.route.params.idCliente ?? 0) : 0;
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ tipoPessoaFisicaSelecionada, setTipoPessoaFisicaSelecionada ] = useState(true);
    const [ tipoPessoaJuridicaSelecionada, setTipoPessoaJuridicaSelecionada ] = useState(false);

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

    const ContainerPessoaFisica = () => {

        return <View>
            <LabelCampo campo="Nome" obrigatorio={ true } margemTopo={ 40 } />
        </View>
    }

    const ContainerPessoaJuridica = () => {

    }

    return <Tela>
        <ScrollView>
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
            { obterContainerTipoPessoaSelecionada() }
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
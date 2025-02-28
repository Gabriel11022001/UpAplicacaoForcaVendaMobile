import { useEffect, useState } from "react";
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import Tela from "../../componentes/Tela";
import NotificacaoItem from "../../componentes/NotificacaoItem";
import { consultarNotificacoes } from "../../service/notificacaoServico";
import LoaderCarregamento from "../../componentes/LoaderCarregamento";
import axios from "axios";

const { StyleSheet, Text, FlatList, Alert } = require("react-native");

const Notificacoes = (props) => {

    const [ notificacoes, setNotificacoes ] = useState([]);
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ quantidadeNotificacoesVisualizadas, setQuantidadeNotificacoesVisualizadas ] = useState(0);
    const [ quantidadeNotificacoesNaoVisualizadas, setQuantidadeNotificacoesNaoVisualizadas ] = useState(0);

    const buscarNotificacoes = async () => {
        setApresentarLoader(true);
        setNotificacoes([]);

        try {
            console.log("Consultando as notificações...");
            const resp = await consultarNotificacoes(1, 5);
            console.log(resp.status);
            console.log(resp.data);
        } catch (e) {
            setApresentarLoader(false);
            // apresentar alerta de erro e redirecionar o usuário para a tela home
            console.log("Erro ao tentar-se consultar as notificações no servidor: " + e); 
            apresentarAlertaErroConsultarNotificacoes();
        }

    }

    const calcularNotificacoes = () => {

    }

    const alterarStatusNotificacaoParaVisualizado = (idNotificacaoVisualizar) => {
        
    }

    const listarNotificacoes = () => {

        if (notificacoes.length > 0) {

            return <FlatList
                data={ notificacoes }
                renderItem={ ({ item }) => {

                    return <NotificacaoItem
                        tituloNotificacao={ item.titulo }
                        status={ item.status }
                        textoNotificacao={ item.mensagem }
                        onVisualizarNotificacao={ () => {
                            alterarStatusNotificacaoParaVisualizado(item.notificacaoId);
                        } } />
                } }
                key={ (noti) => noti.notificacaoId } />
        }

        return <Text>Não existem notificações cadastradas.</Text>
    }

    const apresentarLoaderNotificacoes = () => {

        return <LoaderCarregamento apresentar={ apresentarLoader } mensagem="Consultando as notificações no servidor, aguarde..." />
    }

    const apresentarAlertaErroConsultarNotificacoes = () => {
        Alert.alert("Atenção!", "Ocorreu um erro ao tentar-se consultar as notificações, aguarde alguns instantes e tente novamente!", [
            {
                text: "OK",
                style: "destructive",
                onPress: () => props.navigation.goBack() 
            }
        ]);
    }

    useEffect(() => {
        buscarNotificacoes();
    }, []);

    return (
        <Tela>
            <NavegacaoInferior onRedirecionar={ (telaNavegar) => props.navigation.navigate(telaNavegar) } />
            { apresentarLoader ? apresentarLoaderNotificacoes() : listarNotificacoes() }
        </Tela>
    );
}

const estilosNotificacoes = StyleSheet.create({

});

export default Notificacoes;
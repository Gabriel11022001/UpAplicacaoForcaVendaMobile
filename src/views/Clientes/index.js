import { FlatList, StyleSheet, Text } from "react-native"
import Tela from "../../componentes/Tela"
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import { useEffect, useState } from "react";
import LoaderCarregamento from "../../componentes/LoaderCarregamento";
import Strings from "../../utils/strings";
import ClienteItem from "../../componentes/ClienteItem";
import { consultarClientesService } from "../../service/clienteService";
import apresentarAlertaErro from "../../utils/apresentarAlertaErro";
import DialogConfirmar from "../../componentes/DialogConfirmar";

const Clientes = (props) => {

    const [ apresentarDialogConfirmarDelecaoCliente, setApresentarDialogConfirmarDelecaoCliente ] = useState(false);
    const [ apresentarLoaderCarregamento, setApresentarLoaderCarregamento ] = useState(false);
    const [ apresentarLoaderDeletarCliente, setApresentarLoaderDeletarCliente ] = useState(false);
    const [ clientes, setClientes ] = useState([]);
    const [ paginaAtual, setPaginaAtual ] = useState(1);
    const elementosPorPagina = 10;
    const [ idClienteDeletar, setIdClienteDeletar ] = useState(0);

    // apresentar loader de carregamento dos clientes
    const apresentarLoaderCarregarClientes = () => {

        return <LoaderCarregamento apresentar={ apresentarLoaderCarregamento } mensagem={ Strings.loader } />
    }

    // abrir modal confirmando a deleção do cliente
    function apresentarConfirmarDeletarCliente(idClienteDeletar) {
        setApresentarDialogConfirmarDelecaoCliente(true);
        setIdClienteDeletar(idClienteDeletar);
    }

    // apresentar a listagem dos clientes cadastrados na base de dados
    const apresentarListagemClientes = () => {

        if (clientes.length == 0) {

            return <Text>Não existem clientes cadastrados na base de dados.</Text>
        }

        return <FlatList
            data={ clientes }
            renderItem={ ({ item }) => {
                
                return <ClienteItem
                    cliente={ item }
                    onDeletarCliente={ () => {
                        // confirmar deleção de cliente
                        apresentarConfirmarDeletarCliente(item.id);
                    } }
                    onVisualizarDadosCliente={ () => {
                        // redirecionar usuário para a tela de edição de cliente
                        props.navigation.navigate("cadastro_cliente", {
                            idCliente: item.id
                        });
                    } } />
            } }
            key={ cliente => cliente.id } />
    }

    // consultar clientes
    const consultarClientes = async () => {
        setApresentarLoaderCarregamento(true);
        
        try {
            const respConsultarClientes = await consultarClientesService(
                paginaAtual,
                elementosPorPagina
            );

            setApresentarLoaderCarregamento(false);

            if (respConsultarClientes.data.ok) {
                
                if (respConsultarClientes.data.conteudo.totalElementos > 0) {
                    const clientesArrayMapeado = respConsultarClientes.data.conteudo.elementos.map((cliente) => {

                        return {
                            id: cliente.clienteId,
                            tipoPessoa: cliente.tipoPessoaNome,
                            telefonePrincipal: cliente.telefonePrincipal,
                            emailPrincipal: cliente.emailPrincipal,
                            nome: cliente.tipoPessoaNome == "pf" ? cliente.nomeCompleto : cliente.razaoSocial,
                            documento: cliente.tipoPessoaNome == "pf" ? cliente.cpf : cliente.cnpj,
                            cidade: cliente.enderecoDTO.cidade
                        };
                    });

                    setClientes(clientesArrayMapeado);
                }

            } else {
                // apresentar alerta de erro
                apresentarAlertaErro(respConsultarClientes.data.msg);
            }

        } catch (e)  {
            setApresentarLoaderCarregamento(false);
            // apresentar alerta de erro
        }

    }

    // efetivar deleção do cliente
    async function efetivarDelecaoCliente() {
        setApresentarLoaderDeletarCliente(true);

        try {
            
        } catch (e) {
            apresentarAlertaErro("Erro ao tentar-se deletar o cliente.");
            setApresentarLoaderDeletarCliente(false);
        }

    }

    useEffect(() => {
        consultarClientes();
    }, []);

    return <Tela>
        <NavegacaoInferior onRedirecionar={ (telaRedirecionar) => {
            props.navigation.navigate(telaRedirecionar);
        } } />
        { apresentarDialogConfirmarDelecaoCliente ? <DialogConfirmar
            mensagemDialogConfirmar="Confirma a deleção do cliente?"
            carregando={ apresentarLoaderDeletarCliente }
            onConfirmar={ () => {
                // confirmar deleção do cliente
                efetivarDelecaoCliente();
            } }
            onCancelar={ () => {
                // cancelar a deleção do cliente
                setApresentarDialogConfirmarDelecaoCliente(false);
                setIdClienteDeletar(0);
            } } /> : false }
        { apresentarLoaderCarregamento ? apresentarLoaderCarregarClientes() : apresentarListagemClientes() }
    </Tela>
}

const estilosClientes = StyleSheet.create({

});

export default Clientes;
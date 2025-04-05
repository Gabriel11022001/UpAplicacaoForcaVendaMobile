import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../../views/SplashScreen";
import NavegacaoStack from "../NavegacaoStack";
import Login from "../../views/Login";
import Home from "../../views/Home";
import GestaoCategorias from "../../views/GestaoCategorias";
import CadastroCategoria from "../../views/CadastroCategoria";
import Notificacoes from "../../views/Notificacoes";
import Produtos from "../../views/Produtos";
import DetalhesProduto from "../../views/DetalhesProduto";
import CadastroProduto from "../../views/CadastroProduto";
import CadastroCliente from "../../views/CadastroCliente";
import Clientes from "../../views/Clientes";
import CadastroClienteEndereco from "../../views/CadastroClienteEndereco";
import Perfil from "../../views/Perfil";

const Navegacao = () => {

    const telas = [
        {
            nome: "splash",
            componente: SplashScreen,
            titulo: ""
        },
        {
            nome: "login",
            componente: Login,
            titulo: "Login"
        },
        {
            nome: "home",
            componente: Home,
            titulo: "Home"
        },
        {
            nome: "categorias",
            componente: GestaoCategorias,
            titulo: "Categorias"
        },
        {
            nome: "cadastro_categoria",
            componente: CadastroCategoria,
            titulo: "Cadastro de categoria"
        },
        {
            nome: "notificacoes",
            componente: Notificacoes,
            titulo: "Notificações"
        },
        {
            nome: "produtos",
            componente: Produtos,
            titulo: "Produtos"
        },
        {
            nome: "detalhes_produto",
            componente: DetalhesProduto,
            titulo: "Produto"
        },
        {
            nome: "cadastro_produto",
            componente: CadastroProduto,
            titulo: "Cadastro de produto"
        },
        {
            nome: "cadastro_cliente",
            componente: CadastroCliente,
            titulo: "Cadastro de cliente"
        },
        {
            nome: "clientes",
            componente: Clientes,
            titulo: "Clientes"
        },
        {
            nome: "cadastro_cliente_endereco",
            componente: CadastroClienteEndereco,
            titulo: "Endereço"
        },
        {
            nome: "perfil",
            componente: Perfil,
            titulo: "Perfil"
        }
    ];

    return <NavigationContainer>
        <NavegacaoStack telas={ telas } />
    </NavigationContainer>
}

export default Navegacao;
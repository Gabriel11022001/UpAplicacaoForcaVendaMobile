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
        }
    ];

    return <NavigationContainer>
        <NavegacaoStack telas={ telas } />
    </NavigationContainer>
}

export default Navegacao;
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../../views/SplashScreen";
import NavegacaoStack from "../NavegacaoStack";
import Login from "../../views/Login";
import Home from "../../views/Home";

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
        }
    ];

    return <NavigationContainer>
        <NavegacaoStack telas={ telas } />
    </NavigationContainer>
}

export default Navegacao;
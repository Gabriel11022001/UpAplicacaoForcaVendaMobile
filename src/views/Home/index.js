import { ScrollView, StyleSheet } from "react-native"
import Tela from "../../componentes/Tela"
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import MenuNavegacaoHome from "../../componentes/MenuNavegacaoHome";

const Home = ({ navigation }) => {

    return <Tela>
        <NavegacaoInferior onRedirecionar={ (telaRedirecionar) => navigation.navigate(telaRedirecionar) } />
        <ScrollView>
            <MenuNavegacaoHome navigation={ navigation } />
        </ScrollView>
    </Tela>
}

const estilosTelaHome = StyleSheet.create({

});

export default Home;
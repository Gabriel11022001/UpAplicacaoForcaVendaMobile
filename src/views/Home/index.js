import { ScrollView, StyleSheet } from "react-native"
import Tela from "../../componentes/Tela"
import NavegacaoInferior from "../../componentes/NavegacaoInferior";
import MenuNavegacaoHome from "../../componentes/MenuNavegacaoHome";
import { useEffect, useState } from "react";
import { getUsuarioLogado } from "../../utils/salvarDadosLocalmente";

const Home = ({ navigation }) => {

    const [ permissoesUsuario, setPermissoesUsuario ] = useState([]);

    async function obterDadosUsuarioLogado() {

        try {
            const usuario = await getUsuarioLogado();

            if (usuario != null) {
                const permissoes = usuario.nivelAcesso.permissoes;

                setPermissoesUsuario(permissoes);
            } else {
                // usuário não está logado
            }

        } catch (e) {
            // apresentar alerta de erro e redirecionar o usuário para a tela de login
        }

    }

    useEffect(() => {
        obterDadosUsuarioLogado();
    }, []);

    return <Tela>
        <NavegacaoInferior onRedirecionar={ (telaRedirecionar) => navigation.navigate(telaRedirecionar) } />
        <ScrollView>
            <MenuNavegacaoHome navigation={ navigation } permissoes={ permissoesUsuario } />
        </ScrollView>
    </Tela>
}

const estilosTelaHome = StyleSheet.create({

});

export default Home;
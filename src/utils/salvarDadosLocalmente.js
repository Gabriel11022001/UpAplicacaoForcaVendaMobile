import AsyncStorage from "@react-native-async-storage/async-storage";

const chaveUsuarioLogado = "@usuario_logado";

// salvar dados do usuário logado localmente
export async function salvarDadosUsuarioLogado(usuarioLogado) {

    if (usuarioLogado != null) {
        await AsyncStorage.setItem(chaveUsuarioLogado, JSON.stringify(usuarioLogado));
    }

}

// obter dados do usuário logado
export async function getUsuarioLogado() {
    const usuarioLogado = await AsyncStorage.getItem(chaveUsuarioLogado);
    
    if (usuarioLogado != null) {

        return JSON.parse(usuarioLogado);
    }

    return null;
}

// obter token do usuário logado
export async function getToken() {
    const usuario = await getUsuarioLogado();

    if (usuario != null) {

        return usuario.tokenValidacao;
    }

    return "";
}
import urlBase from "./urlBase";
import axios from "axios";

// buscar notificações
export async function consultarNotificacoes(paginaAtual, elementoPorPagina) {
    const resposta = await axios.get(urlBase + `/Notificacao?paginaAtual=${ paginaAtual }&elementosPorPagina=${ elementoPorPagina }`);

    return resposta;
}

// alterar o status da notificação para visualizado
export async function marcarNotificacaoComoVisualizada(idNotificacao) {
    const resposta = await axios.put(urlBase + "");

    return resposta;
}
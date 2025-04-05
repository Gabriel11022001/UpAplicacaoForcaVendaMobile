import axios from "axios";
import { getToken } from "../utils/salvarDadosLocalmente";
import urlBase from "./urlBase";

// consultar produtos no servidor
export default async function consultarProdutosService(
    paginaAtual,
    elementosPorPagina
) {
    const token = await getToken();

    return await axios.get(urlBase + `/Produto?token=${ token }&paginaAtual=${ paginaAtual }&elementosPorPagina=${ elementosPorPagina }`);
}
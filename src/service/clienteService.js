import axios from "axios";
import urlBase from "./urlBase";
import { getToken } from "../utils/salvarDadosLocalmente";

// consultar clientes paginados
export const consultarClientesService = async (paginaAtual, elementosPorPagina) => {
    const token = await getToken();

    return axios.get(urlBase + `/Cliente?token=${ token }&paginaAtual=${ paginaAtual }&elementosPorPagina=${ elementosPorPagina }`);
}

// consultar cliente pelo id no servidor
export async function buscarClientePeloIdService(idCliente) {
    const token = await getToken();

    return axios.get(urlBase + `/Cliente/buscar-cliente-pelo-id?token=${ token }&idCliente=${ idCliente }`);
}
import axios from "axios";
import urlBase from "./urlBase";

// consultar categorias no servidor
export default async function consultarCategoriasService(paginaAtual, elementosPorPagina = 5) {

    return await axios.get(urlBase + `/Categoria?paginaAtual=${ paginaAtual }&totalElementosPorPagina=${ elementosPorPagina }`);
}
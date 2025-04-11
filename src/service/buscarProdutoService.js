import axios from "axios";
import { getToken } from "../utils/salvarDadosLocalmente";
import urlBase from "./urlBase";

// consultar produto pelo id
export default async function buscarProdutoService(idProduto) {
    const token = await getToken();

    return await axios.get(urlBase + `/Produto/buscar-produto-pelo-id?token=${ token }&idProduto=${ idProduto }`);
}
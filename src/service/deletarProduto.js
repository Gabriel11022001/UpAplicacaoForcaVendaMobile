import axios from "axios";
import { getToken } from "../utils/salvarDadosLocalmente";
import urlBase from "./urlBase";

// deletar produto no servidor
export default async function deletarProdutoService(idProdutoDeletar) {
    const token = await getToken();

    return axios.delete(`${ urlBase }/Produto?token=${ token }&idProdutoDeletar=${ idProdutoDeletar }`);
}
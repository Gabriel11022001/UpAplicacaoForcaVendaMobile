import axios from "axios";
import urlBase from "./urlBase";

// buscar categoria pelo id
export default async function buscarCategoriaService(idCategoria) {

    return await axios.get(urlBase + "/Categoria/" + idCategoria);
}
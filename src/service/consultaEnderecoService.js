import axios from "axios";

const urlBaseViaCep = "https://viacep.com.br/ws/";

// consultar endereço pelo cep na api do ViaCEP
export default async function consultarEndereco(cepConsultar) {

    return await axios.get(urlBaseViaCep + cepConsultar + "/json");
}
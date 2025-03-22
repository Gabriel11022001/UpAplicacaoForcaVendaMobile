import axios from "axios";

// consultar cidades pela unidade federativa
export default async function consultarCidadesService(uf) {

    return await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ uf }/distritos`);
}
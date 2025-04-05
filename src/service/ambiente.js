export default function obterAmbiente() {
    const configJson = require("../service/configuracao.json");

    return configJson;
}
import { createContext, useContext, useReducer } from "react";

// criar o contexto global
const ContextoGlobal = createContext();

// definir o estado global inicial
const estado = {
    clientePassadoEntreTelas: {
        id: 0,
        tipoPessoa: "pf",
        telefonePrincipal: "",
        telefoneSecundario: "",
        emailPrincipal: "",
        emailSecundario: "",
        nome: "",
        cpf: "",
        dataNascimento: "",
        genero: 0,
        razaoSocial: "",
        cnpj: "",
        dataFundacao: "",
        valorPatrimonio: 0,
        status: true,
        endereco: {
            cep: "",
            complemento: "",
            logradouro: "",
            cidade: "",
            bairro: "",
            uf: "",
            numero: ""
        }
    }
};

// definir o reducer
const reducerGlobal = (state, acao) => {
 
    if (acao.type == "SET_CLIENTE_PASSAR_ENTRE_TELAS") {

        return { ...state, clientePassadoEntreTelas: acao.payload };
    }
    
    if (acao.type == "CLEAR_STAGE_SET_CLIENTE_PASSAR_ENTRE_TELAS") {

        return estado;
    }

    return state;
}

// criar o provider
export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducerGlobal, estado);

    return (
        <ContextoGlobal.Provider value={ {
            state,
            dispatch
        } }>
            { children }
        </ContextoGlobal.Provider>
    );
}

// hook para usar o contexto
export const useGlobalContext = () => {

    return useContext(ContextoGlobal);
};
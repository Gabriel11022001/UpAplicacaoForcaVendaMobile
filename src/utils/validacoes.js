export const validarCpf = (cpf) => {

}

export const validarCnpj = (cnpj) => {

}

export const validarCep = (cep) => {

}

// validar número do endereço
export const validarNumeroEndereco = (numero) => {
    let ok = true;

    if (typeof(numero) == "string") {

        if (numero.trim() != "s/n") {
            ok = false;
        }

    } else {

        if (numero <= 0) {
            ok = false;
        }

    }

    return ok;
}

export const validarDataNascimento = (dataNascimento) => {

}
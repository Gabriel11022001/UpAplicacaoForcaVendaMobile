import axios from "axios";
import urlBase from "./urlBase";

// realizar login do usuário no servidor
const login = async (email, senha) => {

    return await axios.post(urlBase + `/Login?email=${ email.trim() }&senha=${ senha.trim() }`);
}

export default login;
import Toast from "react-native-toast-message";
import cores from "../views/cores";

// apresentar alerta de erro
export default function apresentarAlertaErro(mensagem) {
    Toast.show({
        type: "error",
        text1: "Atenção!",
        text2: mensagem.trim(),
        text1Style: { color: cores.erro, fontSize: 17 },
        text2Style: { color: cores.preto, fontSize: 16 }
    });
}
import { SafeAreaView, StyleSheet } from "react-native";
import cores from "../../views/cores";

const Tela = (props) => {

    return (
        <SafeAreaView style={ estilosTela.container }>
            { props.children }
        </SafeAreaView>
    );
}

const estilosTela = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.corFundoTelas
    }
});

export default Tela;
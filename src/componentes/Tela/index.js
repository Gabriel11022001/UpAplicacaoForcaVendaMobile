import { SafeAreaView, StyleSheet } from "react-native";
import cores from "../../views/cores";
import Toast from "react-native-toast-message";

const Tela = (props) => {

    return (
        <SafeAreaView style={ estilosTela.container }>
            { props.children }
            <Toast position="bottom" bottomOffset={ 30 } />
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
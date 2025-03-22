import { StyleSheet, View } from "react-native";
import cores from "../../views/cores";
import { Picker } from "@react-native-picker/picker";

export default function Spinner({ dadoSelecionado, onAlterarDadoSelecionado, opcoes, habilitado }) {

    return (
        <View style={ estilosSpinner.containerSpinner }>
            <Picker
                enabled={ habilitado }
                selectedValue={ dadoSelecionado }
                onValueChange={ (itemSelecionado, indiceItemSelecionado) => {
                    onAlterarDadoSelecionado(itemSelecionado);
                } }>
                    { opcoes.map((opcao) => {

                        return <Picker.Item color={ cores.principal } label={ opcao.valor } value={ opcao.key } key={ opcao.key } enabled={ opcao.habilitado } />
                    }) }
            </Picker>
        </View>
    );
}

const estilosSpinner = StyleSheet.create({
    containerSpinner: {
        backgroundColor: cores.branco,
        padding: 10,
        borderRadius: 10,
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        height: 70,
        marginTop: 10,
        borderColor: cores.corBordas,
        borderWidth: 1,
        borderStyle: "solid"
    }
});
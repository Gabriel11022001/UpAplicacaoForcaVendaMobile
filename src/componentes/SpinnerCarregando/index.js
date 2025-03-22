import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import cores from "../../views/cores";

const SpinnerCarregando = ({ dados, opcaoSelecionada, onSelecionarOpcao, carregando }) => {

    return <View style={ estilosSpinnerCarregando.containerSpinnerCarregando }>
        {
            carregando ? <View style={ estilosSpinnerCarregando.containerCarregando }>
                <ActivityIndicator color={ cores.principal } size={ 20 } />
                <Text style={ estilosSpinnerCarregando.textCarregando }>Carregando, aguarde...</Text>
            </View>
            : <Picker
                enabled={ !carregando && ( Array.from(dados).length > 0 ) }
                selectedValue={ opcaoSelecionada }
                onValueChange={ (itemSelecionado) => {
                    onSelecionarOpcao(itemSelecionado);
                } } >
                    {
                        dados.map((opcao) => {

                            return <Picker.Item value={ opcao.key } key={ opcao.key } label={ opcao.valor } enabled={ opcao.habilitado } />
                        })
                    }
            </Picker>
        }
    </View>
}

const estilosSpinnerCarregando = StyleSheet.create({
    containerSpinnerCarregando: {
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
    },
    containerCarregando: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    textCarregando: {
        color: cores.preto,
        fontWeight: "bold",
        marginStart: 10
    }
});

export default SpinnerCarregando;
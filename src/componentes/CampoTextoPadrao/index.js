import { StyleSheet, TextInput, View } from "react-native";
import cores from "../../views/cores";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CampoTextoPadrao = ({ icone, dadoControle, placeholder, onAlterarValor, tamanhoMaximoCampo, tipoCampo, habilitado, erro }) => {

    const obterIconeCampo = () => {
        const icone = icone ?? "";
        const iconesExistem = [
            {
                nome: "email",
                icone: <FontAwesome5 name="at" size={ 20 } color={ cores.preto } style={ estilosCampoTextoPadrao.estiloIconeCampo } />
            },
            {
                nome: "senha",
                icone: <FontAwesome5 name="key" size={ 20 } color={ cores.preto } style={ estilosCampoTextoPadrao.estiloIconeCampo } />
            }
        ];
        let iconeRetornar = null;

        if (icone != "") {
    
            iconesExistem.forEach((iconeExiste) => {

                if (iconeExiste.nome == icone) {
                    iconeRetornar = iconeExiste.icone;
                }

            });

            if (iconeRetornar != null) {

                return iconeRetornar;
            }

        }

        return null;
    }

    // icone que será apresentado no campo
    const iconeCampo = obterIconeCampo();

    return (
        <View style={ [
            estilosCampoTextoPadrao.estiloCampoPadrao,
            erro ? estilosCampoTextoPadrao.estiloCampoComErro : estilosCampoTextoPadrao.estiloCampoSemErro,
            !habilitado ? estilosCampoTextoPadrao.estiloCampoBloqueado : false
        ] }>
            { iconeCampo }
            <TextInput
                style={ estilosCampoTextoPadrao.estiloCampoTextoInterno }
                value={ dadoControle }
                placeholder={ placeholder }
                onChangeText={ (novoTexto) => onAlterarValor(novoTexto) }
                maxLength={ tamanhoMaximoCampo }
                secureTextEntry={ tipoCampo == "senha" ? true : false }
                editable={ habilitado } />
        </View>
    );
}

const estilosCampoTextoPadrao = StyleSheet.create({
    estiloCampoPadrao: {
        padding: 10,
        height: 65,
        width: "90%",
        marginStart: "5%",
        marginEnd: "5%",
        backgroundColor: cores.branco,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    estiloCampoSemErro: {
        borderColor: cores.corBordas
    },
    estiloCampoComErro: {
        borderColor: cores.erro
    },
    estiloCampoTextoInterno: {
        flex: 1,
        color: cores.preto,
        fontSize: 18,
        fontWeight: "bold",
        marginStart: 5
    },
    estiloIconeCampo: {

    },
    estiloCampoBloqueado: {
        backgroundColor: cores.corBordas
    }
});

export default CampoTextoPadrao;
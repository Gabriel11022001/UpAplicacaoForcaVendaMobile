import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from 'react-native-vector-icons';
import cores from "../../views/cores";

const NavegacaoStack = ({ telas }) => {

    const Stack = createNativeStackNavigator();

    const sairApp = () => {
        Alert.alert("Atenção!", "Deseja sair do aplicativo?", [
            {
                text: "Sim",
                style: "destructive",
                onPress: () => {

                }
            }
        ]);
    }

    return <Stack.Navigator
        initialRouteName="splash" >
        { telas.map((tela) => {

            if (tela.nome === "splash") {

                return <Stack.Screen
                    key={ tela.nome }
                    name={ tela.nome }
                    component={ tela.componente }
                    options={ {
                        headerShown: false
                    } } />
            }

            if (tela.nome == "login") {

                return <Stack.Screen
                    key={ tela.nome }
                    name={ tela.nome }
                    component={ tela.componente }
                    options={ {
                        title: tela.titulo,
                        headerShown: true
                    } } />
            }

            return <Stack.Screen name={ tela.nome } component={ tela.componente } options={ {
                title: tela.titulo,
                headerRight: () => {

                    return <TouchableOpacity onPress={ sairApp } >
                        <FontAwesome5 name="power-off" size={ 30 } color={ cores.preto } />
                    </TouchableOpacity>
                }
            } }
            key={ tela.nome } />
        }) }        
    </Stack.Navigator>
}

export default NavegacaoStack;
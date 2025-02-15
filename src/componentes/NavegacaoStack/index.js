import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NavegacaoStack = ({ telas }) => {

    const Stack = createNativeStackNavigator();

    return <Stack.Navigator
        initialRouteName="splash" >
        { telas.map((tela) => {

            if (tela.nome === "splash") {

                return <Stack.Screen
                    name={ tela.nome }
                    component={ tela.componente }
                    options={ {
                        headerShown: false
                    } } />
            }

            return <Stack.Screen name={ tela.nome } component={ tela.componente } options={ {
                title: tela.titulo
            } } />
        }) }        
    </Stack.Navigator>
}

export default NavegacaoStack;
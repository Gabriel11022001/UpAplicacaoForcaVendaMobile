import Navegacao from "./src/componentes/Navegacao";
import { GlobalProvider } from "./src/contextoGlobal/contextoGlobal";

const App = () => {

  return (
    <GlobalProvider>
      <Navegacao />
    </GlobalProvider>
  );
}

export default App;
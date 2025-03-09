import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/Router";

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>


);

export default App;

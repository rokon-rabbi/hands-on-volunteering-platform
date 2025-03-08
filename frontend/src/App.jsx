import { AuthProvider } from "./context/authContext";
import AppRouter from "./router/Router";

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>


);

export default App;

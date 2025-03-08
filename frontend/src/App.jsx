import { BrowserRouter as Router, Routes, Route } from "react-router";
import RegisterForm from "./assets/components/RegisterForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;

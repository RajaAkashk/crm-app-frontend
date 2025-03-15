import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import HomePage from "./Pages/homePage";
import SalesAgentPage from "./Pages/SalesAgentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/salesAgent" element={<SalesAgentPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

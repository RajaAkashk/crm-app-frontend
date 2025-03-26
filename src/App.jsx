import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import HomePage from "./Pages/HomePage";
import SalesAgentPage from "./Pages/SalesAgentPage";
import LeadDetailsPage from "./Pages/LeadDetailsPage";
import EditLeadPage from "./Pages/EditLeadPage";
import SettingPage from "./Pages/SettingPage";
import ReportPage from "./Pages/ReportPage";
import LoginPage from "./Pages/LoginPage";
import AuthRoute from "./Components/AuthRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/dashboard"
          element={<AuthRoute element={<HomePage />} />}
        ></Route>
        <Route
          path="/salesAgent"
          element={<AuthRoute element={<SalesAgentPage />} />}
        ></Route>
        <Route
          path="/dashboard/lead/:id"
          element={<AuthRoute element={<LeadDetailsPage />} />}
        ></Route>
        <Route
          path="/edit/lead/:id"
          element={<AuthRoute element={<EditLeadPage />} />}
        ></Route>
        <Route
          path="/report"
          element={<AuthRoute element={<ReportPage />} />}
        ></Route>
        <Route
          path="/settings"
          element={<AuthRoute element={<SettingPage />} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

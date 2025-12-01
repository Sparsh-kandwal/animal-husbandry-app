import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Gis from "./pages/gis.jsx";
import Reporting from "./pages/reporting.jsx";

function App() {
  return (
    <>
      <Navbar />



      <div className="pt-18">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gis" element={<Gis />} />
          <Route path="/reporting" element={<Reporting />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

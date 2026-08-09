import { BrowserRouter, Routes, Route,Link} from "react-router-dom";
import QRScanner from "./pages/QRScanner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Appointments from "./pages/Appointments";


function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/scanner" element={<QRScanner />} /> 
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
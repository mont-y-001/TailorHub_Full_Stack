import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* Public Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Provider Pages */
import Dashboard from "./pages/provider/Dashboard";
import ProviderServices from "./pages/provider/Services";
import ProviderAppointments from "./pages/provider/Appointments";

/* Route Guard */
import ProviderRoute from "./routes/ProviderRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROVIDER ROUTES (PROTECTED) */}
        <Route
          path="/provider/dashboard"
          element={
            <ProviderRoute>
              <Dashboard />
            </ProviderRoute>
          }
        />

        <Route
          path="/provider/services"
          element={
            <ProviderRoute>
              <ProviderServices />
            </ProviderRoute>
          }
        />

        <Route
          path="/provider/appointments"
          element={
            <ProviderRoute>
              <ProviderAppointments />
            </ProviderRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

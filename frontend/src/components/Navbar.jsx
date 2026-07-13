import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/login");
  };

  const isProvider = role === "provider";
  const isProviderRoute = location.pathname.startsWith("/provider");

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          ✂️ <span className="text-yellow-400">TailorHUB</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-6 font-medium items-center">
          {!isProvider && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/ai-assistant" className="text-yellow-500 font-semibold">🤖 AI Assistant</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          )}

          {isProvider && isProviderRoute && (
            <>
              <li><Link to="/provider/dashboard">Dashboard</Link></li>
              <li><Link to="/provider/services">My Services</Link></li>
              <li><Link to="/provider/appointments">Appointments</Link></li>
            </>
          )}

          {!token ? (
            <>
              <Link to="/login" className="border px-4 py-2 rounded-full">Login</Link>
              <Link to="/register" className="bg-yellow-400 px-4 py-2 rounded-full font-semibold">
                Register
              </Link>
            </>
          ) : (
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-full">
              Logout
            </button>
          )}
        </ul>

        {/* HAMBURGER */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow px-6 py-4">
          <ul className="flex flex-col gap-4 font-medium">

            {!isProvider && (
              <>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
                <Link to="/ai-assistant" onClick={() => setMenuOpen(false)} className="text-yellow-500 font-semibold">🤖 AI Assistant</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              </>
            )}

            {isProvider && isProviderRoute && (
              <>
                <Link to="/provider/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/provider/services" onClick={() => setMenuOpen(false)}>My Services</Link>
                <Link to="/provider/appointments" onClick={() => setMenuOpen(false)}>Appointments</Link>
              </>
            )}

            {!token ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-yellow-400 px-4 py-2 rounded-full font-semibold w-fit"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-full w-fit"
              >
                Logout
              </button>
            )}

          </ul>
        </div>
      )}
    </nav>
  );
}

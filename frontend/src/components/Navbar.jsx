import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          ✂️ <span className="text-yellow-400">TailorHUB</span>
        </Link>

        {/* LINKS */}
        <ul className="hidden md:flex gap-6 font-medium items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {/* ✅ APPOINTMENT – ONLY FOR CUSTOMER */}
          {token && role === "user" && (
            <li>
              <Link
                to="/appointment"
                className="text-yellow-500 font-semibold"
              >
                Appointment
              </Link>
            </li>
          )}
        </ul>

        {/* AUTH BUTTONS */}
        <div className="flex gap-3">
          {!token ? (
            <>
              <Link
                to="/login"
                className="border px-4 py-2 rounded-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 px-4 py-2 rounded-full font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

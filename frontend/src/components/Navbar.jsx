import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, LayoutDashboard, Scissors } from "lucide-react";
import Button from "./ui/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isProvider = role === "provider";
  const isProviderRoute = location.pathname.startsWith("/provider");

  const logout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/login");
  };

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/ai-assistant", label: "🤖 AI Assistant" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const providerLinks = [
    { to: "/provider/dashboard", label: "Dashboard" },
    { to: "/provider/services", label: "My Services" },
    { to: "/provider/appointments", label: "Appointments" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-surface-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">
              Tailor<span className="text-primary-500">HUB</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1">
            {!isProvider &&
              publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.to
                      ? "bg-primary-50 text-primary-600"
                      : "text-surface-600 hover:text-surface-900 hover:bg-surface-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            {isProvider && isProviderRoute &&
              providerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.to
                      ? "bg-primary-50 text-primary-600"
                      : "text-surface-600 hover:text-surface-900 hover:bg-surface-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            <div className="ml-4 flex items-center gap-3">
              {!token ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  {isProvider && (
                    <Link to="/provider/dashboard">
                      <Button variant="ghost" size="sm">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-surface-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-surface-700" />
            ) : (
              <Menu className="w-6 h-6 text-surface-700" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-surface-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            {!isProvider &&
              publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? "bg-primary-50 text-primary-600"
                      : "text-surface-600 hover:bg-surface-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            {isProvider && isProviderRoute &&
              providerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? "bg-primary-50 text-primary-600"
                      : "text-surface-600 hover:bg-surface-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            <div className="pt-3 border-t border-surface-100 space-y-2">
              {!token ? (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="secondary" className="w-full">
                      <User className="w-4 h-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </>
              ) : (
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
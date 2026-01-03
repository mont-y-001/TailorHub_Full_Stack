import { Link, useNavigate } from "react-router-dom";

export default function ProviderNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h2 className="font-bold text-xl">Provider Dashboard</h2>

      <div className="flex gap-6">
        <Link to="/provider/dashboard">Home</Link>
        <Link to="/provider/services">My Services</Link>
        <Link to="/provider/appointments">Appointments</Link>
        <button onClick={logout} className="text-red-400">
          Logout
        </button>
      </div>
    </nav>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // SAVE AUTH DATA
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // REDIRECT BASED ON ROLE
      if (data.role === "provider") {
        navigate("/provider/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="bg-yellow-400 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

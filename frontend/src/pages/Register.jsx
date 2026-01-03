import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || "Registered Successfully");
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6">Create Account</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input placeholder="Name" className="border p-3 rounded" required
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Email" className="border p-3 rounded" required
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password" className="border p-3 rounded" required
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <select
          className="border p-3 rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">Customer</option>
          <option value="provider">Service Provider</option>
        </select>

        <button className="bg-yellow-400 px-6 py-3 rounded-full hover:bg-yellow-500">
          Register
        </button>
      </form>
    </section>
  );
}

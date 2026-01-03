import { useEffect, useState } from "react";

export default function Appointment() {
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  /* ---------------- FETCH PROVIDERS ---------------- */
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/providers");
        const data = await res.json();
        setProviders(data);
      } catch (err) {
        console.error("Failed to fetch providers", err);
      }
    };

    fetchProviders();
  }, []);

  /* ---------------- SUBMIT APPOINTMENT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!provider) {
      alert("Please select a provider");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 MUST
        },
        body: JSON.stringify({
          provider,
          service,
          phone,
          date,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Appointment booked successfully!");
        setService("");
        setPhone("");
        setDate("");
        setMessage("");
        setProvider("");
      } else {
        alert(data.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <section className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Book Appointment
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* PROVIDER */}
        <select
          className="border p-3 rounded"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          required
        >
          <option value="">Select Tailor</option>
          {providers.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* SERVICE */}
        <input
          className="border p-3 rounded"
          placeholder="Service (e.g. Suit Stitching)"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />

        {/* PHONE */}
        <input
          className="border p-3 rounded"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {/* DATE */}
        <input
          type="date"
          className="border p-3 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* MESSAGE */}
        <textarea
          className="border p-3 rounded"
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-yellow-400 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500"
        >
          Book Appointment
        </button>
      </form>
    </section>
  );
}

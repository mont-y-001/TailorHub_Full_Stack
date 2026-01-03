import { useEffect, useState } from "react";
import ProviderLayout from "../../layouts/ProviderLayout";

export default function Services() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const token = localStorage.getItem("token");

  /* ---------------- FETCH SERVICES ---------------- */
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services");
    }
  };

  /* ---------------- ADD SERVICE ---------------- */
  const addService = async (e) => {
  e.preventDefault();

  console.log("ADDING SERVICE...");
  console.log({ title, description, price });

  try {
    const res = await fetch("http://localhost:5000/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
      }),
    });

    const data = await res.json();
    console.log("RESPONSE:", data);

    if (res.ok) {
      setTitle("");
      setDescription("");
      setPrice("");
      fetchServices();
    } else {
      alert(data.message || "Failed to add service");
    }
  } catch (err) {
    console.error("ERROR:", err);
    alert("Network error");
  }
};

  /* ---------------- DELETE SERVICE ---------------- */
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchServices();
    } catch (err) {
      alert("Failed to delete service");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ProviderLayout>
      <h1 className="text-3xl font-bold mb-6">My Services</h1>

      {/* ADD SERVICE FORM */}
      <form
        onSubmit={addService}
        className="bg-white p-6 rounded-xl shadow mb-8 grid gap-4 max-w-xl"
      >
        <input
          className="border p-3 rounded"
          placeholder="Service Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-3 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="border p-3 rounded"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="bg-yellow-400 py-2 rounded font-semibold">
          Add Service
        </button>
      </form>
      

      {/* SERVICES LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div
            key={s._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-gray-600">{s.description}</p>
              <p className="mt-1 font-semibold">₹ {s.price}</p>
            </div>

            <button
              onClick={() => deleteService(s._id)}
              className="text-red-500 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </ProviderLayout>
  );
}
